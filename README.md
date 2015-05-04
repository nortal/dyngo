# dyngo
=====================
[![Build Status](https://travis-ci.org/nortal/dyngo.svg?branch=master)](https://travis-ci.org/nortal/dyngo)

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

## Dependencies:
* Angular 1.3+
* [AngularStrap](http://mgcrea.github.io/angular-strap/) 2.1+
* [Checklist-model](http://vitalets.github.io/checklist-model/) 0.1.3+

## Installation
The project is published in bower registry.

`bower install --save dyngo`

## Demo
* You can see a full-featured demo [here](http://nortal.github.io/dyngo) 
* Another option is to run it on your own machine
  * Prerequisites: [nodejs](https://nodejs.org/), [bower](http://bower.io/#install-bower), [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) and [grunt](http://gruntjs.com/getting-started) (sorry for that, will replace grunt with gulp in demo application soon)
  * Clone the repository: `git clone https://github.com/nortal/dyngo.git`
  * Execute run-demo.sh in root directory: `./run-demo.sh`
  * Navigate to [http://localhost:9001](http://localhost:9001) in your browser
  
## Features (long version):
### Supported input types:
* Supports most common HTML input types
* Possibility to add custom input types
* Defining constraints
  * Supported constraints: min, max, required, enabled, visible
  * Constraints evaluated in runtime and they may depend on form data
* Functions support
