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
    this.$get = function ($http, $templateCache) {
      _$http = $http;
      _$templateCache = $templateCache;
      angular.forEach(this.components, function (component) {
        loadTemplate(component, $http, $templateCache);
      });
      return {
        components: this.components,
        registerComponent: this.registerComponent
      };
    };
  });
