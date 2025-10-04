import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'List wiki space members',
	value: 'getSpaceMembers',
	order: 95,
	options: [
		{
			displayName: 'Space ID',
			name: 'space_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Page Size',
			name: 'page_size',
			type: 'number',
			default: 20,

		},
		{
			displayName: 'Pagination Token',
			name: 'page_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Pagination token, leave empty for first request',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const pageSize = this.getNodeParameter('page_size', index) as number;
		const pageToken = this.getNodeParameter('page_token', index, '') as string;

		const qs: IDataObject = {
			page_size: pageSize,
		};

		if (pageToken) {
			qs.page_token = pageToken;
		}

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/members`,
			qs,
		});
	},
} as ResourceOperation;


