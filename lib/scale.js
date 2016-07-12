export default (toMin, toMax) => (fromMin, fromMax) => n =>
  ((toMax - toMin) * (n - fromMin)) / (fromMax - fromMin) + toMin;
