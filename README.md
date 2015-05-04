# dyngo [![Build Status](https://travis-ci.org/nortal/dyngo.svg?branch=master)](https://travis-ci.org/nortal/dyngo)

Provides a functionality for building forms in AngularJS according to structure and rules described in JSON format.

## License
Apache License, Version 2.0

## Features (short version):
* Supports most common HTML input types
* Possibility to add custom input types
* Defining constraints
  * Supported constraints: min, max, required, enabled, visible
  * Constraints evaluated in runtime and they may depend on form data
* Functions support
* Translations

## Dependencies:
* Angular 1.3+
* [AngularStrap](http://mgcrea.github.io/angular-strap/) 2.1+
* [Checklist-model](http://vitalets.github.io/checklist-model/) 0.1.3+

## Demo
* You can see a full-featured demo [here](http://nortal.github.io/dyngo) 
* Another option is to run it on your own machine
  * Prerequisites: [nodejs](https://nodejs.org/), [bower](http://bower.io/#install-bower), [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) and [grunt](http://gruntjs.com/getting-started) (sorry for that, will replace grunt with gulp in demo application soon)
  * Clone the repository: `git clone https://github.com/nortal/dyngo.git`
  * Execute run-demo.sh in root directory: `./run-demo.sh`
  * Navigate to [http://localhost:9001](http://localhost:9001) in your browser
  
## Installation
1. Attach dyngo to your project. As Dyngo is published in bower registry, then the easiest way is to use bower:
`bower install --save dyngo`
2. Add dyngo as a dependency to your Angular module:
```js
angular.module('myApp', ['dyngo'])
```
3. Obtain a form definition object and the initial data (either load it using $http/$resource, compose it manually in runtime or hard-code it in the source - it's up to you):
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
This is a valid form structure but, no surprise, it will render an empty form.
#### Defining components
Component definition object is straightforward and a minimal definition consists of *id* and *type* attributes only:
```json
{
  "id": "firstName",
  "type": "textInput"
}
```
Full table of supported attributes:

| Attribute     | Type       | Description   | Required | Sample value                        |
| ------------- | ---------- | ------------- | -------- | -------------------------------
| id            | String     | Unique component ID  | yes| `"firstName"`
| type          | String     | Component type  | yes | `"textInput"`
| label         | String     | Label for component | no | `"Fist name"`
| placeholder   | String     | Placeholder text | no | `"Enter first name"`
| description   | Object     | Header and content for description tooltip  | no | `{"title": "Info", "content": "Some explanations about component"}`
| options       | Object[]   | List of selectable options (for selects, radios, etc) | no | `json [{"code": "valueA", "text": "Value A"} ]`
| constraints   | Object     | Key-value pairs describing constraints  | no | ` {"max": 15, "required": true}`
| functions     | String[]   | List of expressions to be evaluated on data change  | no | `['setData(round(annualSalary / 12.0))']`

### Supported input types
### Custom input types
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

* Supports most common HTML input types
* Possibility to add custom input types
* Defining constraints
  * Supported constraints: min, max, required, enabled, visible
  * Constraints evaluated in runtime and they may depend on form data
* Functions support
