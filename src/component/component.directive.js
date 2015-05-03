angular.module('dyngo.component')

  .directive('dgComponent', function ($compile, $parse, componentProvider, dgFunctionProvider, $log, $http, $templateCache) {
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
        if (angular.isUndefined(scope.$component)) {
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
            dgFunctionProvider.executeFunctions(scope, scope.component, scope.data);
          }, true);
        }

      }
    };
  });
