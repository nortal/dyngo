var assignTranslations = function (structure, translations) {
  angular.forEach(structure.components, function (parent) {
      parent.translations = translations;
      console.log(parent.id, parent.components);
      if (!_.isUndefined(parent.components)) {
        assignTranslations(parent, translations);
      }
    }
  );
};

angular.module('dyngo.core', ['checklist-model', 'mgcrea.ngStrap.popover', 'ngSanitize', 'ngMessages'])

  .provider('dyngo', function () {
    var instance = {forms: {}};

    instance.registerForm = function (name, structure, options) {
      var form = {name: name, structure: structure, options: options};
      instance.forms.name = form;
    };

    instance.getForm = function (name) {
      return instance.forms.name;
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
        lang: "@dgLang",
        data: '=ngModel'
      },
      template: '<div dg-container="form.structure" ng-model="data"></div>',
      link: function (scope, element, attrs) {
        scope.form = dyngo.getForm(scope.formName);
        if (_.isUndefined(scope.form)) {
          return;
        }
        var structure = scope.form.structure;
        this.assignTranslations(structure, structure.translations[scope.lang]);
      }
    };
  })

  .controller('ContainerController', function ($scope) {
    $scope.visible = function (component) {
      var visible = true;
      if (!_.isUndefined(component.parent)) {
        visible = $scope.visible(component.parent);
      }

      var visibilityExpression = component.constraints ? component.constraints.visible : undefined;
      if (visible && !_.isUndefined(visibilityExpression)) {
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
      template: '<div class="fb-form-object" ng-repeat="component in container.components" dg-component="component" ng-model="data" ng-if="visible(component)"></div>',
      controller: 'ContainerController',
      link: function (scope, element, attrs) {
        scope.formModel = scope.$parent.formModel;
        //scope.formModel = scope.$parent.$parent[scope.formName];
      }
    };
  })

  .controller('ComponentCtrl', function ($scope) {
    $scope.visible = function () {
      return true;
    };
  })

  .directive('dgComponent', function ($compile, $parse, componentProvider, $functions) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs) {
        scope.formName = scope.$parent.formName;
        scope.formModel = scope.$parent.formModel;
        scope.component = $parse(attrs.dgComponent)(scope);
        var component = scope.component;
        scope.$component = componentProvider.components[component.type];
        if (_.isUndefined(scope.$component)) {
          console.error('Unknown component type:', component.type);
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

        var evaluateConstraint = function (scope, name) {
          if (!_.isUndefined(scope.constraints) && !_.isUndefined(scope.constraints[name])) {
            var evaluated = scope.$eval(scope.constraints[name], scope.data);
            evaluated = _.isUndefined(evaluated) ? scope.constraints[name] : evaluated;
            return evaluated;
          }
          return null;
        };

        scope.min = function () {
          return evaluateConstraint(scope, 'min');
        };

        scope.max = function () {
          return evaluateConstraint(scope, 'max');
        };

        scope.components = component.components;

        if (!_.isUndefined(component.functions)) {
          scope.$watch('data', function () {
            $functions.executeFunctions(scope, scope.component, scope.data);
          }, true);
        }

        scope.setData = function (value) {
          if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value)) {
            scope.data[scope.id] = undefined;
          } else if (!_.isEqual(scope.data[scope.id], value)) {
            scope.data[scope.id] = value;
          }
        };

        scope.localize = function (key) {
          var translations = scope.component.translations;
          var localizedValue;
          if (!_.isUndefined(translations)) {
            localizedValue = translations[key];
          }
          return _.isUndefined(localizedValue) ? key : localizedValue.replace(/{{([^}]*)}}/, function (match, group) {
            return scope.$eval(group);
          });
        };

      },
      scope: {
        data: '=ngModel',
        component: '=dgComponent'
      },
      controller: 'ComponentCtrl'
    };
  })

  .provider('$functions', function () {
    var instance = {functions: []};

    instance.registerFunction = function (name, func) {
      instance.functions.push(name);
      instance[name] = func;
    };

    instance.get = function (name) {
      return instance[name] || _.noop;
    };

    instance.executeFunctions = function (scope, component, data) {
      angular.forEach(instance.functions, function (funcName) {
        if (_.isUndefined(scope[funcName])) {
          scope[funcName] = instance[funcName];
        }
      });
      angular.forEach(component.functions, function (f) {
        scope.$eval(f, data);
      });
    };

    // Default functions
    var round = function (value, precision) {
      var p = Math.pow(10, precision || 2);
      return Math.round(value * p) / p;
    };
    return {
      $get: function init() {
        instance.registerFunction('round', round);
        return instance;
      }
    };
  });
