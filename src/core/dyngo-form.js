angular.module('dyngo.form', ['dyngo.translator'])

  .provider('dyngo', function () {
    var instance = {forms: {}};
    var self = this;

    instance.registerForm = function (name, structure, options) {
      if (angular.isDefined(name) && angular.isDefined(structure)) {
        instance.forms[name] = {name: name, structure: structure, options: options};
        self.dgTranslator.registerDictionary(name, structure.translations);
      }
    };

    instance.getForm = function (name) {
      return instance.forms[name];
    };

    return {
      $get: function (dgTranslator) {
        self.dgTranslator = dgTranslator;
        return instance;
      }
    };
  })

  .controller('FormCtrl', function ($scope, dyngo, $log) {
    $scope.form = dyngo.getForm($scope.formName);
    if (angular.isUndefined($scope.form)) {
      $log.error('Form "' + $scope.formName + '" is not registered.');
    }
  })

  .directive('dgForm', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        formName: '@dgForm',
        formModel: '=dgForm',
        lang: '@dgLang',
        data: '=ngModel'
      },
      controller: 'FormCtrl',
      template: '<div dg-container="form.structure" ng-model="data" ng-if="form"></div>'
    };
  });
