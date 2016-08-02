import box from '../../lib/box';

describe('box', () => {
  it('accepts a heading Float and returns the appropriate heading data (100.0)', () => {
    box(100.0).compass_point
      .should.equal('East by south');
  });

  it('accepts a heading Float and returns the appropriate heading data (354.38)', () => {
    box(0.00).compass_point
      .should.equal('North');
  });

  it('accepts a heading Float and returns the appropriate heading data (354.37)', () => {
    box(354.37).compass_point
      .should.equal('North by west');
  });
});
