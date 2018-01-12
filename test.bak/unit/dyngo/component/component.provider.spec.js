describe('dyngo component provider', function () {
  var dgComponentProvider;

  beforeEach(module('dyngo.component.provider'));

  beforeEach(inject(function (_dgComponentProvider_) {
    dgComponentProvider = _dgComponentProvider_;
  }));

  it('should be empty after init', function () {
    expect(Object.keys(dgComponentProvider.components).length).to.equal(0);
  });

  it('should register component', function () {
    expect(dgComponentProvider.components['sampleComponent']).to.be.undefined;
    var component = {foo: 'bar'};
    dgComponentProvider.registerComponent('sampleComponent', component);

    expect(dgComponentProvider.components['sampleComponent']).to.equal(component);
  });

  it('should not register component without type', function () {
    expect(Object.keys(dgComponentProvider.components).length).to.equal(0);
    var component = {foo: 'bar'};
    dgComponentProvider.registerComponent(undefined, component);

    expect(Object.keys(dgComponentProvider.components).length).to.equal(0);
  });

  it('should not register undefined component', function () {
    expect(Object.keys(dgComponentProvider.components).length).to.equal(0);
    dgComponentProvider.registerComponent('sampleComponent');

    expect(Object.keys(dgComponentProvider.components).length).to.equal(0);
  });


  it('should not override registered component', function () {
    expect(dgComponentProvider.components['sampleComponent']).to.be.undefined;

    var originalComponent = {foo: 'bar'};
    dgComponentProvider.registerComponent('sampleComponent', originalComponent);
    expect(dgComponentProvider.components['sampleComponent']).to.equal(originalComponent);

    var anotherComponent = {foo: 'baz'};
    dgComponentProvider.registerComponent('sampleComponent', anotherComponent);
    expect(dgComponentProvider.components['sampleComponent']).to.equal(originalComponent);
  });

});

