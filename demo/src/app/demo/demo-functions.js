'use strict';

angular.module('dyngoDemo')

  .run(function(dgFunctionProvider) {
    dgFunctionProvider.registerFunction('replaceSpaces', function(s, r) {
      if (angular.isUndefined(s)) {
        return undefined;
      }
      return s.split(' ').join(r);
    });

    console.log(dgFunctionProvider);
  });
