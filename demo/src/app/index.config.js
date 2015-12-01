(function() {
  'use strict';

  angular
    .module('dyngoDemo')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
