(function() {
  'use strict';

  angular
    .module('dyngoDemo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, componentProvider) {
    $log.debug('runBlock end');
    componentProvider.registerComponent('timeInterval', {
      group: 'Default',
      label: 'Select',
      templateUrl: 'app/demo/templates/timeInterval.html'
    });
  }

})();
