import './vendor/compass.min';
import post from './lib/post';

const print = console.warn.bind(console);

const STATE = {};
const RATE = 1000;

const sample = () => {
  setInterval(() => {
    if (!STATE.heading) return;
    // post('http://myjson.com/api/bins', STATE);
  }, RATE);
};

export default (() => {
  Compass
    .noSupport(() =>
      print('Your device is unsupported'))

    .needGPS(() =>
      print('A GPS signal is needed'))

    .needMove(() =>
      print('Please move forward'))

    .init(() => {
      Compass.watch(heading =>
        STATE.heading = heading
      );

      sample();
    });
})();
