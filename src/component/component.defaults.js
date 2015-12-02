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
  .run(function(componentProvider) {
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
    componentProvider.registerComponent('staticText', {
      group: 'static-controls',
      templateUrl: 'templates/static-text.html'
    });
    componentProvider.registerComponent('hidden', {
      group: 'Default',
      templateUrl: 'templates/hidden.html'
    });

    componentProvider.registerComponent('panel', {
      group: 'containers',
      templateUrl: 'templates/panel.html'
    });
  });
