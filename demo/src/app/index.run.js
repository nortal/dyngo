(function() {
  'use strict';

  angular
    .module('dyngoDemo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
