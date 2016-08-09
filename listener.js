/* eslint-disable no-console */

import './vendor/compass.min';
import Fingerprint2 from 'fingerprintjs2';
import post from './lib/post';

const dz = window.dz;

const STATE = {};
const BASE = process.env.NODE_ENV === 'development' ?
  'http://localhost:9292' :
  'https://spiritualdoor-api.herokuapp.com';
const ENDPOINT = `${BASE}/api/headings`;

const sample = (state, rate = 1000) => {
  console.info('Initializing sampler');

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
  .noSupport(() =>
    console.warn('Your device is unsupported'))

  .needGPS(() =>
    console.warn('A GPS signal is needed'))

  .needMove(() =>
    console.warn('Please move forward'))

  .init(() => {
    Compass.watch(heading =>
      STATE.heading = heading
    );

    sample(STATE, (dz && dz.sd && dz.sd.rate));
  });

new Fingerprint2()
  .get(fingerprint =>
    STATE.fingerprint = fingerprint
  );
