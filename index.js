import './vendor/compass.min';
import './listener';

import box from './lib/box';
import compass, { applicator } from './lib/compass';
import VOICE, { preload } from './lib/voice';

const STATE = {};
const COMPASS = compass(document);

const display = document.getElementById('display');

const print = (x, el) =>
  (el || display).innerHTML = x;

const notify = ({ el, near }) => heading =>
  el.style.opacity = near(heading);

const update = heading => {
  const point = box(heading);

  STATE.point = point;
  STATE.heading = heading;

  STATE.representations = [
    '',
    point.abbreviation,
    `${parseFloat(heading).toFixed(1)}°`,
    point.traditional_wind_point,
  ];

  print(STATE.representations[STATE.representation || 0]);

  COMPASS
    .map(notify)
    .map(applicator(heading));
};

const init = () => {
  Compass.watch(update);

  const increment = () => {
    if (!STATE.representations.length) return;

    if (STATE.representation >= STATE.representations.length - 1) {
      STATE.representation = 0;
    } else {
      STATE.representation = (STATE.representation || 0) + 1;
    }

    update(STATE.heading);
  };

  document.body.addEventListener('click', increment);
  document.body.addEventListener('touchstart', increment);

  preload();

  setInterval(() => {
    if (STATE.point) {
      VOICE[STATE.point.compass_point].play();
    }
  }, 2500);
};

const debug = () => {
  const range = document.getElementById('debug');

  if (!range) return;

  const stopPropagation = e => e.stopPropagation();
  range.addEventListener('click', stopPropagation);
  range.addEventListener('touchstart', stopPropagation);
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
