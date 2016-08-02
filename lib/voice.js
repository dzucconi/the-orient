import R from 'ramda';
import data from './data';

export default R.reduce(
  (memo, { compass_point }) => {
    memo[compass_point] = new Audio(`mp3/${compass_point}.mp3`);
    return memo;
  },
{}, data);
