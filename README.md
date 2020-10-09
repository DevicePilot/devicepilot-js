# DevicePilot SDK for JavaScript

<a href="https://nodei.co/npm/devicepilot/">
  <img src="https://nodei.co/npm/devicepilot.svg?downloads=true&downloadRank=true&stars=true">
</a>

www.devicepilot.com

DevicePilot is the analytics, visualization, and automation tool for IoT. Plug in your data and get instant, powerful insights to track all the important metrics that your business depends on.

This library helps you quickly get started posting your device telemetry so you can begin exploring your IoT data in DevicePilot.

### Set-up

* Sign up for a DevicePilot account if you haven't already!

> [You can book a demo at devicepilot.com](https://www.devicepilot.com/contact)

* Get your POST or KPI token

> [Find your token in Settings > Tokens](https://app.devicepilot.com/#/settings/tokens)

* Add the DevicePilot library to your project:

```
npm install devicepilot
```

### Getting Started

```javascript
const { DPPost, DPKpi } = require('devicepilot');

const dp = DevicePilot({
  postToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Required for post requests
  kpiToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Required for kpi requests
});
```

### APIs

* `dp.post`: takes a telemetry record or an array of records and posts it to DevicePilot
* `dp.kpi.getResults`: takes a KPI identifier and returns its current results

### Examples

#### Post

```javascript
const { DPPost } = require('devicepilot');

const dp = new DPPost('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');  // token for post requests

async function post() {
  await dp
    .postRecords({
      $id: 'unique-device-id', // this is used to identify your device
      // any valid json body will be converted into key:value telemetry:
      ledColour: 'blue',
      switchedOn: true,
      temperature: 20,
      // an array of record objects can also be provided
    })
    .catch((error) => {
      // an error occurred and the post was not successful.
      console.log('post was not successful');
      throw error;
    });
  console.log('posted one record successfully');
}
post();
```

#### Get KPI Results

```javascript
const { DPPost } = require('devicepilot');

const dp = new DPKpi('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');  // token for kpi request

// You can find the ID of a KPI from the Tokens page.
// See documentation for further information.
const kpiId = '12345678-abcd-1234-abcd-1234567890ab';
async function get() {
  const kpiResult = await dp
    .getResults(kpiId)
    .catch((error) => {
      // an error occurred fetching results
    });
  const {
    data, // data required to display a KPI result, e.g. x and y for a scatter chart
    meta, // additional information about the data returned, e.g. the type of the y axis
  } = kpiResult;
  console.log(JSON.stringify(data, null, 2));
}
get();
```

### Breaking Changes

Version 3.0 is a re-write in typescript and separates the posting and kpi clients.

Version 3 also drops support for silently (and surprisingly) attempting to auto-coerce records into the correct (`{ $id: string, $ts?: number, [string]: boolean | string | number | null }`) format.

Version 3.0 requires node 10 or above for server environments.

### Documentation

For more information about using DevicePilot, check out: https://help.devicepilot.com/
