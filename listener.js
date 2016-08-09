/* eslint-disable no-console */

import './vendor/compass.min';
import Fingerprint2 from 'fingerprintjs2';
import post from './lib/post';

(function() {
  'use strict';

  const config = (window.dz && window.dz.sd) || {};

  const STATE = {};
  const LOG = process.env.NODE_ENV === 'development';
  const BASE = process.env.NODE_ENV === 'development' ?
    'http://localhost:9292' :
    'https://spiritualdoor-api.herokuapp.com';
  const ENDPOINT = `${BASE}/api/headings`;

  const sample = (state, rate = 1000) => {
    if (LOG) console.info('Initializing sampler');

    setInterval(() => {
      if (!state.heading) return;

      post(ENDPOINT, {
        value: state.heading,
        fingerprint: state.fingerprint,
        rate: rate,
      });
    }, rate);
  };

  Compass
    .noSupport(() => {
      if (LOG) console.warn('Your device is unsupported');
    })
    .needGPS(() => {
      if (LOG) console.warn('A GPS signal is needed');
    })
    .needMove(() => {
      if (LOG) console.warn('Please move forward');
    })
    .init(method => {
      if (LOG) console.info(`Method: ${method}`);
    })
    .watch(heading => {
      STATE.heading = heading;
    });

  new Fingerprint2()
    .get(fingerprint => {
      STATE.fingerprint = fingerprint;
    });

  sample(STATE, config.rate);
})();
