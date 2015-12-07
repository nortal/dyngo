describe('dyngo', function() {
  var $scope, $compile, dyngo, dgTranslator;
  var formStructure;
  var formName = 'demoForm';
  var translatedValueEng = 'value in english';

  var defaultStructure = {
    "components": [
      {
        "id": "componentId",
        "type": "textInput",
        "label": "Component label",
        "constraints": {}
      }
    ],
    "translations": {
      "en": {}
    }
  };

  beforeEach(module('dyngo'));
  beforeEach(module('dyngo.component.templates'));

  beforeEach(inject(function($rootScope, _$compile_, _dyngo_, _dgTranslator_) {
    $scope = $rootScope;
    $compile = _$compile_;
    dyngo = _dyngo_;
    dgTranslator = _dgTranslator_;
  }));

  beforeEach(function() {
    $scope.data = {};
    formStructure = {};
    angular.copy(defaultStructure, formStructure);
    dyngo.registerForm(formName, formStructure);
    $scope.lang = 'en';
    dgTranslator.registerDictionary(formName, {en: {'translated_value': translatedValueEng}});
  });

  function compileElement(elementString, scope) {
    var element = $compile(elementString)(scope);
    scope.$digest();
    return element;
  }

  function validateInput(elm, expectedAttrs) {
    var input = elm.find('input');
    assert.equal(1, input.length);
    assert.equal('componentId', input.attr('id'));

    // Default attributes
    input.attr('ng-required').should.be.defined;
    input.attr('ng-disabled').should.be.defined;

    // Element specific attribute
    angular.forEach(expectedAttrs, function(attr) {
      assert.equal(attr.value, input.attr(attr.key));
    });

    return input;
  }

  function validateMultipleInputs(elm, expectedAttrs, expectedInputsCount) {
    var inputs = elm.find('input');
    assert.equal(expectedInputsCount, inputs.length);
    for (var idx = 0; idx < inputs.length; idx++) {
      var input = $(inputs[idx]);
      assert.equal('componentId_' + idx, input.attr('id'));

      // Default attributes
      input.attr('ng-required').should.be.defined;
      input.attr('ng-disabled').should.be.defined;

      // Element specific attribute
      angular.forEach(expectedAttrs, function(attr) {
        assert.equal(attr.value, input.attr(attr.key));
      });
    }
  }

  function validateSelect(elm, expectedAttrs, expectedOptions) {
    var select = elm.find('select');
    var options = select.find('option');
    assert.equal(expectedOptions.length + 1, options.length);

    // Default attributes
    select.attr('ng-required').should.be.defined;
    select.attr('ng-disabled').should.be.defined;

    // Element specific attribute
    angular.forEach(expectedAttrs, function(attr) {
      assert.equal(attr.value, select.attr(attr.key));
    });

    for (var idx = 0; idx < options.length; idx++) {
      if (idx === 0) {
        $(options[idx]).attr('value').should.equal('');
      } else {
        $(options[idx]).attr('value').should.equal('string:' + expectedOptions[idx - 1].code);
        $(options[idx]).attr('label').should.equal(expectedOptions[idx - 1].value);
      }
    }
  }

  function validateLabel(elm) {
    var labels = elm.find('label');
    assert.equal('Component label', labels.first().html());
  }

  it('should render text input', function() {
    formStructure.components[0].type = 'textInput';
    formStructure.components[0].constraints.min = 5;
    formStructure.components[0].constraints.max = 15;

    var elm = compileElement('<div dg-form="demoForm" dg-lang="en" ng-model="data"></div>', $scope);
    validateInput(elm, [{key: 'ng-minlength', value: 5}, {key: 'ng-maxlength', value: 15}]);
    validateLabel(elm);
  });

  it('should render number input', function() {
    formStructure.components[0].type = 'numberInput';
    formStructure.components[0].constraints.min = 5;
    formStructure.components[0].constraints.max = 15;

    var elm = compileElement('<div dg-form="demoForm" dg-lang="en" ng-model="data"></div>', $scope);
    validateInput(elm, [{key: 'min', value: 5}, {key: 'max', value: 15}]);
    validateLabel(elm);
  });

  it('should render vertical radio input', function() {
    formStructure.components[0].type = 'radio';
    formStructure.components[0].options = [
      {code: 'foo', text: 'Foo'}, {code: 'bar', text: 'Bar'}, {code: 'baz', text: 'Baz'}
    ];

    var elm = compileElement('<div dg-form="demoForm" dg-lang="en" ng-model="data"></div>', $scope);
    validateMultipleInputs(elm, [], 3);
    validateLabel(elm);
  });

  it('should render horizontal radio input', function() {
    formStructure.components[0].type = 'radio';
    formStructure.components[0].layout = {orientation: 'horizontal'};
    formStructure.components[0].options = [
      {code: 'foo', text: 'Foo'}, {code: 'bar', text: 'Bar'}, {code: 'baz', text: 'Baz'}
    ];

    var elm = compileElement('<div dg-form="demoForm" dg-lang="en" ng-model="data"></div>', $scope);
    validateMultipleInputs(elm, [], 3);
    validateLabel(elm);
  });

  it('should render vertical checkboxes', function() {
    formStructure.components[0].type = 'checkbox';
    formStructure.components[0].options = [
      {code: 'foo', text: 'Foo'}, {code: 'bar', text: 'Bar'}, {code: 'baz', text: 'Baz'}
    ];

    var elm = compileElement('<div dg-form="demoForm" dg-lang="en" ng-model="data"></div>', $scope);
    validateMultipleInputs(elm, [], 3);
    validateLabel(elm);
  });

  it('should render horizontal checkboxes', function() {
    formStructure.components[0].type = 'checkbox';
    formStructure.components[0].layout = {orientation: 'horizontal'};
    formStructure.components[0].options = [
      {code: 'foo', text: 'Foo'}, {code: 'bar', text: 'Bar'}, {code: 'baz', text: 'Baz'}
    ];

    var elm = compileElement('<div dg-form="demoForm" dg-lang="en" ng-model="data"></div>', $scope);
    validateMultipleInputs(elm, [], 3);
    validateLabel(elm);
  });

  it('should render select', function() {
    formStructure.components[0].type = 'select';
    formStructure.components[0].options = [
      {code: 'foo', value: 'Foo'}, {code: 'bar', value: 'Bar'}, {code: 'baz', value: 'Baz'}, {code: 'qux', value: 'translated_value'}
    ];

    var elm = compileElement('<div dg-form="demoForm" dg-lang="en" ng-model="data"></div>', $scope);
    var expectedOptions = formStructure.components[0].options.slice();
    expectedOptions[3].value = translatedValueEng;
    validateSelect(elm, [], expectedOptions);
    validateLabel(elm);
  });

  it('should render header', function() {
    formStructure.components[0].type = 'header';
    var elm = compileElement('<div dg-form="demoForm" dg-lang="en" ng-model="data"></div>', $scope);
    assert.equal(1, elm.find('h2').length);
    assert.equal('Component label', elm.find('h2').html());
  });

  it('should render static text', function() {
    formStructure.components[0].type = 'staticText';
    var elm = compileElement('<div dg-form="demoForm" dg-lang="en" ng-model="data"></div>', $scope);
    assert.equal(1, elm.find('p').length);
    assert.equal('Component label', elm.find('p').html());
  });

  it('should render hidden input text', function() {
    formStructure.components[0].type = 'hidden';
    var elm = compileElement('<div dg-form="demoForm" dg-lang="en" ng-model="data"></div>', $scope);
    assert.equal(1, elm.find('input').length);
    assert.equal('data[id]', elm.find('input').attr('ng-model'));
  });


});

