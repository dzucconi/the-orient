import { needle } from '../../lib/compass';

describe('needle', () => {
  it('scores full cardinal points', () => {
    needle.north(0.0).should.equal(1);
    needle.east(0.0).should.equal(0);
    needle.south(0.0).should.equal(-1);
  });

  it('scores fractional cardinal points', () => {
    needle.north(45).should.equal(0.5);
    needle.east(45).should.equal(0.5);
    needle.south(45).should.equal(-0.5);
  });
});
