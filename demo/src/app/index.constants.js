(function() {
  'use strict';

  angular
    .module('dyngoDemo')
    .constant('config', {
      loadFormUrl: 'api/v1/forms/:formName',
      saveDataUrl: 'api/v1/forms/:formName/data'
    });


})();
