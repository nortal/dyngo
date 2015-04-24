angular.module('dyngo.form', [])

  .provider('dyngo', function () {
    var instance = {forms: {}};

    instance.registerForm = function (name, structure, options) {
      instance.forms[name] = {name: name, structure: structure, options: options};
    };

    instance.getForm = function (name) {
      return instance.forms[name];
    };

    return {
      $get: function () {
        return instance;
      }
    };
  })

  .directive('dgForm', function (dyngo) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        formName: '@dgForm',
        formModel: '=dgForm',
        lang: '@dgLang',
        data: '=ngModel'
      },
      template: '<div dg-container="form.structure" ng-model="data"></div>',
      link: function (scope) {
        scope.form = dyngo.getForm(scope.formName);
        if (angular.isUndefined(scope.form) || angular.isUndefined(scope.form.structure)) {
          return;
        }
        var structure = scope.form.structure;

        var assignTranslations = function (structure, translations) {
          angular.forEach(structure.components, function (component) {
              component.translations = translations;
              if (angular.isDefined(component.components)) {
                assignTranslations(component, translations);
              }
            }
          );
        };

        if (angular.isDefined(structure.translations)) {
          assignTranslations(structure, structure.translations[scope.lang]);
        }
      }
    };
  });
