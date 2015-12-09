(function() {
  'use strict';

  angular.module('dyngoDemo')

    .service('DemoService', function($resource, config) {
      this.loadStructure = function(formName) {
        return $resource(config.loadFormUrl).get({formName: formName}).$promise;
      };

      this.saveData = function(data) {
        return $resource(config.saveDataUrl).save(data).$promise;
      };
    })

})();
