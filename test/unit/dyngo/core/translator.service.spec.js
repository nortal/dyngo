describe('dgTranslator: ', function () {
  var dgTranslator, dgDictionary;
  var formName = 'sampleForm', lang = 'en';

  beforeEach(module('dyngo.translator'));

  beforeEach(inject(function (_dgTranslator_, _dgDictionary_) {
    dgTranslator = _dgTranslator_;
    dgDictionary = _dgDictionary_;
  }));

  beforeEach(function () {
    // clear dictionary
    for (prop in dgDictionary) {
      if (dgDictionary.hasOwnProperty(prop)) {
        delete dgDictionary[prop];
      }
    }
  });

  it('registerDictionary() should register dictionary if it is defined', function () {
    expect(dgDictionary[formName]).to.be.undefined;
    dgTranslator.registerDictionary(formName, {en: {key: 'localized value'}, de: {key: 'translate me!'}});
    expect(dgDictionary[formName]).to.deep.equal({en: {key: 'localized value'}, de: {key: 'translate me!'}});
  });

  it('registerDictionary() should register empty dictionary if it is undefined', function () {
    expect(dgDictionary[formName]).to.be.undefined;
    dgTranslator.registerDictionary(formName, undefined);
    expect(dgDictionary[formName]).to.deep.equal({});
  });

  it('translate() should return key if dictionary is empty', function () {
    expect(dgDictionary[formName]).to.be.undefined;
    expect(dgTranslator.translate(formName, 'key', lang)).to.equal('key');
  });

  it('translate() should return key if translations do not contain key', function () {
    dgDictionary[formName] = {en: {another_key: 'localized another key'}};
    expect(dgTranslator.translate(formName, 'key', lang)).to.equal('key');
  });

  it('translate() should return localized value', function () {
    dgDictionary[formName] = {en: {key: 'localized key'}};
    expect(dgTranslator.translate(formName, 'key', lang)).to.equal('localized key');
  });

});
