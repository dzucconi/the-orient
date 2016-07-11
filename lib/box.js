import R from 'ramda';
import data from './data';

export default heading => {
  const between = R.find(({ minimum, maximum }) =>
    heading >= minimum && heading <= maximum);

  const lte = R.find(({ minimum }) =>
    heading >= minimum);

  const gte = R.find(({ maximum }) =>
    heading <= maximum);

  return between(data) || lte(data) || gte(data);
};
