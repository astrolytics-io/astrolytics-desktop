# Astrolytics.io Desktop SDK

![Astrolytics.io](https://intriguing-lemonade-efa.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb00319ab-5801-40dc-b0f4-5de683b11d61%2Fgithub_browser_sdk_banner.jpg?id=9fabfb89-61d3-4d87-97ff-ef88c9bd8947&table=block)

Astrolytics currently works with Electron and Tauri. If you'd like us to support another desktop framework, send us an email to hello@astrolytics.io.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Usage](#usage)
3. [How to Contribute](#how-to-contribute)

## Getting Started

To get started with Astrolytics, create an account at [Astrolytics](https://dash.astrolytics.io/login) and grab the App ID, then
use the SDK to start tracking events.

### Installation

As NPM package (recommended)

```bash
# with npm
npm install astrolytics-desktop

# or with yarn
yarn add astrolytics-desktop
```

### Usage


```javascript
import Astrolytics from 'astrolytics-desktop';

Astrolytics.init('YOUR_APP_ID');
```

Replace `'YOUR_APP_ID'` with the unique ID of your app. You can get it [here](https://dash.astrolytics.io/account).

You can check examples with different frameworks [here](./playground).

## API

Astrolytics supports passing the following options as second argument to the `Astrolytics.init()` method:

```js
Astrolytics.init('APP_ID', {
  endpoint: 'wss://app.astrolytics.io', // only option, we don't allow self hosting yet :(
  disableInDev: true, // disable in development mode. We recommend not to call
                      // `init` method, as that will be more reliable.
  debug: false, // if set to `true`, will log a bunch of things.
  disableTracking: false, // will not track anything. You can also use `Astrolytics.disableTracking()`.
                          // note that some events will still be added to the queue, so if you call
                          // Astrolytics.enableTracking() again, they will be sent to the server.
  automaticPageTracking: true, // will track all page changes.
  reportInterval: 2 * 1000, // at which interval the events are sent to the server.
  sessionTimeout: 60 * 30 * 1000, // time after which the session is ended
  cutoff: 60 * 60 * 48 * 1000, // time after which event that were not sent yet are deleted
  disableErrorReports: false, // wether to disable error tracking
})
```

### Tracking

Track events with optional custom data

```javascript
Astrolytics.track("click", { foo: 'bar' });
```

### Error Tracking

Track errors with a name and the Error object.

```javascript
Astrolytics.trackError(name, error);
```

By default Astrolytics will listen for `window.onerror` and `window.onunhandledrejection` events and send them to the API. If you want
to disable this behaviour, you can set `disableErrorReports` to `true`:

```js
Astrolytics.init('APP_ID', { disableErrorReports: true })
```

### User Identification

Identify a user by a unique ID and optionally set custom properties.

```javascript
Astrolytics.identify('04f8846d-ecca-4a81-8740-f6428ceb7f7b', { firstName: 'Brendan', lastName: 'Eich' });
```

### Page Tracking

Track page views with the page name and optional parameters. If the page name is not provided, the current window's pathname is used.

```javascript
Astrolytics.page('/about', { foo: 'baz' });
```

By default, Astrolytics will track any page change by polling the url every 50 ms. If you prefer to manually track page changes, set `automaticPageTracking` to false and call `Astrolytics.page()` on every page change.

### Disabling Tracking

To disable tracking

```javascript
Astrolytics.disableTracking();
```

### Enabling Tracking

To enable tracking

```javascript
Astrolytics.enableTracking();
```

## How to Contribute

We're always looking for contributions from the community. Here's how you can help:

1. **Report Bugs**: Create an issue report detailing the bug you've found.
2. **Suggest Features**: Have a great idea for Astrolytics? Don't hesitate to put it forward by creating an issue.
3. **Submit Pull Requests**: Feel free to fix a bug or add a new feature and create a pull request. Make sure to follow the existing code style, and write clear commit messages explaining your changes.
