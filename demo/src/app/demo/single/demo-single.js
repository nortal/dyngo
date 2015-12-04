(function() {
  'use strict';

  angular.module('dyngoDemo.single', [])

    .controller('DemoSingleFormController', function($window, dyngo, DemoService) {
      var vm = this;

      DemoService.loadStructure('samples').then(function(formStructure) {
        dyngo.registerForm('demoForm', formStructure);
        vm.formData = {};
      });

      vm.submit = function() {
        vm.demoForm.submitPressed = true;
        if (vm.demoForm.$valid) {
          DemoService.saveData(vm.formData).then(function() {
            $window.scrollTo(0, 0);
          });
        }
      };
    });
})();
