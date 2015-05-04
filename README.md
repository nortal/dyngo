# dyngo [![Build Status](https://travis-ci.org/nortal/dyngo.svg?branch=master)](https://travis-ci.org/nortal/dyngo)

Provides a functionality for building forms in AngularJS from structure described in JSON.

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
The project is published in bower registry.

`bower install --save dyngo`

## Features (long version):
### Structure of form definition JSON
Form definition object consists of two parts: array of *components* and key-object map of *translations*:
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
* Supports most common HTML input types
* Possibility to add custom input types
* Defining constraints
  * Supported constraints: min, max, required, enabled, visible
  * Constraints evaluated in runtime and they may depend on form data
* Functions support
