import { IDataObject, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import RequestUtils from '../../../help/utils/RequestUtils';
import { ResourceOperation } from '../../../help/type/IResource';
import { DESCRIPTIONS } from '../../../help/description';
import { WORDING } from '../../../help/wording';
import { OperationType } from '../../../help/type/enums';

const DOC_URL = 'https://open.larksuite.com/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/reference/report-vc/report/get_top_user';

function toUnixSeconds(value: unknown, field: string, itemIndex: number, context: IExecuteFunctions): number {
	if (value === null || value === undefined || value === '') {
		throw new NodeOperationError(
			context.getNode(),
			`Missing required ${field} at item ${itemIndex + 1}`,
			{ description: 'Please provide a valid date/time value.' },
		);
	}

	if (typeof value === 'number') {
		return Math.floor(value);
	}

	if (typeof value === 'string') {
		const trimmed = value.trim();
		if (/^\d+$/.test(trimmed)) {
			// Treat as unix seconds if <= 10 digits, otherwise milliseconds
			return trimmed.length > 10 ? Math.floor(Number(trimmed) / 1000) : Number(trimmed);
		}

		const parsed = Date.parse(trimmed);
		if (Number.isNaN(parsed)) {
			throw new NodeOperationError(
				context.getNode(),
				`Invalid ${field} at item ${itemIndex + 1}`,
				{ description: `Unable to parse date value: ${trimmed}` },
			);
		}
		return Math.floor(parsed / 1000);
	}

	throw new NodeOperationError(
		context.getNode(),
		`Unsupported ${field} type at item ${itemIndex + 1}`,
		{ description: `Received value: ${JSON.stringify(value)}` },
	);
}

export default {
	name: WORDING.GetTopVcUsers,
	value: OperationType.GetTopVcUsers,
	order: 90,
	options: [
		DESCRIPTIONS.START_TIME,
		DESCRIPTIONS.END_TIME,
		DESCRIPTIONS.TOP_USER_LIMIT,
		DESCRIPTIONS.TOP_USER_ORDER_BY,
		DESCRIPTIONS.USER_ID_TYPE,
		{
			displayName: `<a target="_blank" href="${DOC_URL}">${WORDING.OpenDocument}</a>`,
			name: 'notice',
			type: 'notice',
			default: '',
		},
	],
	async call(this: IExecuteFunctions, index: number): Promise<IDataObject[]> {
		const startTimeRaw = this.getNodeParameter('start_time', index);
		const endTimeRaw = this.getNodeParameter('end_time', index);
		const limit = this.getNodeParameter('limit', index) as number;
		const orderByRaw = this.getNodeParameter('order_by', index, '1') as string;
		const userIdType = this.getNodeParameter('user_id_type', index, 'open_id') as string;

		const start_time = toUnixSeconds(startTimeRaw, 'start_time', index, this);
		const end_time = toUnixSeconds(endTimeRaw, 'end_time', index, this);

		if (end_time <= start_time) {
			throw new NodeOperationError(
				this.getNode(),
				'End time must be greater than start time',
				{ description: `Start: ${start_time}, End: ${end_time}` },
			);
		}

		if (limit < 1 || limit > 100) {
			throw new NodeOperationError(this.getNode(), 'Limit must be between 1 and 100');
		}

		const order_by = Number(orderByRaw);

		const { data } = (await RequestUtils.request.call(this, {
			method: 'GET',
			url: '/open-apis/vc/v1/reports/get_top_user',
			qs: {
				start_time,
				end_time,
				limit,
				order_by,
				...(userIdType ? { user_id_type: userIdType } : {}),
			},
		})) as { data?: IDataObject };

		const report = (data?.top_user_report as IDataObject[]) || [];
		return report;
	},
} as ResourceOperation;
