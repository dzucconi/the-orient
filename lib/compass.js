import scale from './scale';

const scalar = scale(0.0, 1.0);

export const near = ({ id, between, heading }) => {
  console.log(id);
  return {
    north: Math.max(between[0](heading), between[1](heading)),
    but_north: Math.min(between[0](heading), between[1](heading)),
  };
};

export default doc => [
  {
    id: 'north',
    el: doc.getElementById('north'),
    between: [
      scalar(270.0, 360.0),
      scalar(90.0, 0.0),
    ]
  },
  {
    id: 'east',
    el: doc.getElementById('east'),
    between: [
      scalar(0.0, 90.0),
      scalar(180.0, 90.0),
    ]
  },
  {
    id: 'south',
    el: doc.getElementById('south'),
    between: [
      scalar(270.0, 180.0),
      scalar(0.0, 180.0),
    ]
  },
  {
    id: 'west',
    el: doc.getElementById('west'),
    between: [
      scalar(180.0, 270.0),
      scalar(360.0, 270.0),
    ]
  },
];
