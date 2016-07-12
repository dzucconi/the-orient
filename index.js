import './vendor/compass.min';

import box from './lib/box';
import scale from './lib/scale';

const STATE = {
  heading: null,
};

const scalar = scale(0.0, 1.0);

const heading = document.getElementById('heading');
const traditional = document.getElementById('traditional');

const compass = [
  {
    id: 'north',
    el: document.getElementById('north'),
    between: [
      scalar(270.0, 360.0),
      scalar(90.0, 0.0),
    ]
  },
  {
    id: 'east',
    el: document.getElementById('east'),
    between: [
      scalar(0.0, 90.0),
      scalar(180.0, 90.0),
    ]
  },
  {
    id: 'south',
    el: document.getElementById('south'),
    between: [
      scalar(270.0, 180.0),
      scalar(0.0, 180.0),
    ]
  },
  {
    id: 'west',
    el: document.getElementById('west'),
    between: [
      scalar(180.0, 270.0),
      scalar(360.0, 270.0),
    ]
  },
];

const print = (x, el) =>
  (el || heading).innerHTML = x;

const notify = ({ id, el, between }) => heading => {
  const send = id === 'north' ? 'max' : 'min';
  el.style.opacity = Math[send](between[0](heading), between[1](heading));
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
    ${heading}°
  `);

  print(
    traditional_wind_point,
    traditional
  );

  compass
    .map(notify)
    .map(fn => fn(heading));
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
  const compass = document.getElementById('debug');

  if (!compass) return;

  compass.addEventListener('input', e => {
    update(e.target.value);
  });
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
