(function() {
  'use strict';

  angular.module('dyngoDemo.single', [])

    .controller('DemoSingleFormController', function($window, dyngo, DemoService, $scope) {
      var vm = this;

      DemoService.loadStructure('samples').then(function(formStructure) {
        dyngo.registerForm('demoForm', formStructure);
        vm.formData = {};
      });

      vm.submit = function() {
        if ($scope.demoForm.$valid) {
          DemoService.saveData(vm.formData).then(function() {
            $window.scrollTo(0, 0);
          });
        }
      };
    });
})();
