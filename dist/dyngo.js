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
angular.module('dyngo', ['dyngo.form', 'dyngo.container', 'dyngo.component', 'dyngo.component.provider', 'dyngo.component.defaults', 'dyngo.functions', 'dyngo.translator']);

angular.module('dyngo.component', ['dyngo.translator', 'dyngo.component.provider', 'dyngo.component.templates',
  'checklist-model', 'mgcrea.ngStrap.popover', 'ngSanitize', 'ngMessages'])

  .controller('ComponentCtrl', ["$scope", "dgTranslator", function ($scope, dgTranslator) {
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
angular.module('dyngo.component.defaults', ['dyngo.component.provider'])
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

angular.module('dyngo.component')

  .directive('dgComponent', ["$compile", "$parse", "componentProvider", "$functions", "$log", "$http", "$templateCache", function ($compile, $parse, componentProvider, $functions, $log, $http, $templateCache) {
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
            $functions.executeFunctions(scope, scope.component, scope.data);
          }, true);
        }

      }
    };
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
angular.module('dyngo.component.provider', [])
  .provider('componentProvider', function () {
    this.components = {};

    this.registerComponent = function (type, component) {
      if (angular.isUndefined(component) || angular.isUndefined(type)) {
        return;
      }
      if (angular.isUndefined(this.components[type])) {
        this.components[type] = component;
      }
    };

    this.$get = function () {
      return {
        components: this.components,
        registerComponent: this.registerComponent
      };
    };
  });

angular.module('dyngo.container', [])

  .controller('ContainerCtrl', ["$scope", function ($scope) {
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

  }])

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
      $get: ["dgTranslator", function (dgTranslator) {
        self.dgTranslator = dgTranslator;
        return instance;
      }]
    };
  })

  .controller('FormCtrl', ["$scope", "dyngo", "$log", function ($scope, dyngo, $log) {
    $scope.form = dyngo.getForm($scope.formName);
    if (angular.isUndefined($scope.form)) {
      $log.error('Form "' + $scope.formName + '" is not registered.');
    }
  }])

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

angular.module('dyngo.functions', [])

  .provider('$functions', function () {
    var instance = {functions: []};

    instance.registerFunction = function (name, func) {
      instance.functions.push(name);
      instance[name] = func;
    };

    instance.get = function (name) {
      return instance[name] || angular.noop;
    };

    var attachFunctionsToScope = function (scope) {
      angular.forEach(instance.functions, function (funcName) {
        if (angular.isUndefined(scope[funcName])) {
          scope[funcName] = instance[funcName];
        }
      });
    };

    instance.executeFunctions = function (scope, component, data) {
      attachFunctionsToScope(scope);
      angular.forEach(component.functions, function (f) {
        scope.$eval(f, data);
      });
    };

    // Default functions
    var round = function (value, precision) {
      var p = Math.pow(10, angular.isDefined(precision) ? precision : 2);
      return Math.round(value * p) / p;
    };

    return {
      $get: function init() {
        instance.registerFunction('round', round);
        return instance;
      }
    };
  });


angular.module('dyngo.translator', [])

  .value('dgDictionary', {})

  .service('dgTranslator', ["dgDictionary", function (dgDictionary) {

    this.registerDictionary = function (formName, dictionary) {
      dgDictionary[formName] = dictionary || {};
    };

    this.translate = function (formName, key, lang) {
      var translatedValue;
      var dictionary = dgDictionary[formName];
      if (angular.isDefined(dictionary) && angular.isDefined(dictionary[lang])) {
        translatedValue = dictionary[lang][key];
      }
      if (angular.isUndefined(translatedValue)) {
        translatedValue = key;
      }
      return translatedValue;
    };

  }]);

