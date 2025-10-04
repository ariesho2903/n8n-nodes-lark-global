import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'Create wiki space node',
	value: 'createSpaceNode',
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
			displayName: 'Document Type',
			name: 'obj_type',
			type: 'options',
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: 'Document', value: 'docx' },
				{ name: 'Sheet', value: 'sheet' },
				{ name: 'Mindnote', value: 'mindnote' },
				{ name: 'Bitable', value: 'bitable' },
				{ name: 'File', value: 'file' },
			],
			default: 'docx',
		},
		{
			displayName: 'Parent Node Token',
			name: 'parent_node_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Parent node token; leave empty for root nodes',
		},
		{
			displayName: 'Node Type',
			name: 'node_type',
			type: 'options',
			required: true,
			options: [
				{ name: 'Entity', value: 'origin' },
				{ name: 'Shortcut', value: 'shortcut' },
			],
			default: 'origin',
		},
		{
			displayName: 'Source Node Token',
			name: 'origin_node_token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Node token of the shortcut target',
		},
		{
			displayName: 'Document Title',
			name: 'title',
			type: 'string',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const objType = this.getNodeParameter('obj_type', index) as string;
		const nodeType = this.getNodeParameter('node_type', index) as string;
		const parentNodeToken = this.getNodeParameter('parent_node_token', index) as string;
		const originNodeToken = this.getNodeParameter('origin_node_token', index) as string;
		const title = this.getNodeParameter('title', index) as string;

		const body: IDataObject = {
			obj_type: objType,
			node_type: nodeType,
		};

		if (parentNodeToken) body.parent_node_token = parentNodeToken;
		if (originNodeToken) body.origin_node_token = originNodeToken;
		if (title) body.title = title;

		return RequestUtils.request.call(this, {
			method: 'POST',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/nodes`,
			body,
		});
	},
} as ResourceOperation;


