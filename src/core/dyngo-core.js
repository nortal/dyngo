angular.module('dyngo.core', ['checklist-model', 'mgcrea.ngStrap.popover', 'ngSanitize', 'ngMessages'])

  .controller('ComponentCtrl', function ($scope) {
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
      if (angular.isUndefined(value) || _.isNull(value) || _.isNaN(value)) {
        $scope.data[$scope.id] = undefined;
      } else if (!angular.equals($scope.data[$scope.id], value)) {
        $scope.data[$scope.id] = value;
      }
    };

    $scope.localize = function (key) {
      var translations = $scope.component.translations;
      var localizedValue;
      if (!_.isUndefined(translations)) {
        localizedValue = translations[key];
      }
      return _.isUndefined(localizedValue) ? key : localizedValue.replace(/{{([^}]*)}}/, function (match, group) {
        return $scope.$eval(group);
      });
    };

  })

  .directive('dgComponent', function ($compile, $parse, componentProvider, $functions, $log) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        data: '=ngModel',
        component: '=dgComponent'
      },
      controller: 'ComponentCtrl',
      link: function (scope, element, attrs) {
        scope.formName = scope.$parent.formName;
        scope.formModel = scope.$parent.formModel;
        //scope.component = $parse(attrs.dgComponent)(scope);
        var component = scope.component = $parse(attrs.dgComponent)(scope);
        scope.$component = componentProvider.components[component.type];
        if (_.isUndefined(scope.$component)) {
          $log.error('Unknown component type:', component.type);
          return;
        }

        var children = $compile(scope.$component.template)(scope);
        element.append(children);

        // shorthand values
        scope.id = component.id;
        scope.label = (component.translations && component.translations[component.label]) || component.label; // || scope.$component.label;
        scope.description = component.description;

        scope.placeholder = component.placeholder; // || scope.$component.placeholder;
        scope.options = component.options || scope.$component.options;
        scope.constraints = component.constraints || scope.$component.constraints;

        scope.components = component.components;

        if (!_.isUndefined(component.functions)) {
          scope.$watch('data', function () {
            $functions.executeFunctions(scope, scope.component, scope.data);
          }, true);
        }

      }
    };
  });
