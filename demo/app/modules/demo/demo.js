'use strict';

angular.module('demo', ['ngResource', 'ngRoute', 'dyngo.config', 'dyngo', 'templates-main'])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'modules/demo/demo.html',
        controller: 'DemoFormController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .controller('DemoFormController', function ($scope, $window, $resource, config, dyngo) {
    $resource(config.formUrl).get(function (formStructure) {
      dyngo.registerForm('demoForm', formStructure);
      $scope.data = {};
    });

    $scope.submit = function () {
      $scope.demoForm.submitPressed = true;
      if ($scope.demoForm.$valid) {
        $resource(config.submitUrl).save($scope.data, function () {
          $resource(config.resultFormUrl).get(function (form) {
            $scope.showResult = true;
            $scope.form = form;
            $window.scrollTo(0, 0);
          });
        });
      }
    };
  });
