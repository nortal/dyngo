describe('FormCtrl:', function () {
  var $scope, $controller, component;

  beforeEach(module('dyngo.form'));

  beforeEach(inject(function ($rootScope, _$controller_) {
    $scope = $rootScope;
    $controller = _$controller_;
    $scope.data = {};
    $controller('FormCtrl', {$scope: $scope});
    component = {};
  }));


});
