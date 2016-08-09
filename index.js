import './vendor/compass.min';

import box from './lib/box';
import compass, { applicator } from './lib/compass';
import VOICE, { preload } from './lib/voice';
import moveThrough from './lib/move_through';

(function() {
  const STATE = {};
  const COMPASS = compass(document);

  const display = document.getElementById('display');

  const render = (x, el) =>
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

    render(STATE.representations[STATE.representation || 0]);

    COMPASS
      .map(notify)
      .map(applicator(heading));
  };

  Compass
    .noSupport(() =>
      render('Your device is unsupported'))
    .needGPS(() =>
      render('A GPS signal is needed'))
    .needMove(() =>
      render('Please move forward'))
    .watch(update);

  const increment = () => {
    if (!STATE.representations.length) return;

    STATE.representation = moveThrough(
      STATE.representation,
      STATE.representations.length - 1
    );

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

  if (process.env.NODE_ENV === 'development') {
    const range = document.getElementById('debug');

    const stopPropagation = e => e.stopPropagation();
    range.addEventListener('click', stopPropagation);
    range.addEventListener('touchstart', stopPropagation);
    range.addEventListener('input', e =>
      update(e.target.value)
    );
  }
})();
