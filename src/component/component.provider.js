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
  .provider('dgComponentProvider', function () {
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
