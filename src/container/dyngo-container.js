angular.module('dyngo.container', [])

  .controller('ContainerCtrl', function ($scope) {
    $scope.visible = function (component) {
      var visible = true;

      var visibilityExpression = component.constraints ? component.constraints.visible : undefined;
      if (visible && angular.isDefined(visibilityExpression)) {
        visible = $scope.$eval(visibilityExpression, $scope.data);
      }
      if (!visible) {
        unsetData(component);
      }
      return visible;
    };

    var unsetData = function (component) {
      delete $scope.data[component.id];
      angular.forEach(component.components, function (child) {
        unsetData(child);
      });
    };

  })

  .directive('dgContainer', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        container: '=dgContainer',
        data: '=ngModel'
      },
      template: '<div ng-repeat="component in container.components" dg-component="component" ng-model="data" ng-if="visible(component)"></div>',
      controller: 'ContainerCtrl',
      link: function (scope) {
        scope.formModel = scope.$parent.formModel;
        scope.formName = scope.$parent.formName;
        scope.lang = scope.$parent.lang;
      }
    };
  });
