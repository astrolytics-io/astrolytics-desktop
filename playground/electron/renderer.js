const Astrolytics = require('astrolytics-desktop');

Astrolytics.init('64ff453ad47692f4e15d0416', { debug: true });

Astrolytics.track('test', { test: 'test' });
