(function() {
  'use strict';

  angular
    .module('dyngoDemo')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/single', {
        templateUrl: 'app/demo/single/demo-single.html',
        controller: 'DemoSingleFormController',
        controllerAs: 'demo'
      })
      .when('/twin', {
        templateUrl: 'app/demo/twin/demo-twin.html',
        controller: 'DemoTwinFormController',
        controllerAs: 'demo'
      })
      .otherwise({
        redirectTo: '/single'
      });
  }

})();
