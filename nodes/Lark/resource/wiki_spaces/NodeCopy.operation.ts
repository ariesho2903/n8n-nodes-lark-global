import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'Create wiki space node copy',
	value: 'copySpaceNode',
	order: 90,
	options: [
		{
			displayName: 'Space ID',
			name: 'space_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Node Token',
			name: 'node_token',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
		{
			displayName: 'Target Parent Node Token',
			name: 'target_parent_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Target parent node token; cannot be empty when target space ID is empty',
		},
		{
			displayName: 'Target Space ID',
			name: 'target_space_id',
			type: 'string',
			default: '',
			description: 'Target space ID; cannot be empty when target parent node token is empty',
		},
		{
			displayName: 'New Title',
			name: 'title',
			type: 'string',
			default: '',
			description: 'Title after copying. Leave empty for a blank title; otherwise the original title is used.',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const nodeToken = this.getNodeParameter('node_token', index) as string;
		const targetParentToken = this.getNodeParameter('target_parent_token', index) as string;
		const targetSpaceId = this.getNodeParameter('target_space_id', index) as string;
		const title = this.getNodeParameter('title', index) as string;

		const body: IDataObject = {};

		if (targetParentToken) {
			body.target_parent_token = targetParentToken;
		}
		if (targetSpaceId) {
			body.target_space_id = targetSpaceId;
		}
		if (title !== undefined) {
			body.title = title;
		}

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes/${nodeToken}/copy`,
			body,
		});
	},
} as ResourceOperation;


