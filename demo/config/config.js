angular.module('dyngo.config', [])
  .constant('config', {
    api: '@@api',
    formUrl: '@@formUrl',
    resultFormUrl: '@@resultFormUrl',
    submitUrl: "@@submitUrl",
    title: 'Dyngo'
  });
