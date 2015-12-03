(function() {
  'use strict';

  angular.module('dyngoDemo')

    .run(function(dgComponentProvider) {

      dgComponentProvider.registerComponent('periodRange', {
        group: 'Default',
        label: 'Select',
        templateUrl: 'app/demo/templates/periodRange.html'
      });

    });
})();
