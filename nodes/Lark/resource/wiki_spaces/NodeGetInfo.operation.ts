import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'Get wiki space node info',
	value: 'getSpaceNodeInfo',
	order: 90,
	options: [
		{
			displayName: 'Node Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Knowledge base node token or actual document token',
		},
		{
			displayName: 'Document Type',
			name: 'obj_type',
			type: 'options',
			// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
			options: [
				{ name: 'Knowledge Base Node', value: 'wiki' },
				{ name: 'Legacy Document', value: 'doc' },
				{ name: 'New Version Document', value: 'docx' },
				{ name: 'Sheet', value: 'sheet' },
				{ name: 'Mindnote', value: 'mindnote' },
				{ name: 'Bitable', value: 'bitable' },
				{ name: 'File', value: 'file' },
				{ name: 'Slides', value: 'slides' },
			],
			default: 'wiki',
			description: 'Document type; defaults to wiki when omitted',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const token = this.getNodeParameter('token', index) as string;
		const objType = this.getNodeParameter('obj_type', index) as string;

		const qs: IDataObject = {
			token,
		};

		if (objType !== 'wiki') {
			qs.obj_type = objType;
		}

		return RequestUtils.request.call(this, {
			method: 'GET',
			url: '/open-apis/wiki/v2/spaces/get_node',
			qs,
		});
	},
} as ResourceOperation;


