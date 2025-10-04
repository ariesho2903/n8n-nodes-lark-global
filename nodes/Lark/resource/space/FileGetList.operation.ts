import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { ResourceOperation } from '../../../help/type/IResource';
import { WORDING } from '../../../help/wording';
import { FileType, OperationType } from '../../../help/type/enums';
import { DESCRIPTIONS } from '../../../help/description';
import { getFileList } from '../../GenericFunctions';

export default {
	name: WORDING.GetFileList,
	value: OperationType.GetFileList,
	order: 200,
	options: [
		DESCRIPTIONS.SPACE_FILE_TYPE,
		{
			displayName: WORDING.Options,
			name: 'options',
			type: 'collection',
			placeholder: WORDING.AddField,
			default: {},
			options: [DESCRIPTIONS.ORDER_BY, DESCRIPTIONS.DIRECTION, DESCRIPTIONS.USER_ID_TYPE],
		},
		{
			displayName: `<a target="_blank" href="https://open.larksuite.com/document/server-docs/docs/drive-v1/folder/list">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject[]> {
		const type = this.getNodeParameter('space_file_type', index, undefined) as FileType[];
		const options = this.getNodeParameter('options', index, {});
		const order_by = (options.order_by as string) || 'EditedTime';
		const direction = (options.direction as string) || 'DESC';
		const user_id_type = (options.user_id_type as string) || 'open_id';

		const files = (await getFileList.call(this, type, order_by, direction, user_id_type)) as IDataObject[];
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

		return files.map((item) => {
			const name = getFirstString(item, nameKeys) ?? getFirstString(item, valueKeys) ?? 'Unnamed';
			const value = getFirstString(item, valueKeys) ?? name;

			return { name, value };
		});
	},
} as ResourceOperation;
