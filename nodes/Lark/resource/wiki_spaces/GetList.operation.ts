import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'List wiki spaces',
	value: 'getWikiSpaceList',
	order: 100,
	options: [
		{
			displayName: 'Page Size',
			name: 'page_size',
			type: 'number',
			default: 20,
			description: 'Page size, maximum 50',
		},
		{
			displayName: 'Pagination Token',
			name: 'page_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Pagination token, leave empty for first request',
		},
		{
			displayName: 'Language',
			name: 'lang',
			type: 'options',
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: 'Simplified Chinese', value: 'zh' },
				{ name: 'Indonesian', value: 'id' },
				{ name: 'German', value: 'de' },
				{ name: 'English', value: 'en' },
				{ name: 'Spanish', value: 'es' },
				{ name: 'French', value: 'fr' },
				{ name: 'Italian', value: 'it' },
				{ name: 'Portuguese', value: 'pt' },
				{ name: 'Vietnamese', value: 'vi' },
				{ name: 'Russian', value: 'ru' },
				{ name: 'Hindi', value: 'hi' },
				{ name: 'Thai', value: 'th' },
				{ name: 'Korean', value: 'ko' },
				{ name: 'Japanese', value: 'ja' },
				{ name: 'Traditional Chinese (Hong Kong)', value: 'zh-HK' },
				{ name: 'Traditional Chinese (Taiwan)', value: 'zh-TW' },
			],
			default: 'zh',
			description: 'Language used to display library names',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject[]> {
		const pageSize = this.getNodeParameter('page_size', index) as number;
		const pageToken = this.getNodeParameter('page_token', index, '') as string;
		const lang = this.getNodeParameter('lang', index) as string;

		const qs: IDataObject = {
			page_size: pageSize,
			lang,
		};

		if (pageToken) {
			qs.page_token = pageToken;
		}

		const response = (await RequestUtils.request.call(this, {
			method: 'GET',
			url: '/open-apis/wiki/v2/spaces',
			qs,
		})) as IDataObject;
		const data = (response.data || {}) as IDataObject;
		const list = (
			data.items ||
			data.apps ||
			data.records ||
			data.spaces ||
			data.calendars ||
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
