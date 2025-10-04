/* eslint-disable n8n-nodes-base/node-param-type-options-password-missing */
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { DateTime } from 'luxon';
import { ResourceOperation } from '../../../help/type/IResource';
import RequestUtils from '../../../help/utils/RequestUtils';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';
import { DESCRIPTIONS } from '../../../help/description';

export default {
	name: WORDING.CalendarEventGetList,
	value: OperationType.GetCalendarEventList,
	order: 189,
	options: [
		DESCRIPTIONS.CALENDAR_ID,
		DESCRIPTIONS.WHETHER_PAGING,
		{
			...DESCRIPTIONS.PAGE_SIZE,
			typeOptions: {
				minValue: 50,
				maxValue: 1000,
				numberPrecision: 0,
			},
		},
		DESCRIPTIONS.PAGE_TOKEN,
		{
			displayName: WORDING.Options,
			name: 'options',
			type: 'collection',
			placeholder: WORDING.AddField,
			default: {},
			options: [
				DESCRIPTIONS.USER_ID_TYPE,
				DESCRIPTIONS.ANCHOR_TIME,
				DESCRIPTIONS.SYNC_TOKEN,
				{
					...DESCRIPTIONS.START_TIME,
					required: false,
				},
				{
					...DESCRIPTIONS.END_TIME,
					required: false,
				},
			],
		},
		{
			displayName: `<a target="_blank" href="https://open.larksuite.com/document/server-docs/calendar-v4/calendar-event/list">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject[]> {
		const calendarId = this.getNodeParameter('calendar_id', index, undefined, {
			extractValue: true,
		}) as string;
		const options = this.getNodeParameter('options', index, {}) as IDataObject;
		const whetherPaging = this.getNodeParameter('whether_paging', index, false) as boolean;
		const pageSize = this.getNodeParameter('page_size', index, 1000) as number;
		let pageToken = this.getNodeParameter('page_token', index, '') as string;
		const anchorTime = (options.anchor_time as string) || '';
		let syncToken = (options.sync_token as string) || '';
		const startTime = (options.start_time as string) || '';
		const endTime = (options.end_time as string) || '';
		const userIdType = (options.user_id_type as string) || 'open_id';

		const allEvents: IDataObject[] = [];
		let hasMore = false;

		do {
			const {
				data: { has_more, page_token, items, sync_token },
			} = await RequestUtils.request.call(this, {
				method: 'GET',
				url: `/open-apis/calendar/v4/calendars/${calendarId}/events`,
				qs: {
					page_size: pageSize,
					user_id_type: userIdType,
					...(anchorTime && { anchor_time: anchorTime }),
					...(pageToken && { page_token: pageToken }),
					...(syncToken && { sync_token: syncToken }),
					...(startTime && { start_time: DateTime.fromISO(startTime).toUnixInteger() }),
					...(endTime && { end_time: DateTime.fromISO(endTime).toUnixInteger() }),
				},
			});

			hasMore = has_more;
			pageToken = page_token;
			syncToken = sync_token;
			if (Array.isArray(items)) {
				allEvents.push(...items);
			}
		} while (!whetherPaging && hasMore);

		const nameKeys = [
			'name',
			'title',
			'summary',
			'space_name',
			'table_name',
			'field_name',
			'record_name',
			'role_name',
			'calendar_name',
			'display_name',
			'app_name',
			'member_name',
			'sheet_name',
			'file_name',
			'document_name',
		];
		const valueKeys = [
			'app_id',
			'id',
			'calendar_id',
			'space_id',
			'table_id',
			'field_id',
			'record_id',
			'role_id',
			'token',
			'value',
			'member_id',
			'user_id',
			'sheet_id',
			'file_id',
			'document_id',
			'event_id',
			'attendee_id',
		];

		const getFirstString = (source: IDataObject, keys: string[]): string | undefined => {
			for (const key of keys) {
				const value = source[key];
				if (typeof value === 'string' && value.trim() !== '') {
					return value;
				}
			}
			return undefined;
		};

		const list = (allEvents ?? []) as IDataObject[];

		return list.map((item) => {
			const name = getFirstString(item, nameKeys) ?? getFirstString(item, valueKeys) ?? 'Unnamed';
			const value = getFirstString(item, valueKeys) ?? name;

			return { name, value };
		});
	},
} as ResourceOperation;
