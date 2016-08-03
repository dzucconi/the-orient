import R from 'ramda';
import data from './data';

const VOICE = {};

export const load = compass_point =>
  new Audio(`mp3/${compass_point}.mp3`);

export const preload = () => R.reduce(
  (memo, { compass_point }) => {
    memo[compass_point] = load(compass_point);
    return memo;
  },
VOICE, data);

export const lazyload = compass_point =>
  VOICE[compass_point] || (VOICE[compass_point] = load(compass_point));

export default VOICE;
