'use strict';

describe('', function () {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function (module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function () {

    // Get module
    module = angular.module('dyngo');
    dependencies = module.requires;
  });

  it('should load all required dyngo modules', function () {
    var expectedModules = ['dyngo.form', 'dyngo.container', 'dyngo.component', 'dyngo.component.provider',
      'dyngo.component.defaults', 'dyngo.functions', 'dyngo.translator'];
    angular.forEach(expectedModules, function(moduleName) {
      expect(hasModule(moduleName)).to.be.ok;
    });
  });


});
