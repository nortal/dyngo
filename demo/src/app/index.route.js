(function() {
  'use strict';

  angular
    .module('dyngoDemo')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/demo/demo.html',
        controller: 'DemoFormController',
        controllerAs: 'demo'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
