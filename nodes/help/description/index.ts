import { FileType, MessageType } from '../type/enums';
import { OBJECT_JSON } from './base';

export const DESCRIPTIONS = {
	FILE_BINARY_FIELD: {
		displayName: 'File Binary Field',
		name: 'file_binary_field',
		type: 'string',
		required: true,
		default: '',
		description: 'The name of the field that will contain the file binary data',
	},

	MEDIA_FILE_TOKENS: {
		displayName: 'Media File Tokens',
		description: 'The tokens of multiple media files',
		name: 'media_file_tokens',
		type: 'json',
		default: '[]',
		required: true,
		placeholder: '["boxcnrHpsg1QDqXAAAyachabcef"]',
	},

	MEDIA_FILE_TOKEN: {
		displayName: 'Media File Token',
		description: 'The token of a media file',
		name: 'media_file_token',
		type: 'string',
		required: true,
		default: '',
		typeOptions: {
			password: true,
		},
	},

	PARENT_TYPE: {
		displayName: 'Upload Point Type',
		name: 'parent_type',
		type: 'options',
		options: [
			{ name: 'Bitable File', value: 'bitable_file' },
			{ name: 'Bitable Image', value: 'bitable_image' },
			{ name: 'File to Import Into Docs', value: 'ccm_import_open' },
			{ name: 'Sheet File', value: 'sheet_file' },
			{ name: 'Sheet Image', value: 'sheet_image' },
			{ name: 'Upgraded Docs File', value: 'docx_file' },
			{ name: 'Upgraded Docs Image', value: 'docx_image' },
			{ name: 'VC Virtual Background', value: 'vc_virtual_background' },
		],
		required: true,
		default: 'bitable_file',
		description: 'The type of media to upload to the specified type of Docs',
	},

	PARENT_NODE: {
		displayName: 'Upload Point Token',
		name: 'parent_node',
		type: 'string',
		required: true,
		default: '',
		description:
			'The document or location to which the media will be uploaded. block_id for upgraded docs, spreadsheet_token for sheet, app_token for bitable, empty for importing into docs.',
	},

	JSON_OUTPUT: {
		displayName: 'JSON',
		name: 'jsonOutput',
		type: 'json',
		typeOptions: {
			rows: 5,
		},
		default: '{\n  "my_field_1": "value",\n  "my_field_2": 1\n}\n',
	},

	SHEET_VALUES: {
		displayName: 'Values',
		name: 'values',
		type: 'json',
		required: true,
		default: '[]',
	},

	MATCH_CASE: {
		displayName: 'Match Case',
		name: 'matchCase',
		type: 'boolean',
		default: false,
	},

	MATCH_ENTIRE_CELL: {
		displayName: 'Match Entire Cell',
		name: 'matchEntireCell',
		type: 'boolean',
		default: false,
	},

	SEARCH_BY_REGEX: {
		displayName: 'Search By Regex',
		name: 'searchByRegex',
		type: 'boolean',
		default: false,
	},

	INCLUDE_FORMULAS: {
		displayName: 'Include Formulas',
		name: 'includeFormulas',
		type: 'boolean',
		default: false,
	},

	CELL_RANGE: {
		displayName: 'Cell Range',
		name: 'range',
		type: 'string',
		default: '',
		required: true,
		placeholder: '!A1:B2',
		hint: 'https://open.larksuite.com/document/server-docs/docs/sheets-v3/overview#9049d332',
		description:
			'The range of cells to merge, in the format of &lt;start position&gt;:&lt;end position&gt;. Example: !A1:B2.',
	},

	START_INDEX: {
		displayName: 'Start Index',
		name: 'startIndex',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
	},

	END_INDEX: {
		displayName: 'End Index',
		name: 'endIndex',
		type: 'number',
		required: true,
		default: 1,
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
	},

	MAJOR_DIMENSION: {
		displayName: 'Dimension to Be Added',
		name: 'majorDimension',
		type: 'options',
		options: [
			{ name: 'ROWS', value: 'ROWS' },
			{ name: 'COLUMNS', value: 'COLUMNS' },
		],
		required: true,
		default: 'ROWS',
	},

	SHEET_INDEX: {
		displayName: 'Sheet Index',
		name: 'sheet_index',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
	},

	SHEET_ID: {
		displayName: 'Sheet ID',
		name: 'sheet_id',
		type: 'resourceLocator',
		default: { mode: 'id', value: '' },
		required: true,
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select Sheet',
				typeOptions: {
					searchListMethod: 'searchSheets',
					searchFilterRequired: false,
					searchable: false,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter Sheet ID',
				default: '',
			},
		],
	},

	CHAT_ID: {
		displayName: 'Chat ID',
		name: 'chat_id',
		type: 'string',
		required: true,
		default: '',
	},

	SYNC_TOKEN: {
		displayName: 'Sync Token',
		name: 'sync_token',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		description: 'Incremental synchronization mark, not filled in for the first request',
	},

	ANCHOR_TIME: {
		displayName: 'Anchor Time',
		name: 'anchor_time',
		type: 'string',
		default: '',
		description:
			'Used to set a specific point in time for pulling events, thereby avoiding the need to pull all events',
	},

	MAX_ATTENDEE_NUM: {
		displayName: 'Max Attendee Number',
		name: 'max_attendee_num',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
			numberPrecision: 0,
		},
		default: 100,
	},

	NEED_ATTENDEE: {
		displayName: 'Need Attendee',
		name: 'need_attendee',
		type: 'boolean',
		default: false,
	},

	NEED_MEETING_SETTINGS: {
		displayName: 'Need Meeting Settings',
		name: 'need_meeting_settings',
		type: 'boolean',
		default: false,
		description: 'Whether the meeting type (vc_type) of the event needs to be vc',
	},

	NEED_NOTIFICATION: {
		displayName: 'Need Notification',
		name: 'need_notification',
		type: 'boolean',
		default: true,
		description: 'Whether to send Bot notifications to event participants when deleting a event',
	},

	CALENDAR_EVENT_ID: {
		displayName: 'Calendar Event ID',
		name: 'calendar_event_id',
		type: 'resourceLocator',
		default: { mode: 'id', value: '' },
		required: true,
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Input event key word',
				typeOptions: {
					searchListMethod: 'searchCalendarEvents',
					searchFilterRequired: true,
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter ID',
				default: '',
			},
		],
	},

	ONLY_BUSY: {
		displayName: 'Only Busy',
		name: 'only_busy',
		type: 'boolean',
		default: true,
	},

	INCLUDE_EXTERNAL_CALENDAR: {
		displayName: 'Include External Calendar',
		name: 'include_external_calendar',
		type: 'boolean',
		default: true,
	},

	START_TIME: {
		displayName: 'Start Time',
		name: 'start_time',
		type: 'dateTime',
		default: '',
		required: true,
	},

	END_TIME: {
		displayName: 'End Time',
		name: 'end_time',
		type: 'dateTime',
		default: '',
		required: true,
	},

	CALENDAR_ID: {
		displayName: 'Calendar ID',
		name: 'calendar_id',
		required: true,
		type: 'resourceLocator',
		default: { mode: 'id', value: '' },
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select Calendar',
				typeOptions: {
					searchListMethod: 'searchCalendars',
					searchFilterRequired: false,
					searchable: false,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter Calendar ID',
				default: '',
			},
		],
	},

	ARRAY_JSON: {
		displayName: 'Array JSON',
		name: 'array_json',
		type: 'json',
		default: [],
	},

	OFFSET: {
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
	},

	COUNT: {
		displayName: 'Count',
		name: 'count',
		type: 'number',
		default: 20,
		typeOptions: {
			minValue: 0,
			maxValue: 50,
			numberPrecision: 0,
		},
	},

	SEARCH_KEY: {
		displayName: 'Search Key',
		name: 'search_key',
		type: 'string',
		default: '',
		required: true,
	},

	SEARCH_FILE_TYPE: {
		displayName: 'Search File Type',
		name: 'search_file_type',
		type: 'multiOptions',
		default: [],
		options: [
			{ name: 'Bitable', value: FileType.Bitable },
			{ name: 'Doc', value: FileType.Doc },
			{
				name: 'File',
				value: FileType.File,
			},
			{
				name: 'Mindnote',
				value: FileType.Mindnote,
			},
			{
				name: 'Slides',
				value: FileType.Slides,
			},
			{
				name: 'Spreadsheet',
				value: FileType.Sheet,
			},
		],
	},

	DEPARTMENT_ID_TYPE: {
		displayName: 'Department ID Type',
		name: 'department_id_type',
		type: 'options',
		options: [
			{ name: 'Department ID', value: 'department_id' },
			{ name: 'Open Department ID', value: 'open_department_id' },
		],
		default: 'open_department_id',
	},

	INCLUDE_RESIGNED: {
		displayName: 'Include Resigned',
		name: 'include_resigned',
		type: 'boolean',
		description: 'Whether the query results contain user information of resigned employees',
		default: false,
	},

	ORDER_BY: {
		displayName: 'Order By',
		name: 'order_by',
		type: 'options',
		default: 'EditedTime',
		options: [
			{ name: 'Edited Time', value: 'EditedTime' },
			{ name: 'Created Time', value: 'CreatedTime' },
		],
	},

	DIRECTION: {
		displayName: 'Direction',
		name: 'direction',
		type: 'options',
		default: 'DESC',
		options: [
			{ name: 'ASC', value: 'ASC' },
			{ name: 'DESC', value: 'DESC' },
		],
	},

	FILE_TOKEN: {
		displayName: 'File Token',
		name: 'file_token',
		required: true,
		type: 'resourceLocator',
		default: { mode: 'id', value: '' },
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select File',
				typeOptions: {
					searchListMethod: 'searchFiles',
					searchFilterRequired: false,
					searchable: false,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter File Token',
				default: '',
			},
		],
	},

	SPACE_FILE_TYPE: {
		displayName: 'File Type',
		name: 'space_file_type',
		type: 'multiOptions',
		default: [],
		required: true,
		options: [
			{
				name: 'Bitable',
				value: FileType.Bitable,
			},
			{
				name: 'Doc',
				value: FileType.Doc,
			},
			{
				name: 'Docx',
				value: FileType.Docx,
			},
			{
				name: 'Folder',
				value: FileType.Folder,
			},
			{
				name: 'Mindnote',
				value: FileType.Mindnote,
			},
			{
				name: 'Shortcut',
				value: FileType.Shortcut,
			},
			{
				name: 'Slides',
				value: FileType.Slides,
			},
			{
				name: 'Spreadsheet',
				value: FileType.Sheet,
			},
		],
	},

	NAME: {
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
	},

	CONVERT_BLOCK_CONTENT_TYPE: {
		displayName: 'Content Type',
		name: 'content_type',
		type: 'options',
		default: 'markdown',
		required: true,
		options: [
			{ name: 'Markdown', value: 'markdown' },
			{ name: 'HTML', value: 'html' },
		],
	},

	CONVERT_BLOCK_CONTENT: {
		displayName: 'Markdown/HTML Content',
		name: 'content',
		type: 'string',
		default: '',
		required: true,
	},

	SPREADSHEET_ID: {
		displayName: 'Spreadsheet ID',
		name: 'spreadsheet_id',
		type: 'resourceLocator',
		default: { mode: 'id', value: '' },
		required: true,
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select Spreadsheet',
				typeOptions: {
					searchListMethod: 'searchSpreadsheets',
					searchFilterRequired: false,
					searchable: false,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter Spreadsheet ID',
				default: '',
			},
		],
	},

	DOCUMENT_BLOCK_ID: {
		displayName: 'Parent Block ID',
		name: 'block_id',
		type: 'string',
		default: '',
		required: true,
		description: 'The block_id of the parent block',
	},

	DOCUMENT_REVISION_ID: {
		displayName: 'Document Version ID',
		name: 'document_revision_id',
		type: 'number',
		typeOptions: {
			minValue: -1,
			numberPrecision: 0,
		},
		default: -1,
		description:
			'-1 indicates the latest version of the document. Once the document is created, the document_revision_id is 1.',
	},

	DOCUMENT_ID: {
		displayName: 'Document ID',
		name: 'document_id',
		type: 'resourceLocator',
		default: { mode: 'id', value: '' },
		required: true,
		description: 'Need to have the read permission of base role',
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select Document',
				typeOptions: {
					searchListMethod: 'searchDocuments',
					searchFilterRequired: false,
					searchable: false,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter Document ID',
				default: '',
			},
		],
	},

	TITLE: {
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		description: 'Only supports plain text. Length range: 1 characters to 800 characters.',
	},

	FILE_DURATION: {
		displayName: 'File Duration',
		name: 'file_duration',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				file_type: ['mp4', 'opus'],
			},
		},
	},

	FILE_NAME: {
		displayName: 'File Name',
		name: 'file_name',
		type: 'string',
		default: '',
		hint: 'File name with a suffix, like test.mp4',
	},

	MESSAGE_UPLOAD_FILE_TYPE: {
		displayName: 'File Type',
		name: 'file_type',
		type: 'options',
		options: [
			{
				name: 'DOC',
				value: 'doc',
			},
			{
				name: 'MP4',
				value: 'mp4',
				description: 'Only supports mp4 format for video',
			},
			{
				name: 'OPUS',
				value: 'opus',
				description: 'Only supports opus format for audio',
			},
			{
				name: 'PDF',
				value: 'pdf',
			},
			{
				name: 'PPT',
				value: 'ppt',
			},
			{
				name: 'Stream',
				value: 'stream',
				description: 'For other format that not listed',
			},
			{
				name: 'XLS',
				value: 'xls',
			},
		],
		default: 'opus',
	},

	BINARY_PROPERTY_NAME: {
		displayName: 'Binary Field',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		placeholder: '',
		description: 'The name of the input binary field containing the file/image to be uploaded',
	},

	DOWNLOAD_RESOURCE: {
		displayName: 'Whether Download Resource',
		name: 'downloadResource',
		type: 'boolean',
		default: false,
		required: true,
		description: 'Whether to download resources such as images, files, etc',
		displayOptions: {
			show: {
				messageTypes: [
					MessageType.Image,
					MessageType.File,
					MessageType.Audio,
					MessageType.Video,
					MessageType.RichText,
				],
			},
		},
	},

	RECEIVE_MESSAGE_TYPES: {
		displayName: 'Message Type',
		name: 'messageTypes',
		type: 'multiOptions',
		options: [
			{
				name: 'Image',
				value: MessageType.Image,
				description: MessageType.Image,
			},
			{
				name: 'File',
				value: MessageType.File,
				description: MessageType.File,
			},
			{
				name: 'Rich Text',
				value: MessageType.RichText,
				description: MessageType.RichText,
			},
			{
				name: 'Audio',
				value: MessageType.Audio,
				description: MessageType.Audio,
			},
			{
				name: 'Video',
				value: MessageType.Video,
				description: MessageType.Video,
			},
			{
				name: 'Card',
				value: MessageType.Card,
				description: MessageType.Card,
			},
			{
				name: 'Location',
				value: MessageType.Location,
				description: MessageType.Location,
			},
			{
				name: 'Todo',
				value: MessageType.Todo,
				description: MessageType.Todo,
			},
			{
				name: 'Calendar Event',
				value: MessageType.CalendarEvent,
				description: MessageType.CalendarEvent,
			},
			{
				name: 'Text',
				value: MessageType.Text,
				description: MessageType.Text,
			},
		],
		required: true,
		default: [MessageType.Text],
	},

	RESOURCE_KEY: {
		displayName: 'Resource Key',
		name: 'file_key',
		type: 'string',
		required: true,
		default: '',
		description: 'The key of the resource to be queried',
	},

	RESOURCE_TYPE: {
		displayName: 'Resource Type',
		name: 'type',
		type: 'options',
		options: [
			{
				name: 'Image',
				value: 'image',
				description: 'The image in the content',
			},
			{
				name: 'File',
				value: 'file',
				description: 'The file, audio, video (except emoticons) in the content',
			},
		],
		default: 'image',
	},

	MESSAGE_REPLY_IN_THREAD: {
		displayName: 'Whether Reply in Thread',
		name: 'reply_in_thread',
		type: 'boolean',
		default: false,
		description:
			'Whether to reply in thread form. If the value is true, the reply will be in thread form.',
	},

	MESSAGE_ID: {
		displayName: 'Message ID',
		name: 'message_id',
		type: 'string',
		required: true,
		default: '',
	},

	MESSAGE_CONTENT: {
		displayName: 'Message Content',
		require: true,
		...OBJECT_JSON,
		name: 'content',
	},

	MESSAGE_TYPE: {
		displayName: 'Message Type',
		name: 'msg_type',
		type: 'options',
		options: [
			{ name: 'Audio', value: 'audio' },
			{ name: 'File', value: 'file' },
			{ name: 'Image', value: 'image' },
			{ name: 'Interactive Card', value: 'interactive' },
			{ name: 'Rich Text', value: 'post' },
			{ name: 'Share Chat', value: 'share_chat' },
			{ name: 'Share User', value: 'share_user' },
			{ name: 'Sticker', value: 'sticker' },
			{ name: 'System Message', value: 'system' },
			{ name: 'Text', value: 'text' },
			{ name: 'Video', value: 'media' },
		],
		required: true,
		default: 'text',
	},

	RECEIVE_ID_TYPE: {
		displayName: 'Receiver ID Type',
		name: 'receive_id_type',
		type: 'options',
		options: [
			{
				name: 'Chat ID',
				value: 'chat_id',
				description: 'Identifies group chats by chat_id',
			},
			{
				name: 'Email',
				value: 'email',
				description: 'Identifies users by "email"',
			},
			{
				name: 'Open ID',
				value: 'open_id',
				description: 'Identifies a user to an app',
			},
			{
				name: 'Union ID',
				value: 'union_id',
				description: 'Identifies a user to a tenant that acts as a developer',
			},
			{
				name: 'User ID',
				value: 'user_id',
				description: 'Identifies a user to a tenant',
			},
		],
		required: true,
		default: 'open_id',
	},

	CALENDAR_COLOR: {
		displayName: 'Color',
		name: 'color',
		type: 'color',
		default: '',
	},

	CALENDAR_SUMMARY_ALIAS: {
		displayName: 'Summary Alias',
		name: 'summary_alias',
		type: 'string',
		default: '',
		description:
			'Setting this field (including subsequent modification of this field) only takes effect for the current identity',
	},

	CALENDAR_PERMISSIONS: {
		displayName: 'Permissions',
		name: 'permissions',
		type: 'options',
		options: [
			{ name: 'Private', value: 'private' },
			{ name: 'Show Only Free Busy', value: 'show_only_free_busy' },
			{ name: 'Public', value: 'public' },
		],
		default: 'show_only_free_busy',
		description: 'Calendar visibility range',
	},

	CALENDAR_DESCRIPTION: {
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Maximum length: 255 characters',
	},

	CALENDAR_TITLE: {
		displayName: 'Summary',
		name: 'summary',
		type: 'string',
		default: '',
		description: 'Maximum length: 255 characters',
	},

	MEMBER_ID: {
		displayName: 'Member ID',
		name: 'member_id',
		type: 'resourceLocator',
		default: { mode: 'id', value: '' },
		required: true,
		description: 'Need to have the read permission of base role',
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Input phone number or email',
				typeOptions: {
					searchListMethod: 'searchUserIds',
					searchFilterRequired: true,
					searchable: true,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter ID',
				default: '',
			},
		],
	},

	MEMBER_ID_TYPE: {
		displayName: 'Member ID Type',
		name: 'member_id_type',
		type: 'options',
		options: [
			{ name: 'Chat ID', value: 'chat_id' },
			{ name: 'Department ID', value: 'department_id' },
			{ name: 'Open Department ID', value: 'open_department_id' },
			{ name: 'Open ID', value: 'open_id' },
			{ name: 'Union ID', value: 'union_id' },
			{ name: 'User ID', value: 'user_id' },
		],
		default: 'open_id',
	},

	BASE_ROLE_ID: {
		displayName: 'Role ID',
		name: 'role_id',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		description: 'Need to have the read permission of base role',
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select Role',
				typeOptions: {
					searchListMethod: 'searchBaseRoles',
					searchFilterRequired: false,
					searchable: false,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter Role ID',
				default: '',
			},
		],
	},

	TEXT_FIELD_AS_ARRAY: {
		displayName: 'Text Field as Array',
		name: 'text_field_as_array',
		type: 'boolean',
		default: false,
		description:
			'Whether to control the return format of field description (multi-line text format) data, true means return in array rich text form',
	},

	TABLE_FIELD_ID: {
		displayName: 'Field ID',
		name: 'field_id',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		description: 'Need to have the permission to view the Base above',
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select Field',
				typeOptions: {
					searchListMethod: 'searchTableFields',
					searchFilterRequired: false,
					searchable: false,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter Field ID',
				default: '',
			},
		],
	},

	AUTOMATIC_FIELDS: {
		displayName: 'Whether to Return Automatic Fields',
		name: 'automatic_fields',
		type: 'boolean',
		default: false,
	},

	WITH_SHARED_URL: {
		displayName: 'Whether to Return Shared Link',
		name: 'with_shared_url',
		type: 'boolean',
		default: false,
	},

	TABLE_RECORD_ID: {
		displayName: 'Record ID',
		name: 'record_id',
		type: 'string',
		required: true,
		default: '',
	},

	TABLE_VIEW_PROPERTY: {
		displayName: 'View Property',
		...OBJECT_JSON,
	},

	TABLE_VIEW_ID: {
		displayName: 'View',
		name: 'view_id',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		description: 'Need to have the permission to view the Base above',
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select View',
				typeOptions: {
					searchListMethod: 'searchTableViews',
					searchFilterRequired: false,
					searchable: false,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter View ID',
				default: '',
			},
		],
	},

	TABLE_VIEW_TYPE: {
		displayName: 'View Type',
		name: 'view_type',
		required: true,
		type: 'options',
		options: [
			{
				name: 'Form View',
				value: 'form',
			},
			{
				name: 'Gallery View',
				value: 'gallery',
			},
			{
				name: 'Gantt View',
				value: 'gantt',
			},
			{
				name: 'Grid View',
				value: 'grid',
			},
			{
				name: 'Kanban View',
				value: 'kanban',
			},
		],
		default: 'grid',
	},

	TABLE_VIEW_NAME: {
		displayName: 'View Name',
		name: 'view_name',
		type: 'string',
		required: true,
		default: '',
		description:
			'Name cannot contain special characters, must be no more than 100 characters long, cannot be empty, and must not contain these special symbols: [ ]',
	},

	PAGE_SIZE: {
		displayName: 'Page Size',
		name: 'page_size',
		type: 'number',
		default: 20,
		displayOptions: {
			show: {
				whether_paging: [true],
			},
		},
	},

	PAGE_TOKEN: {
		displayName: 'Page Token',
		name: 'page_token',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		description:
			'It is not filled in the first request, indicating traversal from the beginning; when there will be more groups, the new page_token will be returned at the same time, and the next traversal can use the page_token to get more groups',
		displayOptions: {
			show: {
				whether_paging: [true],
			},
		},
	},

	WHETHER_PAGING: {
		displayName: 'Whether Paging',
		name: 'whether_paging',
		type: 'boolean',
		default: false,
	},

	NEW_NAME: {
		displayName: 'New Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
	},

	IS_ADVANCED: {
		displayName: 'Turn on/off Advanced',
		name: 'is_advanced',
		type: 'boolean',
		default: false,
	},

	WHETHER_COPY_CONTENT: {
		displayName: 'Copy the Content',
		name: 'without_content',
		type: 'boolean',
		default: false,
		description:
			'Whether to copy the content from the original table, True is copy, False is not copy',
	},

	TIME_ZONE: {
		displayName: 'Time Zone',
		name: 'time_zone',
		type: 'string',
		default: 'Asia/Shanghai',
		description:
			'<a target="_blank" href="https://bytedance.larkoffice.com/docx/YKRndTM7VoyDqpxqqeEcd67MnEf">Open document</a>',
	},

	FOLDER_TOKEN: {
		displayName: 'Folder Token',
		name: 'folder_token',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		description: 'Need to have the read permission of base role',
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select Folder',
				typeOptions: {
					searchListMethod: 'searchFolders',
					searchFilterRequired: false,
					searchable: false,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter Folder Token',
				default: '',
			},
		],
	},

	BASE_APP_NAME: {
		displayName: 'App Name',
		name: 'name',
		type: 'string',
		default: '',
	},

	REQUEST_BODY: {
		displayName: 'Request Body',
		require: true,
		...OBJECT_JSON,
	},

	REQUEST_ID: {
		displayName: 'Request ID',
		name: 'request_id',
		type: 'string',
		default: '',
		description: 'Unique identifier for the request, used to ensure idempotency',
	},

	USER_ID_TYPE: {
		displayName: 'User ID Type',
		name: 'user_id_type',
		type: 'options',
		options: [
			{ name: 'Open ID', value: 'open_id' },
			{ name: 'Union ID', value: 'union_id' },
			{ name: 'User ID', value: 'user_id' },
		],
		default: 'open_id',
	},

	BASE_APP_TOKEN: {
		displayName: 'Base App',
		name: 'app_token',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		description: 'Need to have the permission to view all files in my space',
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select Base App',
				typeOptions: {
					searchListMethod: 'searchBitables',
					searchFilterRequired: false,
					searchable: false,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter App Token',
				default: '',
			},
		],
	},

	RECORD_IDS: {
		displayName: 'Record IDs',
		name: 'record_ids',
		type: 'json',
		default: '[]',
		required: true,
		description: 'List of record IDs to retrieve',
	},

	BASE_TABLE_ID: {
		displayName: 'Table',
		name: 'table_id',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		description: 'Need to have the permission to view the Base above',
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select Table',
				typeOptions: {
					searchListMethod: 'searchTables',
					searchFilterRequired: false,
					searchable: false,
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				placeholder: 'Enter Table ID',
				default: '',
			},
		],
	},

	IGNORE_CONSISTENCY_CHECK: {
		displayName: 'Ignore Consistency Check',
		name: 'ignore_consistency_check',
		type: 'boolean',
		default: true,
		description: 'Whether to ignore consistency checks',
	},

	CALENDAR_EVENT_ATTENDEES: {
		displayName: 'Attendees',
		name: 'attendees',
		type: 'json',
		default: '[]',
		required: true,
		description: 'List of attendees to add to the event',
	},

	INSTANCE_START_TIME_ADMIN: {
		displayName: 'Instance Start Time Admin',
		name: 'instance_start_time_admin',
		type: 'string',
		default: '',
		description:
			'This parameter is only used to modify a event instance in a repeating event. This field does not need to be filled in for non-repeating events.',
	},

	IS_ENABLE_ADMIN: {
		displayName: 'Enable Admin',
		name: 'is_enable_admin',
		type: 'boolean',
		default: false,
		description:
			'Whether to enable the meeting room administrator status (you need to set a member as the meeting room administrator in the management background first)',
	},

	ADD_OPERATOR_TO_ATTENDEE: {
		displayName: 'Add Operator to Attendee',
		name: 'add_operator_to_attendee',
		type: 'boolean',
		default: false,
		description: 'Whether to add the meeting room contact (operate_id) to the schedule invitees',
	},

	CALENDAR_EVENT_ATTENDEE_IDS: {
		displayName: 'Attendee IDs',
		name: 'attendee_ids',
		type: 'json',
		default: '[]',
		required: true,
		description: 'List of attendee IDs to delete',
	},

	CALENDAR_EVENT_DELETE_IDS: {
		displayName: 'Delete IDs',
		name: 'delete_ids',
		type: 'json',
		default: '[]',
		description:
			'The ID corresponding to the invitee type, which is a supplementary field to the attendee_ids field',
	},

	NEED_RESOURCE_CUSTOMIZATION: {
		displayName: 'Need Resource Customization',
		name: 'need_resource_customization',
		type: 'boolean',
		default: false,
		description: 'Whether meeting room form information is required',
	},

	MEETING_CHAT_ID: {
		displayName: 'Meeting Chat ID',
		name: 'meeting_chat_id',
		type: 'string',
		required: true,
		default: '',
		description: 'The group ID is returned when the group is created',
	},
};




