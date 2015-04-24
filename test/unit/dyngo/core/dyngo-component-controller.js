describe('ComponentCtrl:', function () {
  var $scope, $controller, component, componentCtrl;

  beforeEach(module('dyngo.core'));

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope;
    $controller = _$controller_;
    $scope.data = {};
    componentCtrl = $controller('ComponentCtrl', {$scope: $scope});
    component = {};
  }));

  it('evaluateConstraint() should return null when no constraints are not defined', function () {
    expect($scope.evaluateConstraint('foo')).to.be.null;
  });

  it('evaluateConstraint() should return null when given constraint is not defined', function () {
    component.constraints = {bar: 'true'};
    expect($scope.evaluateConstraint('foo')).to.be.null;
  });

  it('evaluateConstraint() should return evaluated value of expression', function () {
    $scope.constraints = {foo: 'true'};
    expect($scope.evaluateConstraint('foo')).to.equal(true);

    $scope.constraints = {foo: '12'};
    expect($scope.evaluateConstraint('foo')).to.equal(12);

    $scope.constraints = {foo: '(2 + 1) * 4'};
    expect($scope.evaluateConstraint('foo')).to.equal(12);

    $scope.data = {count: 10, char: 'z'};
    $scope.constraints = {foo: 'count * 2 + char'};
    expect($scope.evaluateConstraint('foo')).to.equal('20z');
  });

  it('evaluateConstraint() should return number value without evaluation', function () {
    $scope.constraints = {foo: 12};
    expect($scope.evaluateConstraint('foo')).to.equal(12);
  });

  it('evaluateConstraint() should return boolean value without evaluation', function () {
    $scope.constraints = {foo: true};
    expect($scope.evaluateConstraint('foo')).to.equal(true);
  });

  it('evaluateConstraint() should return null when value is neither string or number', function () {
    $scope.constraints = {foo: {}};
    expect($scope.evaluateConstraint('foo')).to.be.null;

    $scope.constraints = {foo: null};
    expect($scope.evaluateConstraint('foo')).to.be.null;

    $scope.constraints = {foo: []};
    expect($scope.evaluateConstraint('foo')).to.be.null;
  });

  it('setData() should set value to undefined', function () {
    $scope.data.foo = 'Foo';
    $scope.id = 'foo';
    $scope.setData(undefined);
    expect($scope.data.foo).to.be.undefined;

    $scope.data.foo = 'Foo';
    $scope.setData(NaN);
    expect($scope.data.foo).to.be.undefined;

    $scope.data.foo = 'Foo';
    $scope.setData(null);
    expect($scope.data.foo).to.be.undefined;
  });

  it('setData() should set value', function () {
    $scope.id = 'foo';
    $scope.setData('Foo');
    expect($scope.data.foo).to.equal('Foo');

    $scope.data.foo = undefined;
    $scope.setData(12);
    expect($scope.data.foo).to.equal(12);

    $scope.data.foo = undefined;
    $scope.setData(true);
    expect($scope.data.foo).to.equal(true);

    $scope.data.foo = undefined;
    $scope.setData({moo: 'goo'});
    expect($scope.data.foo).to.deep.equal({moo: 'goo'});

    $scope.data.foo = undefined;
    $scope.setData(['abc', 'def']);
    expect($scope.data.foo).to.deep.equal(['abc', 'def']);
  });

  it('setData() should do nothing if value object has not changed', function () {
    $scope.id = 'foo';
    var foo = {bar: 'baz', qux: {moo: true}};
    $scope.setData(foo);
    expect($scope.data.foo).to.equal(foo);
    $scope.setData(angular.copy(foo));
    expect($scope.data.foo).to.equal(foo);
  });

});
