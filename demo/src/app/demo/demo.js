(function() {
  'use strict';

  angular.module('dyngoDemo')

    .service('DemoService', function($resource, config) {
      this.loadStructure = function() {
        return $resource(config.formUrl).get().$promise;
      };

      this.saveData = function(data) {
        return $resource(config.submitUrl).save(data).$promise;
      };
    })

    .controller('DemoFormController', function($window, dyngo, DemoService) {
      var vm = this;

      DemoService.loadStructure().then(function(formStructure) {
        dyngo.registerForm('demoForm', formStructure);
        vm.data = {};
      });

      vm.submit = function() {
        vm.demoForm.submitPressed = true;
        if (vm.demoForm.$valid) {
          DemoService.saveData(vm.data).then(function() {
            //$resource(config.resultFormUrl).get(function(form) {
            vm.showResult = true;
            //$scope.form = form;
            $window.scrollTo(0, 0);
            // });
          });
        }
      };
    });
})();
