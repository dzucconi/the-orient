import scale from './scale';

const scalar = scale(0.0, 1.0);

export const applicator = x => fn => fn(x);

export const near = (choose, [left, right]) =>
  heading => choose(left(heading), right(heading));

export const needle = {
  north: near(Math.max, [
    scalar(270.0, 360.0),
    scalar(90.0, 0.0),
  ]),
  east: near(Math.min, [
    scalar(0.0, 90.0),
    scalar(180.0, 90.0),
  ]),
  south: near(Math.min, [
    scalar(90.0, 180.0),
    scalar(270.0, 180.0),
  ]),
  west: near(Math.min, [
    scalar(180.0, 270.0),
    scalar(360.0, 270.0),
  ]),
};

export default doc => [
  {
    id: 'north',
    el: doc.getElementById('north'),
    near: needle.north,
  },
  {
    id: 'east',
    el: doc.getElementById('east'),
    near: needle.east,
  },
  {
    id: 'south',
    el: doc.getElementById('south'),
    near: needle.south,
  },
  {
    id: 'west',
    el: doc.getElementById('west'),
    near: needle.west,
  },
];
