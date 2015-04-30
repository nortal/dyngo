describe('functions provider', function () {
  var $scope, $functions;

  beforeEach(module('dyngo.functions'));

  beforeEach(inject(function ($rootScope, _$functions_) {
    $scope = $rootScope;
    $functions = _$functions_;
  }));

  it('should register function', function () {
    expect($functions['sampleFunction']).to.be.undefined;
    $functions.registerFunction('sampleFunction', angular.noop);
    expect($functions['sampleFunction']).not.to.be.undefined;
  });

  it('should return registered function', function () {
    expect($functions['sampleFunction']).to.be.undefined;
    var func = angular.noop;
    $functions.registerFunction('sampleFunction', func);
    expect($functions['sampleFunction']).to.equal(func);
  });

  it('should return noop function', function () {
    expect($functions['sampleFunction']).to.be.undefined;
    expect($functions.get('sampleFunction')).to.equal(angular.noop);
  });

  var functionA = function () {
    return 'A';
  };

  var functionB = function (data) {
    data.b = 'B';
  };

  var functionC = angular.noop;

  it('should attach functions to scope', function () {
    $functions.registerFunction('a', functionA);
    $functions.registerFunction('b', functionB);
    $functions.registerFunction('c', functionC);
    var component = {functions: []};
    var data = {};
    $functions.executeFunctions($scope, component, data);
    expect($scope.a).to.equal(functionA);
    expect($scope.b).to.equal(functionB);
    expect($scope.c).to.equal(functionC);
  });

  it('should not execute any function on scope and component', function () {
    $functions.registerFunction('a', functionA);
    $functions.registerFunction('b', functionB);
    var component = {functions: []};
    var data = {};
    $functions.executeFunctions($scope, component, data);
    expect(Object.keys(data).length).to.equal(0);
  });

  it('should execute function A on scope and component', function () {
    $functions.registerFunction('a', functionA);
    $functions.registerFunction('b', functionB);
    var component = {functions: ['obj.a = a()']};
    var data = {obj: {}};
    $functions.executeFunctions($scope, component, data);
    expect(Object.keys(data.obj).length).to.equal(1);
    expect(data.obj.a).to.equal('A');
    expect(data.obj.b).to.be.undefined;
  });

  it('should execute functions A and B on scope and component', function () {
    $functions.registerFunction('a', functionA);
    $functions.registerFunction('b', functionB);
    var component = {functions: ['obj.a = a()', 'b(obj)']};
    var data = {obj: {}};
    $functions.executeFunctions($scope, component, data);
    expect(Object.keys(data.obj).length).to.equal(2);
    expect(data.obj.a).to.equal('A');
    expect(data.obj.b).to.equal('B');
  });

  it('should execute inline function', function () {
    var component = {functions: ['obj.a = 8 + 7']};
    var data = {obj: {}};
    $functions.executeFunctions($scope, component, data);
    expect(Object.keys(data.obj).length).to.equal(1);
    expect(data.obj.a).to.equal(15);
  });

});

