# DevicePilot SDK for JavaScript

https://www.devicepilot.com/

DevicePilot is a universal cloud-based software service allowing you to easily locate, monitor and manage your connected devices at scale, with proactive management of the entire device lifecycle.

This library helps you quickly get started posting your device telemetry so you can being exploring your IoT data in DevicePilot.

### Getting Started

1. Sign up for a DevicePilot account if you haven't already!

> [You can register for free at devicepilot.com](https://app.devicepilot.com/#/user/register)

2. Get your API key

> [Find your API Key in Settings > My User](https://app-development.devicepilot.com/#/settings/my-user)

3. Add the DevicePilot library to your node-js project:

```
npm install devicepilot
```

4. Start posting your device telemetry:

```javascript
  const devicepilot = require('devicepilot');

  // api key should be explicitly provided, or stored in the environmental variable DP_API_KEY
  const apiKey = 'your-devicepilot-api-key';

  const record = {
    $id: 'unique-device-id', // this is used to identify your device
    // any valid json body will be converted into key:value telemetry:
    ledColour: 'blue',
    switchedOn: trie,
    temperature: 20,
  };
  // an array of record objects can also be provided

  await devicepilot(record, apiKey);
```

### Documentation

For more information about using DevicePilot, checkout: https://help.devicepilot.com/
