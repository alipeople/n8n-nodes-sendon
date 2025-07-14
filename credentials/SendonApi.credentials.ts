import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class SendonApi implements ICredentialType {
  name = 'sendonApi';
  displayName = 'Sendon API';
  documentationUrl = 'https://api.sendon.io/swagger';
  properties: INodeProperties[] = [
    {
      displayName: 'Sendon ID',
      name: 'id',
      type: 'string',
      default: '',
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
    },
  ];
}
