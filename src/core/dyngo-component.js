angular.module('dyngo.component', ['checklist-model', 'mgcrea.ngStrap.popover', 'ngSanitize', 'ngMessages', 'dyngo.translator'])

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
      if (angular.isUndefined(value) || _.isNull(value) || _.isNaN(value)) {
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

  })

  .directive('dgComponent', function ($compile, $parse, componentProvider, $functions, $log, $http, $templateCache) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        data: '=ngModel',
        component: '=dgComponent'
      },
      controller: 'ComponentCtrl',
      link: function (scope, element, attrs) {
        var component = scope.component = $parse(attrs.dgComponent)(scope);
        scope.$component = componentProvider.components[component.type];
        if (_.isUndefined(scope.$component)) {
          var unknownTypeTemplate = '<div class="alert alert-warning" role="alert">Unknown component type: <strong>{{component.type}}</strong></div>';
          $log.error('Unknown component type:', component.type);
          element.append($compile(unknownTypeTemplate)(scope));
          return;
        }

        function initScopeValues() {
          scope.formName = scope.$parent.formName;
          scope.formModel = scope.$parent.formModel;
          scope.lang = scope.$parent.lang;
          scope.id = component.id;
          scope.label = scope.localize(component.label);
          scope.description = component.description;
          scope.placeholder = component.placeholder;
          scope.options = component.options || scope.$component.options || [];
          // TODO: replace with angular.merge after upgrade to angular 1.4+
          scope.constraints = angular.extend({}, scope.$component.constraints, component.constraints);
        }

        function attachComponentHtml() {
          var children = $compile(scope.$component.template)(scope);
          element.append(children);
        }

        initScopeValues();

        if (angular.isUndefined(scope.$component.template)) {
          $http.get(scope.$component.templateUrl, {
            cache: $templateCache
          }).success(function (template) {
            scope.$component.template = template;
            attachComponentHtml();
          });
        } else {
          attachComponentHtml();
        }


        if (angular.isDefined(component.functions)) {
          scope.$watch('data', function () {
            $functions.executeFunctions(scope, scope.component, scope.data);
          }, true);
        }

      }
    };
  });
