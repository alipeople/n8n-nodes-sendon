import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties
} from 'n8n-workflow';

export class SendonApi implements ICredentialType {
  name = 'sendonApi';
  displayName = 'Sendon API';
  documentationUrl = 'https://sdk.sendon.io/docs/generate-api-key';
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

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      auth: {
        username: '={{$credentials.id}}',
        password: '={{$credentials.apiKey}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    // Note: Sendon service returns 403 Forbidden for non-subscribers. Only valid subscribers will receive 200.
    request: {
      method: 'GET',
      url: 'https://api.sendon.io/v2/messages/sms/groups',
    },
    rules: [
      {
        type: 'responseCode',
        properties: {
          value: 200,
          message: 'Expected HTTP 200 response when credentials are valid',
        },
      },
      {
        type: 'responseCode',
        properties: {
          value: 401,
          message: 'Received 401 Unauthorized. Your IP might not be whitelisted for Sendon API access.',
        },
      },
      {
        type: 'responseCode',
        properties: {
          value: 403,
          message: 'Received 403 Forbidden. You might not be a registered Sendon subscriber.',
        },
      },
    ],
  };
}
