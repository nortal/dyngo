describe('round function', function () {
  var $functions;

  beforeEach(module('dyngo.functions'));

  beforeEach(inject(function (_$functions_) {
    $functions = _$functions_;
  }));

  it('should be defined in functions provider', function () {
    expect($functions['round']).not.to.be.undefined;
  });

  it('should return 7.153', function () {
    expect($functions['round'](7.152554, 3)).to.equal(7.153);
  });

  it('should return 7.15', function () {
    expect($functions['round'](7.152354, 2)).to.equal(7.15);
  });

  it('should return 7.2', function () {
    expect($functions['round'](7.152354, 1)).to.equal(7.2);
  });

  it('should return 7', function () {
    expect($functions['round'](7.152354, 0)).to.equal(7);
  });

  it('should use default precision and return 7.15', function () {
    expect($functions['round'](7.152354)).to.equal(7.15);
  });

});
