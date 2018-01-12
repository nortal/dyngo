describe('round function', function () {
  var dgFunctionProvider;

  beforeEach(module('dyngo.functions'));

  beforeEach(inject(function (_dgFunctionProvider_) {
    dgFunctionProvider = _dgFunctionProvider_;
  }));

  it('should be defined in functions provider', function () {
    expect(dgFunctionProvider['round']).not.to.be.undefined;
  });

  it('should return 7.153', function () {
    expect(dgFunctionProvider['round'](7.152554, 3)).to.equal(7.153);
  });

  it('should return 7.15', function () {
    expect(dgFunctionProvider['round'](7.152354, 2)).to.equal(7.15);
  });

  it('should return 7.2', function () {
    expect(dgFunctionProvider['round'](7.152354, 1)).to.equal(7.2);
  });

  it('should return 7', function () {
    expect(dgFunctionProvider['round'](7.152354, 0)).to.equal(7);
  });

  it('should use default precision and return 7.15', function () {
    expect(dgFunctionProvider['round'](7.152354)).to.equal(7.15);
  });

});
