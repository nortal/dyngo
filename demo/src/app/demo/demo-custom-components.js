(function() {
  'use strict';

  angular.module('dyngoDemo')

    .run(function(dgComponentProvider) {

      dgComponentProvider.registerComponent('timeInterval', {
        group: 'Default',
        label: 'Select',
        templateUrl: 'app/demo/templates/timeInterval.html'
      });

    });
})();
