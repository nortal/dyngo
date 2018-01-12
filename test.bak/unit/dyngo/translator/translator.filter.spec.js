describe('dgTranslator: ', function() {
  var formName = 'sampleForm', lang = 'en';

  beforeEach(module('dyngo.translator'));

  beforeEach(inject(function(dgTranslator) {
    dgTranslator.registerDictionary(formName, {en: {'some_key': 'localized value in english'}});
  }));

  it('dgFilter should return translated value', inject(function(dgTranslateFilter) {
    expect(dgTranslateFilter('some_key', 'sampleForm', 'en')).to.equal('localized value in english');
  }));

  it('dgFilter should return key value for missing translation', inject(function(dgTranslateFilter) {
    expect(dgTranslateFilter('some_key', 'sampleForm', 'de')).to.equal('some_key');
  }));

});
