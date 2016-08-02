import scale from '../../lib/scale';

const targetScale = scale(0.0, 1.0);

describe('scale', () => {
  it('returns a function to transform a number into a point on a target scale', () => {
    const newScale = targetScale(270.0, 360.0);

    newScale(270).should.equal(0.0);
    newScale(300).should.equal(0.3333333333333333);
    newScale(315).should.equal(0.5);
    newScale(360).should.equal(1.0);
  });

  it('does the same for inverted ranges', () => {
    const newScale = targetScale(90.0, 0.0);

    newScale(90).should.equal(0.0);
    newScale(45).should.equal(0.5);
    newScale(0).should.equal(1.0);
  });

  it('handles numbers that are out of range bounds', () => {
    const newScale = targetScale(10.0, 20.0);

    newScale(15.0).should.equal(0.5);
    newScale(0).should.equal(-1.0);
    newScale(99).should.equal(8.9);
  });
});
