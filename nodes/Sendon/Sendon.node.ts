import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeConnectionType,
} from 'n8n-workflow';

export class Sendon implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Sendon',
    name: 'sendon',
    group: ['transform'],
    version: 1,
    description: 'Send SMS using Sendon API',
    defaults: {
      name: 'Sendon SMS',
    },
    icon: { light: 'file:sendon.svg', dark: 'file:sendon.svg' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'sendonApi',
        required: true,
      },
    ],
    usableAsTool: true,
    properties: [
      {
        displayName: 'Sender Number',
        name: 'from',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Recipient Number',
        name: 'to',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Message',
        name: 'message',
        type: 'string',
        default: '',
      },
      {
        displayName: 'Is Ad',
        name: 'isAd',
        type: 'boolean',
        default: false,
      },
      {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        options: [
          { name: 'Auto', value: 'auto' },
          { name: 'SMS', value: 'SMS' },
          { name: 'LMS', value: 'LMS' },
          { name: 'MMS', value: 'MMS' },
        ],
        default: 'auto',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const baseUrl = 'https://api.sendon.io';

      const message = this.getNodeParameter('message', i) as string;
      let type = this.getNodeParameter('type', i) as string;
      let title = this.getNodeParameter('title', i) as string;

      // type 자동 판별
      if (!type || type === 'auto') {
        const encoder = new TextEncoder();
        const byteLength = encoder.encode(message).length;
        if (byteLength <= 90) {
          type = 'SMS';
        } else {
          type = 'LMS'; // 필요시 MMS 조건 추가 가능
        }
      }

      // LMS, MMS일 때 title 자동 생성
      if ((type === 'LMS' || type === 'MMS') && !title) {
        // AI title 생성은 워크플로우에서 처리 권장, 여기선 간단히 앞 20자 사용
        title = message.slice(0, 20);
      }

      const body = {
        type,
        from: this.getNodeParameter('from', i),
        to: [this.getNodeParameter('to', i)],
        message,
        isAd: this.getNodeParameter('isAd', i),
        ...(title ? { title } : {}),
      };

      const response = await this.helpers.httpRequestWithAuthentication.call(this, 'sendonApi', {
        method: 'POST',
        url: `${baseUrl}/v2/messages/sms`,
        headers: {
          'Content-Type': 'application/json',
					'user-agent': 'n8n-workflow',
        },
        body,
        json: true,
      });

      returnData.push({ json: response });
    }

    return [returnData];
  }
}
