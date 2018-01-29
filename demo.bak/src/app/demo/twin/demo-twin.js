(function() {
  'use strict';

  angular.module('dyngoDemo.twin', [])

    .controller('DemoTwinFormController', function($window, dyngo, DemoService) {
      var vm = this;

      DemoService.loadStructure('simple').then(function(formStructure) {
        dyngo.registerForm('formA', formStructure);
        vm.dataA = {};
      });

      DemoService.loadStructure('simple').then(function(formStructure) {
        dyngo.registerForm('formB', formStructure);
        vm.dataB = {};
      });

      vm.submit = function() {
        // persist the data
      };
    });
})();
