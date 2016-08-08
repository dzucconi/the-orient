export default (n, limit) => {
  if (n >= limit) {
    n = 0;
  } else {
    n = (n || 0) + 1;
  }

  return n;
};
