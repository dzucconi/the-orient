import './vendor/compass.min';

const print = x =>
  document.body.innerHTML = x;

Compass.noSupport(() => {
  print('Not supported');
});

Compass
  .needGPS(() => {
    print('we need GPS signal');
  }).needMove(() => {
    print('user must go forward');
  }).init(() => {

    Compass.watch(heading => {
      print(heading);
    });

  });
