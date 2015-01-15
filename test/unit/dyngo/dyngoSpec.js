'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('dyngo');
  dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('dyngo.core')).to.be.ok;
    //expect(hasModule('dyngo.core')).to.be.ok;
    //expect(hasModule('dyngo.components')).to.be.ok;
  });







});
