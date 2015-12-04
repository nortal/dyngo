(function() {
  'use strict';

  angular.module('dyngoDemo')

    .service('DemoService', function($resource, config) {
      this.loadStructure = function(formName) {
        return $resource(config.formUrl).get({formName: formName}).$promise;
      };

      this.saveData = function(data) {
        return $resource(config.submitUrl).save(data).$promise;
      };
    })

})();