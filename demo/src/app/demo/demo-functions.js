(function() {
  'use strict';

  angular.module('dyngoDemo')

    .run(function(dgFunctionProvider) {

      dgFunctionProvider.registerFunction('replaceSpaces', function(val, replacement) {
        if (angular.isUndefined(val)) {
          return undefined;
        }
        return val.replace(/\s/g, replacement);
      });

    });
})();
