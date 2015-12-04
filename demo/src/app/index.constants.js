(function() {
  'use strict';

  angular
    .module('dyngoDemo')
    .constant('config', {
      api: '',
      formUrl: 'api/v1/forms/:formName',
      resultFormUrl: '@@resultFormUrl',
      submitUrl: "api/v1/forms",
      title: 'Dyngo'
    });


})();
