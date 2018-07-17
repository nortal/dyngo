# dyngo [![Build Status](https://travis-ci.org/nortal/dyngo.svg?branch=master)](https://travis-ci.org/nortal/dyngo)

Provides a functionality for building forms in AngularJS according to structure and rules described in JSON format.

## License
MIT

## Features (short version):
* Supports most common HTML input types
* Possibility to add custom input types
* Defining constraints
  * Supported constraints: min, max, required, enabled, visible
  * Constraints are evaluated in runtime and they may depend on form data
  * Ability to define custom constraints
* Functions support
* Translations

## Dependencies:
* Angular 5+
* [ngx-bootstrap](https://github.com/valor-software/ngx-bootstrap) 2.0.2+
* [context-eval](https://www.npmjs.com/package/context-eval) 0.1.0

## Demo 
```bash
  yarn install
  yarn build:lib
  ng serve
```
Navigate to [http://localhost:4200]([http://localhost:4200]) in your browser  
  
## Installation
1. Attach dyngo to your project. As Dyngo is published in bower registry, then the easiest way is to use bower:
`npm install --save ngx-dyngo-lib`
2. Add dyngo as a dependency to your Angular module:
```js
angular.module('myApp', ['dyngo'])
```
3. Obtain form definition object and initial data (either load it using $http/$resource, compose it manually in runtime or hard-code it in the source - it's up to you):
```js
var formStructure = {components: [{id: "firstName", type: "textInput"}], translations: {}};
$scope.data = {firstName: "John Doe"};
```
4. Register your form using *dyngo* service:
```js
myApp.controller('MyFormController', function ($scope, dyngo) {
  var formStructure = {components: [{id: "firstName", type: "textInput"}], translations: {}};
  $scope.data = {firstName: "John Doe"};
  
  dyngo.registerForm('sampleForm', formStructure);
```
5. Append this code to your HTML:
```html
<form class="form-horizontal" name="sampleForm">
  <div dg-form="sampleForm" dg-lang="en" ng-model="data"></div>
</form>
```

## Features (long version):
### Structure of form definition JSON
Form definition object consists of two parts: array of *components* and key-object pairs of *translations*:
```json
{
  "components": [],
  "translations": {}
}
```
This is a valid form structure but, no surprise, it will render an empty form. So, we have to add component definition objects to *components* array.
#### Defining components
Component definition object is straightforward and a minimal definition consists of *id* and *type* attributes only:
```json
{
  "id": "firstName",
  "type": "textInput"
}
```
Table showing all supported attributes (note, that *options* and *placeholder* attributes do not apply to all component types):

| Attribute     | Type       | Description   | Required | Sample value                        |
| ------------- | ---------- | ------------- | -------- | -------------------------------
| id            | String     | Unique component ID  | yes | `"firstName"`
| type          | String     | Component type  | yes | `"textInput"`
| label         | String     | Label for component | no | `"Fist name"`
| placeholder   | String     | Placeholder text | no | `"Enter first name"`
| description   | Object     | Header and content for description tooltip  | no | `{"title": "Info", "content": "Some explanations about component"}`
| options       | Object[]   | List of selectable options (for selects, radios, etc) | no | `json [{"code": "valueA", "text": "Value A"} ]`
| constraints   | Object     | Key-value pairs describing constraints  | no | ` {"max": 15, "required": true}`
| functions     | String[]   | List of expressions to be evaluated on data change  | no | `['setData(round(annualSalary / 12.0))']`

### Supported component types
* Text input
* Textarea
* Number input
* Checkbox
* Radio
* Select
* Header
* Static text
* Hidden input
* Panel

### Custom components
One can easily add custom components by injecting *dyngoComponentProvider* and calling its *registerComponent(type, componentDefinition)* method, where type is string and componentDefintion is an object describing custom component. Below is a table of supported properties for component definition object:

| Property     | Type       | Description   | Required | Sample value                        |
| ------------- | ---------- | ------------- | -------- | ------------------------------- |
| group | String | Specifies a group where this component belongs to | no | `'Text inputs'` or `'Containers'`
| label | String | Specifies human-readable name for this component type | no | `'Number input'` or `'Static text'`
| templateUrl | String | Path to HTML file containing template for rendering component | yes, if template is undefined | `'html/templates/myCustomComponent.html'`
| template | String | Specifies HTML template used for rendering component | yes, if templateUrl is undfined | `'<input type="text" ng-model="data[id]>"'`


### Constraints
### Functions
### Translations
Translations are defined at the root of form definition object as a key-object pair for each supported language. Key is language code and object is a map of translation keys and translated values:
```json
"translations": {
    "en": {
      "error.required_field": "You did not enter a field.",
      "error.value_is_gt_max": "Value should not be greater than {{max()}}.",
    },
    "et": {
      "error.required_field": "Täitke väli.",
      "error.value_is_gt_max": "Välja väärtus peab olema väiksem kui {{max()}}",
    }
}
```
Translated values can contain expressions (*{{expression}}*) that are evaluated in runtime.

## Custom additions
* Column component
```json
"childDefaults": {
  "width": 6 // bootstrap grid units
}
```
