import './vendor/compass.min';

import box from './lib/box';
import compass, { applicator } from './lib/compass';
import voice from './lib/voice';

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

  document.body.addEventListener('click', () => {
    if (STATE.representation >= STATE.representations.length - 1) {
      STATE.representation = 0;
    } else {
      STATE.representation = (STATE.representation || 0) + 1;
    }
  });

  setInterval(() => {
    if (STATE.point) {
      voice[STATE.point.compass_point]
        .play();
    }
  }, 2500);
};

const debug = () => {
  const range = document.getElementById('debug');

  if (!range) return;

  range.addEventListener('click', e =>
    e.stopPropagation()
  );

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
