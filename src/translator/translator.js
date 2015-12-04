angular.module('dyngo.translator', [])

  .value('dgDictionary', {})

  .service('dgTranslator', function(dgDictionary) {

    this.registerDictionary = function(formName, dictionary) {
      dgDictionary[formName] = dictionary || {};
    };

    this.translate = function(formName, key, lang) {
      var translatedValue;
      var dictionary = dgDictionary[formName];
      if (angular.isDefined(dictionary) && angular.isDefined(dictionary[lang])) {
        translatedValue = dictionary[lang][key];
      }
      if (angular.isUndefined(translatedValue)) {
        translatedValue = key;
      }
      return translatedValue;
    };

  })

  .filter('dgTranslate', function(dgTranslator) {
    return function(input, formName, lang) {
      return dgTranslator.translate(formName, input, lang);
    };
  });
