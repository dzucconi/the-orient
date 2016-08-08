import './vendor/compass.min';
import post from './lib/post';

const STATE = {};
const ENDPOINT = 'https://damonzucconi-spiritual-door.herokuapp.com/api/headings';

const sample = (state, rate = 2000) => {
  console.info('Initializing sampler');

  setInterval(() => {
    if (!state.heading) return;

    post(ENDPOINT, {
      value: state.heading,
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

    sample(STATE);
  });
