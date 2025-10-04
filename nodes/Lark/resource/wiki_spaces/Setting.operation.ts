import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';

export default {
	name: 'Update wiki space settings',
	value: 'updateSpaceSettings',
	order: 98,
	options: [
		{
			displayName: 'Space ID',
			name: 'space_id',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'First-Level Page Creation Permission',
			name: 'create_setting',
			type: 'options',
			options: [
				{ name: 'Admins and Members', value: 'admin_and_member' },
				{ name: 'Admins Only', value: 'admin' },
			],
			default: 'admin_and_member',
			description: 'Who can create first-level pages',
		},
		{
			displayName: 'Document Permissions',
			name: 'security_setting',
			type: 'options',
			options: [
				{ name: 'Allowed', value: 'allow' },
				{ name: 'Not Allowed', value: 'not_allow' },
			],
			default: 'allow',
			description: 'Allow readers to duplicate/print/export/copy',
		},
		{
			displayName: 'Comment Permission',
			name: 'comment_setting',
			type: 'options',
			options: [
				{ name: 'Allowed', value: 'allow' },
				{ name: 'Not Allowed', value: 'not_allow' },
			],
			default: 'allow',
			description: 'Allow readers to comment',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
		const spaceId = this.getNodeParameter('space_id', index) as string;
		const createSetting = this.getNodeParameter('create_setting', index) as string;
		const securitySetting = this.getNodeParameter('security_setting', index) as string;
		const commentSetting = this.getNodeParameter('comment_setting', index) as string;

		const body: IDataObject = {};

		if (createSetting) {
			body.create_setting = createSetting;
		}
		if (securitySetting) {
			body.security_setting = securitySetting;
		}
		if (commentSetting) {
			body.comment_setting = commentSetting;
		}

		return RequestUtils.request.call(this, {
			method: 'PUT',
			url: `/open-apis/wiki/v2/spaces/${spaceId}/setting`,
			body,
		});
	},
} as ResourceOperation;