(function(module) {
try {
  module = angular.module('dyngo.component.templates');
} catch (e) {
  module = angular.module('dyngo.component.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/checkbox.html',
    '<div class="form-group">\n' +
    '\n' +
    '  <label for="{{id+\'_\'+$index}}" class="col-sm-4 control-label"\n' +
    '         ng-class="{required : constraints.required}">{{label}}</label>\n' +
    '\n' +
    '  <div class="col-sm-4">\n' +
    '    <div class="checkbox" ng-repeat="option in options track by option.code">\n' +
    '      <label>\n' +
    '        <input type="checkbox" id="{{id+\'_\'+$index}}" name="{{id}}" checklist-model="data[id]"\n' +
    '               checklist-value="option.code" ng-value="option.code" ng-disabled="constraints.disabled"\n' +
    '               ng-required="constraints.required && (!data[id] || data[id].length == 0)">{{option.text}}\n' +
    '      </label>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-messages="formModel[id].$error" class="message-invalid"\n' +
    '         ng-if="formModel.submitPressed && constraints.required && (!data[id] || data[id].length == 0)">\n' +
    '      <div ng-message="required">{{localize("error.no_item_selected")}}</div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('dyngo.component.templates');
} catch (e) {
  module = angular.module('dyngo.component.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/header.html',
    '<div class="page-header">\n' +
    '  <h2>{{label}}</h2>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dyngo.component.templates');
} catch (e) {
  module = angular.module('dyngo.component.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/hidden.html',
    '<div class="form-group">\n' +
    '\n' +
    '  <div class="col-sm-4"></div>\n' +
    '\n' +
    '  <div class="col-sm-4">\n' +
    '    <input type="hidden" ng-model="data[id]">\n' +
    '  </div>\n' +
    '\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dyngo.component.templates');
} catch (e) {
  module = angular.module('dyngo.component.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/number.html',
    '<div class="form-group">\n' +
    '  <label for="{{id}}" class="col-sm-4 control-label"\n' +
    '         ng-class="{required : constraints.required}">{{label}}</label>\n' +
    '\n' +
    '  <div class="col-sm-4" ng-switch on="description !== undefined">\n' +
    '\n' +
    '    <div class="input-group" ng-switch-when="true">\n' +
    '\n' +
    '      <input type="number" id="{{id}}" name="{{id}}" ng-model="data[id]" class="form-control"\n' +
    '             placeholder="{{placeholder}}"\n' +
    '             min="{{min()}}" max="{{max()}}"\n' +
    '             ng-disabled="constraints.disabled" ng-required="constraints.required"/>\n' +
    '       <span class="input-group-btn">\n' +
    '         <button type="button" class="btn btn-default"\n' +
    '                 data-placement="right" title="{{description.title}}" data-content="{{description.content}}"\n' +
    '                 data-trigger="click" bs-popover>\n' +
    '           <span class="glyphicon glyphicon-question-sign"></span>\n' +
    '         </button>\n' +
    '      </span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-switch-default>\n' +
    '      <input type="number" id="{{id}}" name="{{id}}" ng-model="data[id]" class="form-control"\n' +
    '             placeholder="{{placeholder}}"\n' +
    '             min="{{min()}}" max="{{max()}}"\n' +
    '             ng-disabled="constraints.disabled" ng-required="constraints.required"/>\n' +
    '    </div>\n' +
    '    <div ng-messages="formModel[id].$error" class="message-invalid" ng-if="formModel.submitPressed">\n' +
    '      <div ng-message="required">{{localize("error.required_field")}}</div>\n' +
    '      <div ng-message="max">{{localize("error.value_is_gt_max")}}</div>\n' +
    '      <div ng-message="min">{{localize("error.value_is_lt_min")}}</div>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('dyngo.component.templates');
} catch (e) {
  module = angular.module('dyngo.component.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/panel.html',
    '<div class="panel panel-default">\n' +
    '  <div class="panel-heading" ng-if="label">\n' +
    '    <h3 class="panel-title">{{label}}</h3>\n' +
    '  </div>\n' +
    '  <div class="panel-body">\n' +
    '    <div dg-container="component" ng-model="data" dg-data="data"></div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('dyngo.component.templates');
} catch (e) {
  module = angular.module('dyngo.component.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/radio.html',
    '<div class="form-group">\n' +
    '\n' +
    '  <label class="col-sm-4 control-label"\n' +
    '         ng-class="{required : constraints.required}">{{label}}</label>\n' +
    '\n' +
    '  <div class="col-sm-4">\n' +
    '    <div class="radio" ng-repeat="option in options track by option.code">\n' +
    '      <label>\n' +
    '        <input type="radio" name="{{id}}" id="{{id+\'_\'+$index}}" ng-model="data[id]"\n' +
    '               ng-value="option.code"\n' +
    '               ng-disabled="constraints.disabled" ng-required="constraints.required">{{localize(option.text)}}\n' +
    '      </label>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-messages="formModel[id].$error" class="message-invalid" ng-if="formModel.submitPressed">\n' +
    '      <div ng-message="required">{{localize("error.no_item_selected")}}</div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('dyngo.component.templates');
} catch (e) {
  module = angular.module('dyngo.component.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/select.html',
    '<div class="form-group">\n' +
    '\n' +
    '  <label for="{{id}}" class="col-sm-4 control-label"\n' +
    '         ng-class="{required : constraints.required}">{{label}}</label>\n' +
    '\n' +
    '  <div class="col-sm-4" ng-switch on="description !== undefined">\n' +
    '\n' +
    '    <div class="input-group" ng-switch-when="true">\n' +
    '      <select id="{{id}}" name="{{id}}" class="form-control"\n' +
    '              ng-options="option.code as option.value for option in options"\n' +
    '              ng-model="data[id]" ng-disabled="constraints.disabled" ng-required="constraints.required">\n' +
    '        <option></option>\n' +
    '      </select>\n' +
    '       <span class="input-group-btn">\n' +
    '         <button type="button" class="btn btn-default"\n' +
    '                 data-placement="right" title="{{description.title}}" data-content="{{description.content}}"\n' +
    '                 data-trigger="click" bs-popover>\n' +
    '           <span class="glyphicon glyphicon-question-sign"></span>\n' +
    '         </button>\n' +
    '      </span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-switch-default>\n' +
    '      <div class="select">\n' +
    '        <select id="{{id}}" name="{{id}}" class="form-control"\n' +
    '                ng-options="option.code as option.value for option in options"\n' +
    '                ng-model="data[id]" ng-disabled="constraints.disabled" ng-required="constraints.required">\n' +
    '          <option></option>\n' +
    '        </select>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-messages="formModel[id].$error" class="message-invalid" ng-if="formModel.submitPressed">\n' +
    '      <div ng-message="required">{{localize("error.no_item_selected")}}</div>\n' +
    '    </div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('dyngo.component.templates');
} catch (e) {
  module = angular.module('dyngo.component.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/static-text.html',
    '<div class="form-group">\n' +
    '  <p ng-bind-html="label"></p>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('dyngo.component.templates');
} catch (e) {
  module = angular.module('dyngo.component.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('templates/text.html',
    '<div class="form-group">\n' +
    '  <label for="{{id}}" class="col-sm-4 control-label"\n' +
    '         ng-class="{required : constraints.required}">{{label}}</label>\n' +
    '\n' +
    '  <div class="col-sm-4" ng-switch on="description !== undefined">\n' +
    '\n' +
    '    <div class="input-group" ng-switch-when="true">\n' +
    '\n' +
    '      <input type="text" id="{{id}}" name="{{id}}" ng-model="data[id]" class="form-control"\n' +
    '             placeholder="{{placeholder}}"\n' +
    '             ng-minlength="constraints.min" ng-maxlength="constraints.max" ng-disabled="constraints.disabled"\n' +
    '             ng-required="constraints.required"/>\n' +
    '       <span class="input-group-btn">\n' +
    '         <button type="button" class="btn btn-default"\n' +
    '                 data-placement="right" title="{{description.title}}" data-content="{{description.content}}"\n' +
    '                 data-trigger="click" bs-popover>\n' +
    '           <span class="glyphicon glyphicon-question-sign"></span>\n' +
    '         </button>\n' +
    '      </span>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-switch-default>\n' +
    '      <input type="text" id="{{id}}" name="{{id}}" ng-model="data[id]" class="form-control"\n' +
    '             placeholder="{{placeholder}}"\n' +
    '             ng-minlength="constraints.min" ng-maxlength="constraints.max" ng-disabled="constraints.disabled"\n' +
    '             ng-required="constraints.required"/>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-messages="formModel[id].$error" class="message-invalid" ng-if="formModel.submitPressed">\n' +
    '      <div ng-message="required">{{localize("error.required_field")}}</div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();
