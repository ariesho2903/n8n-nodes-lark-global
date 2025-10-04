import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { DESCRIPTIONS } from '../../../help/description';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';
import NodeUtils from '../../../help/utils/node';
import { isString } from '../../../help/utils/validation';

export default {
	name: WORDING.GetTableRecordList,
	value: OperationType.GetTableRecordList,
	order: 179,
	options: [
		DESCRIPTIONS.BASE_APP_TOKEN,
		DESCRIPTIONS.BASE_TABLE_ID,
		DESCRIPTIONS.RECORD_IDS,
		{
			displayName: WORDING.Options,
			name: 'options',
			type: 'collection',
			placeholder: WORDING.AddField,
			default: {},
			options: [
				DESCRIPTIONS.USER_ID_TYPE,
				DESCRIPTIONS.WITH_SHARED_URL,
				DESCRIPTIONS.AUTOMATIC_FIELDS,
			],
		},
		{
			displayName: `<a target="_blank" href="https://open.larksuite.com/document/docs/bitable-v1/app-table-record/batch_get">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject[]> {
		const app_token = this.getNodeParameter('app_token', index, undefined, {
			extractValue: true,
		}) as string;
		const table_id = this.getNodeParameter('table_id', index, undefined, {
			extractValue: true,
		}) as string;
		const recordIds = NodeUtils.getArrayData<string>(this, 'record_ids', index, isString);

		const options = this.getNodeParameter('options', index, {});
		const user_id_type = (options.user_id_type as string) || 'open_id';
		const with_shared_url = (options.with_shared_url as boolean) || false;
		const automatic_fields = (options.automatic_fields as boolean) || false;

		const { data } = await RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/bitable/v1/apps/${app_token}/tables/${table_id}/records/batch_get`,
			body: {
				record_ids: recordIds,
				user_id_type,
				with_shared_url,
				automatic_fields,
			},
		});

		const dataObject = (data || {}) as IDataObject;
		const list = (
			dataObject.items ||
			dataObject.records ||
			dataObject.apps ||
			dataObject.spaces ||
			dataObject.calendars ||
			[]
		) as IDataObject[];

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

		return list.map((item) => {
			const name = getFirstString(item, nameKeys) ?? getFirstString(item, valueKeys) ?? 'Unnamed';
			const value = getFirstString(item, valueKeys) ?? name;

			return { name, value };
		});
	},
} as ResourceOperation;
