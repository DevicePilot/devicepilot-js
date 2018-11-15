# DevicePilot SDK for JavaScript

www.devicepilot.com

DevicePilot is a universal cloud-based software service allowing you to easily locate, monitor and manage your connected devices at scale, with proactive management of the entire device lifecycle.

This library helps you quickly get started posting your device telemetry so you can begin exploring your IoT data in DevicePilot.

### Getting Started

1. Sign up for a DevicePilot account if you haven't already!

> [You can register for free at devicepilot.com](https://app.devicepilot.com/#/user/register)

2. Get your API key

> [Find your API Key in Settings > My User](https://app.devicepilot.com/#/settings/my-user)

3. Add the DevicePilot library to your node-js project:

```
npm install devicepilot
```

4. Start posting your device telemetry:

```javascript
  const devicepilot = require('devicepilot');

  // api key should be explicitly provided, or stored in the environmental variable DP_API_KEY
  const apiKey = 'your-devicepilot-api-key';

  async function update() {
    const record = {
      $id: 'unique-device-id', // this is used to identify your device
      // any valid json body will be converted into key:value telemetry:
      ledColour: 'blue',
      switchedOn: true,
      temperature: 20,
    };
    // an array of record objects can also be provided
  
    await devicepilot.post(record, apiKey);
  };

  update();
```

### Documentation

For more information about using DevicePilot, check out: https://help.devicepilot.com/
