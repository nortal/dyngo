describe('function provider', function () {
  var $scope, dgFunctionProvider;

  beforeEach(module('dyngo.functions'));

  beforeEach(inject(function ($rootScope, _dgFunctionProvider_) {
    $scope = $rootScope;
    dgFunctionProvider = _dgFunctionProvider_;
  }));

  it('should register function', function () {
    expect(dgFunctionProvider['sampleFunction']).to.be.undefined;
    dgFunctionProvider.registerFunction('sampleFunction', angular.noop);
    expect(dgFunctionProvider['sampleFunction']).not.to.be.undefined;
  });

  it('should return registered function', function () {
    expect(dgFunctionProvider['sampleFunction']).to.be.undefined;
    var func = angular.noop;
    dgFunctionProvider.registerFunction('sampleFunction', func);
    expect(dgFunctionProvider['sampleFunction']).to.equal(func);
  });

  it('should return noop function', function () {
    expect(dgFunctionProvider['sampleFunction']).to.be.undefined;
    expect(dgFunctionProvider.get('sampleFunction')).to.equal(angular.noop);
  });

  var functionA = function () {
    return 'A';
  };

  var functionB = function (data) {
    data.b = 'B';
  };

  var functionC = angular.noop;

  it('should attach functions to scope', function () {
    dgFunctionProvider.registerFunction('a', functionA);
    dgFunctionProvider.registerFunction('b', functionB);
    dgFunctionProvider.registerFunction('c', functionC);
    var component = {functions: []};
    var data = {};
    dgFunctionProvider.executeFunctions($scope, component, data);
    expect($scope.a).to.equal(functionA);
    expect($scope.b).to.equal(functionB);
    expect($scope.c).to.equal(functionC);
  });

  it('should not execute any function on scope and component', function () {
    dgFunctionProvider.registerFunction('a', functionA);
    dgFunctionProvider.registerFunction('b', functionB);
    var component = {functions: []};
    var data = {};
    dgFunctionProvider.executeFunctions($scope, component, data);
    expect(Object.keys(data).length).to.equal(0);
  });

  it('should execute function A on scope and component', function () {
    dgFunctionProvider.registerFunction('a', functionA);
    dgFunctionProvider.registerFunction('b', functionB);
    var component = {functions: ['obj.a = a()']};
    var data = {obj: {}};
    dgFunctionProvider.executeFunctions($scope, component, data);
    expect(Object.keys(data.obj).length).to.equal(1);
    expect(data.obj.a).to.equal('A');
    expect(data.obj.b).to.be.undefined;
  });

  it('should execute functions A and B on scope and component', function () {
    dgFunctionProvider.registerFunction('a', functionA);
    dgFunctionProvider.registerFunction('b', functionB);
    var component = {functions: ['obj.a = a()', 'b(obj)']};
    var data = {obj: {}};
    dgFunctionProvider.executeFunctions($scope, component, data);
    expect(Object.keys(data.obj).length).to.equal(2);
    expect(data.obj.a).to.equal('A');
    expect(data.obj.b).to.equal('B');
  });

  it('should execute inline function', function () {
    var component = {functions: ['obj.a = 8 + 7']};
    var data = {obj: {}};
    dgFunctionProvider.executeFunctions($scope, component, data);
    expect(Object.keys(data.obj).length).to.equal(1);
    expect(data.obj.a).to.equal(15);
  });

});

