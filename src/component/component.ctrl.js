angular.module('dyngo.component', ['dyngo.translator', 'dyngo.component.provider', 'dyngo.component.templates',
  'checklist-model', 'mgcrea.ngStrap.popover', 'ngSanitize', 'ngMessages'])

  .controller('ComponentCtrl', function ($scope, dgTranslator) {
    $scope.evaluateConstraint = function (name) {
      if (angular.isUndefined($scope.constraints) || angular.isUndefined($scope.constraints[name])) {
        return null;
      }
      var constraintExpression = $scope.constraints[name];
      if (typeof constraintExpression === 'string') {
        return $scope.$eval(constraintExpression, $scope.data);
      } else if (typeof constraintExpression === 'number') {
        return constraintExpression;
      } else if (typeof constraintExpression === 'boolean') {
        return constraintExpression;
      }
      return null;
    };

    $scope.min = function () {
      return $scope.evaluateConstraint('min');
    };

    $scope.max = function () {
      return $scope.evaluateConstraint('max');
    };

    $scope.setData = function (value) {
      if (angular.isUndefined(value) || value === null || (angular.isNumber(value) && isNaN(value))) {
        $scope.data[$scope.id] = undefined;
      } else if (!angular.equals($scope.data[$scope.id], value)) {
        $scope.data[$scope.id] = value;
      }
    };

    $scope.localize = function (key) {
      if (angular.isUndefined(key)) {
        return undefined;
      }
      var translatedValue = dgTranslator.translate($scope.formName, key, $scope.lang);
      return translatedValue.replace(/{{([^}]*)}}/g, function (match, group) {
        return $scope.$eval(group, $scope.data);
      });
    };

  });
