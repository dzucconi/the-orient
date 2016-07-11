import './vendor/compass.min';
import box from './lib/box';

const stage = document.getElementById('stage');

const print = x =>
  stage.innerHTML = x;

const display = heading => {
  const { abbreviation } = box(heading);
  print(`
    ${abbreviation}<br>
    ${heading}°
  `);
};

const init = () => {
  Compass.watch(display);
};

const debug = () => {
  const compass = document.getElementById('debug');

  if (!compass) return;

  compass.addEventListener('input', e => {
    display(e.target.value);
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
