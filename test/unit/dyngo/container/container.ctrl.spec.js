describe('ContainerCtrl:', function () {
  var $scope, $controller, component;

  beforeEach(module('dyngo.container'));

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope;
    $controller = _$controller_;
    $scope.data = {};
    $controller('ContainerCtrl', {$scope: $scope});
    component = {};
  }));

  it('isVisible() should return true when constraints are not defined', function () {
    expect($scope.visible(component)).to.equal(true);
    component.constraints = {};
    expect($scope.visible(component)).to.equal(true);
  });

  it('isVisible() should evaluate expression and return true', function () {
    component.constraints = {visible: 'true'};
    expect($scope.visible(component)).to.equal(true);

    component.constraints = {visible: '1 > 0'};
    expect($scope.visible(component)).to.equal(true);

    $scope.data['foo'] = 7;
    component.constraints = {visible: 'foo + 3 === 10'};
    expect($scope.visible(component)).to.equal(true);

    $scope.data = {
      'radio1': 'option_2',
      'checkbox1': [
        'option_1'
      ]
    };
    component.constraints = {visible: "radio1 == 'option_2' && checkbox1 == 'option_1'"};
    expect($scope.visible(component)).to.equal(true);
  });

  it('isVisible() should return true and keep the data of subtree', function () {
    component.id = 'foo';
    component.components = [{id: 'bar'}, {id: 'baz', components: [{id: 'qux'}]}];
    $scope.data.foo = 'Foo';
    $scope.data.moo = 'Moo';
    $scope.data.bar = 'Bar';
    $scope.data.baz = 'Baz';
    $scope.data.qux = 'Qux';
    var originalData = {};
    angular.copy($scope.data, originalData);

    expect($scope.visible(component)).to.equal(true);
    expect(originalData).to.deep.equal($scope.data);
  });

  it('isVisible() should evaluate expression and return false', function () {
    component.constraints = {visible: 'false'};
    expect($scope.visible(component)).to.equal(false);

    component.constraints = {visible: '1 < 0'};
    expect($scope.visible(component)).to.equal(false);

    $scope.data['foo'] = 7;
    component.constraints = {visible: 'foo + 3 !== 10'};
    expect($scope.visible(component)).to.equal(false);
  });

  it('isVisible() should return false and remove the data of subtree', function () {
    component.id = 'foo';
    component.constraints = {visible: '"a".length === 0'};
    component.components = [{id: 'bar'}, {id: 'baz', components: [{id: 'qux'}]}];
    $scope.data.foo = 'Foo';
    $scope.data.moo = 'Moo';
    $scope.data.bar = 'Bar';
    $scope.data.baz = 'Baz';
    $scope.data.qux = 'Qux';

    expect($scope.visible(component)).to.equal(false);
    expect($scope.data.foo).to.be.undefined;
    expect($scope.data.bar).to.be.undefined;
    expect($scope.data.baz).to.be.undefined;
    expect($scope.data.qux).to.be.undefined;
    expect($scope.data.moo).to.equal('Moo');
    expect(Object.keys($scope.data).length).to.equal(1);
  });


});
