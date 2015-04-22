/*   Copyright 2015 Nortal AS
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
angular.module('dyngo', ['dyngo.core', 'dyngo.components']);

/*   Copyright 2015 Nortal AS
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
angular.module('dyngo.components.default', ['dyngo.components.provider'])
  .run(["componentProvider", function (componentProvider) {
    componentProvider.registerComponent('textInput', {
      group: 'Default',
      label: 'Text Input',
      templateUrl: 'templates/text.html'
    });
    componentProvider.registerComponent('numberInput', {
      group: 'Default',
      label: 'Text Input',
      templateUrl: 'templates/number.html'
    });
    componentProvider.registerComponent('checkbox', {
      group: 'Default',
      label: 'Checkbox',
      templateUrl: 'templates/checkbox.html'
    });
    componentProvider.registerComponent('radio', {
      group: 'Default',
      label: 'Radio',
      templateUrl: 'templates/radio.html'
    });
    componentProvider.registerComponent('select', {
      group: 'Default',
      label: 'Select',
      templateUrl: 'templates/select.html'
    });
    componentProvider.registerComponent('header', {
      group: 'static-controls',
      templateUrl: 'templates/header.html'
    });
    componentProvider.registerComponent('panel', {
      group: 'containers',
      templateUrl: 'templates/panel.html'
    });
    componentProvider.registerComponent('staticText', {
      group: 'static-controls',
      templateUrl: 'templates/static-text.html'
    });
    componentProvider.registerComponent('hidden', {
      group: 'Default',
      templateUrl: 'templates/hidden.html'
    });
  }]);

/*   Copyright 2015 Nortal AS
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
angular.module('dyngo.components.provider', [])
  .provider('componentProvider', function () {
    this.components = {};
    var _$http;
    var _$templateCache;

    var loadTemplate = function (component, $http, $templateCache) {
      if (component.template == null) {
        $http.get(component.templateUrl, {
          cache: $templateCache
        }).success(function (template) {
          component.template = template;
        });
      }
    };
    this.registerComponent = function (name, component) {
      if (component == null) {
        component = {};
      }
      if (this.components[name] == null) {
        this.components[name] = component;
        loadTemplate(component, _$http, _$templateCache);
      }
    };
    this.$get = ["$http", "$templateCache", function ($http, $templateCache) {
      _$http = $http;
      _$templateCache = $templateCache;
      angular.forEach(this.components, function (component) {
        loadTemplate(component, $http, $templateCache);
      });
      return {
        components: this.components,
        registerComponent: this.registerComponent
      };
    }];
  });

/*   Copyright 2015 Nortal AS
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
angular.module('dyngo.components', ['dyngo.components.provider', 'dyngo.components.default']);

var assignTranslations = function (structure, translations) {
  angular.forEach(structure.components, function (parent) {
      parent.translations = translations;
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

  .directive('dgForm', ["dyngo", function (dyngo) {
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
      link: function (scope, element, attrs) {
        scope.form = dyngo.getForm(scope.formName);
        if (_.isUndefined(scope.form)) {
          return;
        }
        var structure = scope.form.structure;
        this.assignTranslations(structure, structure.translations[scope.lang]);
      }
    };
  }])

  .controller('ContainerController', ["$scope", function ($scope) {
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

  }])

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

  .controller('ComponentCtrl', ["$scope", function ($scope) {
    $scope.visible = function () {
      return true;
    };
  }])

  .directive('dgComponent', ["$compile", "$parse", "componentProvider", "$functions", "$log", function ($compile, $parse, componentProvider, $functions, $log) {
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
  }])

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
