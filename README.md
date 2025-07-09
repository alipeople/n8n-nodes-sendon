# n8n-nodes-sendon

This is an n8n community node. It lets you use Sendon in your n8n workflows.

Sendon is a messaging platform that allows you to send SMS, LMS, and MMS messages programmatically via API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

The Sendon node supports the following operations:

- Send SMS, LMS, and MMS messages
  - Automatic message type detection (SMS/LMS) based on content length
  - Optional title auto-generation for LMS/MMS
  - Support for development and production environments
  - Mark message as advertisement

## Credentials

To use this node, you need a Sendon account and API credentials.

1. Sign up at [Sendon](https://sendon.io/) as business type and obtain your Sendon ID and API Key.
2. Charge your credits or points to send messages.
3. Generate your API Key in your settings.
4. In n8n, go to **Settings** → **Credentials**.
5. Add new credentials for "Sendon" and enter:
   - **Sendon ID**: Your Sendon account ID
   - **API Key**: Your Sendon API key

Authentication uses HTTP Basic Auth with your Sendon ID and API Key.

## Compatibility

- Requires n8n version: 1.0.0 or higher (please adjust if you have a different minimum)
- Node.js ≥ 20.15
- No known incompatibilities at this time.

## Usage

### Parameters

- **Sender Number** (`from`): The phone number sending the message
- **Recipient Number** (`to`): The phone number receiving the message
- **Message** (`message`): The content of your SMS/LMS/MMS
- **Title** (`title`, optional): Custom title for LMS/MMS (auto-generated from first 20 characters if omitted)
- **Is Ad** (`isAd`, optional): Mark as advertisement (default: false)
- **Type** (`type`, optional): `Auto` (default), `SMS`, `LMS`, `MMS`

### Message Type Auto-Detection

- If `Type` is set to `Auto` or left blank:
  - **SMS**: ≤ 90 bytes
  - **LMS**: > 90 bytes
  - **MMS**: Only if selected manually

### Example

**Basic SMS:**

```json
{
  "from": "01012345678",
  "to": "01087654321",
  "message": "Hello from n8n!",
  "isAd": false,
  "type": "auto"
}
```

**Long Message (LMS):**

```json
{
  "from": "01012345678",
  "to": "01087654321",
  "message": "This is a longer message that will automatically be sent as LMS because it exceeds the SMS character limit...",
  "title": "Custom Title",
  "isAd": false,
  "type": "auto"
}
```

For more usage help, see the [Try it out](https://docs.n8n.io/try-it-out/) documentation.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Sendon API documentation](https://sendon.io/docs)

## Version history

- v1.0.0: Initial release. Supports sending SMS, LMS, and MMS with auto-detection and credential management.
