import './vendor/compass.min';

import box from './lib/box';
import compass, { applicator } from './lib/compass';

const STATE = {
  heading: null,
};

const heading = document.getElementById('heading');
const traditional = document.getElementById('traditional');

const COMPASS = compass(document);

const print = (x, el) =>
  (el || heading).innerHTML = x;

const notify = ({ el, near }) => heading => {
  el.style.opacity = near(heading);
};

const update = heading => {
  STATE.heading = heading;

  const point = box(heading);

  STATE.point = point;

  const {
    abbreviation,
    traditional_wind_point,
  } = point;

  print(`
    ${abbreviation}<br>
    ${parseFloat(heading).toFixed(1)}°
  `);

  print(
    traditional_wind_point,
    traditional
  );

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
    print('Not supported'))

  .needGPS(() =>
    print('Needs GPS signal'))

  .needMove(() =>
    print('Move forward'))

  .init(init);

debug();
