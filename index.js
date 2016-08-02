import './vendor/compass.min';

import box from './lib/box';
import compass, { applicator } from './lib/compass';

const STATE = {};
const COMPASS = compass(document);

const display = document.getElementById('display');

const print = (x, el) =>
  (el || display).innerHTML = x;

const notify = ({ el, near }) => heading =>
  el.style.opacity = near(heading);

const update = heading => {
  const point = box(heading);

  STATE.heading = heading;
  STATE.point = point;

  print(`
    ${point.abbreviation}<br>
    ${parseFloat(heading).toFixed(1)}°<br>
    ${point.traditional_wind_point}
  `);

  COMPASS
    .map(notify)
    .map(applicator(heading));
};

const init = () => {
  Compass.watch(update);

  setInterval(() => {
    if (STATE.point) {
      new Audio(`mp3/${STATE.point.compass_point}.mp3`)
        .play();
    }
  }, 2500);
};

const debug = () => {
  const range = document.getElementById('debug');

  if (!range) return;

  range.addEventListener('input', e =>
    update(e.target.value)
  );
};

Compass
  .noSupport(() =>
    print('Your device is unsupported'))

  .needGPS(() =>
    print('A GPS signal is needed'))

  .needMove(() =>
    print('Please move forward'))

  .init(init);

debug();
