angular.module('dyngo.config', [])
  .constant('config', {
    api: '',
    formUrl: 'api/v1/forms/samples',
    resultFormUrl: '@@resultFormUrl',
    submitUrl: "api/v1/forms",
    title: 'Dyngo'
  });
