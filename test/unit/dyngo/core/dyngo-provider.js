describe('dyngo form provider', function () {
  var dyngo;

  beforeEach(module('dyngo.core'));

  beforeEach(inject(function (_dyngo_) {
    dyngo = _dyngo_;
  }));

  it('should be empty after init', function () {
    expect(Object.keys(dyngo.forms).length).to.equal(0);
  });

  it('should register form', function () {
    expect(dyngo.forms['sampleForm']).to.be.undefined;
    var form = {"components": [], "translations": {}};
    dyngo.registerForm('sampleForm', form);

    expect(dyngo.forms['sampleForm']).not.to.be.undefined;
  });

  it('should return registered form', function () {
    expect(dyngo.forms['sampleForm']).to.be.undefined;
    var form = {"components": [], "translations": {}};
    var options = {};
    dyngo.registerForm('sampleForm', form, options);

    var returnedForm = dyngo.getForm('sampleForm');
    expect(returnedForm).not.to.be.undefined;
    expect(returnedForm.name).not.to.be.undefined;
    expect(returnedForm.options).not.to.be.undefined;
    expect(returnedForm.structure).to.equal(form);
  });

});

