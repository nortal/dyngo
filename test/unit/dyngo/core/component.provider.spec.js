describe('dyngo component provider', function () {
  var componentProvider;

  beforeEach(module('dyngo.components.provider'));

  beforeEach(inject(function (_componentProvider_) {
    componentProvider = _componentProvider_;
  }));

  it('should be empty after init', function () {
    expect(Object.keys(componentProvider.components).length).to.equal(0);
  });

  it('should register component', function () {
    expect(componentProvider.components['sampleComponent']).to.be.undefined;
    var component = {foo: 'bar'};
    componentProvider.registerComponent('sampleComponent', component);

    expect(componentProvider.components['sampleComponent']).to.equal(component);
  });

  it('should not register component without type', function () {
    expect(Object.keys(componentProvider.components).length).to.equal(0);
    var component = {foo: 'bar'};
    componentProvider.registerComponent(undefined, component);

    expect(Object.keys(componentProvider.components).length).to.equal(0);
  });

  it('should not register undefined component', function () {
    expect(Object.keys(componentProvider.components).length).to.equal(0);
    componentProvider.registerComponent('sampleComponent');

    expect(Object.keys(componentProvider.components).length).to.equal(0);
  });


  it('should not override registered component', function () {
    expect(componentProvider.components['sampleComponent']).to.be.undefined;

    var originalComponent = {foo: 'bar'};
    componentProvider.registerComponent('sampleComponent', originalComponent);
    expect(componentProvider.components['sampleComponent']).to.equal(originalComponent);

    var anotherComponent = {foo: 'baz'};
    componentProvider.registerComponent('sampleComponent', anotherComponent);
    expect(componentProvider.components['sampleComponent']).to.equal(originalComponent);
  });

});

