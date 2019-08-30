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

* `dp.post`: takes a telemetryObject and post it to DevicePilot
* `dp.kpi.getResults`: takes a KPI ID and returns the results

### Examples

#### Post

```javascript
await dp
  .post({
    $id: 'unique-device-id', // this is used to identify your device
    // any valid json body will be converted into key:value telemetry:
    ledColour: 'blue',
    switchedOn: true,
    temperature: 20,
    // an array of record objects can also be provided
  })
  .catch((error) => {
    // an error occurred and the post was not successful.
  });
```

#### Get KPI Results

```javascript
// You can find the ID of a KPI from the Tokens page.
// See documentation for further information.
const kpiId = '1234';
const kpiResult = await dp.kpi
  .getResults('your-kpi-id')
  .catch((error) => {
    // an error occurred fetching results
  });
const {
  data, // data required to display a KPI result, e.g. x and y for a scatter chart
  meta, // additional information about the data returned, e.g. the type of the y axis
} = kpiResult;
```

### Breaking Changes

Version 2.0 introduces `dp.kpi.getResults` and makes `devicepilot` isomorphic (the package can now safely be used in browser and server deployments).

To achieve this we have dropped support for token configuration from the environment, and instead added the `postToken` and `kpiToken` to the constructor.

### Documentation

For more information about using DevicePilot, check out: https://help.devicepilot.com/
