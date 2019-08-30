# DevicePilot SDK for JavaScript

<a href="https://nodei.co/npm/devicepilot/">
  <img src="https://nodei.co/npm/devicepilot.svg?downloads=true&downloadRank=true&stars=true">
</a>

www.devicepilot.com

DevicePilot is a universal cloud-based software service allowing you to easily locate, monitor and manage your connected devices at scale, with proactive management of the entire device lifecycle.

This library helps you quickly get started posting your device telemetry so you can begin exploring your IoT data in DevicePilot.

### Set-up

* Sign up for a DevicePilot account if you haven't already!

> [You can book at demo at devicepilot.com](https://www.devicepilot.com/contact)

* Get your POST or KPI token

> [Find your token in Settings > Tokens](https://app.devicepilot.com/#/settings/tokens)

* Add the DevicePilot library to your project:

```
npm install devicepilot
```

### Getting Started

```javascript
const DevicePilot = require('devicepilot');

const dp = DevicePilot({
  postToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Required for post requests
  kpiToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Required for kpi requests
});
```

### APIs

* `dp.post`: takes a telemetryObject and post it to devicepilot
* `dp.kpi.getResults`: takes a kpi token and returns the kpi results

### Examples

#### Post

```javascript
await dp.post({
  $id: 'unique-device-id', // this is used to identify your device
  // any valid json body will be converted into key:value telemetry:
  ledColour: 'blue',
  switchedOn: true,
  temperature: 20,
});
// an array of record objects can also be provided
```

#### Get KPI Results

```javascript
const kpiResult = await dp.kpi.getResults('your-kpi-id');
```

### Documentation

For more information about using DevicePilot, check out: https://help.devicepilot.com/
