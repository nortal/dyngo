describe('dgComponent directive', function() {
  var $scope, $compile, dgComponentProvider, $templateCache;

  beforeEach(module('dyngo.component'));
  beforeEach(module('dyngo.functions'));
  beforeEach(module('dyngo.translator'));
  beforeEach(module('dyngo.component.templates'));

  beforeEach(inject(function($rootScope, _$compile_, _dgComponentProvider_, _$templateCache_) {
    $scope = $rootScope.$new(); // dgComponent can't be a root scope - it needs a parent to ask data from
    $compile = _$compile_;
    dgComponentProvider = _dgComponentProvider_;
    $templateCache = _$templateCache_;
  }));

  it('should not proceed if component type is undefined', function() {
    $scope.component = {};
    $scope.data = {};
    var element = $compile('<div dg-component="component" ng-model="data"></div>')($scope);
    $scope.$digest();
    expect($scope.$component).to.be.undefined;
    expect(element.children().length).to.equal(1);
    expect(element.children().first().html().indexOf('Unknown component type')).to.equal(0);
  });

  it('should not proceed if component type is unknown', function() {
    $scope.component = {type: 'someUnknownType'};
    $scope.data = {};
    var element = $compile('<div dg-component="component" ng-model="data"></div>')($scope);
    $scope.$digest();
    expect($scope.$component).to.be.undefined;
    expect(element.children().length).to.equal(1);
    expect(element.children().first().html().indexOf('Unknown component type')).to.equal(0);
  });

  it('should render correct component from static template', function() {
    $scope.component = {type: 'coolHeader'};
    dgComponentProvider.registerComponent('coolHeader', {template: '<h1>I am a cool header!</h1>'});
    $scope.data = {};
    var element = $compile('<div dg-component="component" ng-model="data"></div>')($scope);
    $scope.$digest();

    var componentRoot = element.children().first();
    expect(componentRoot.scope().$component).not.to.be.undefined;
    expect(element.children().first().html()).to.equal('I am a cool header!');
  });


  it('should render correct component from templateUrl', function() {
    $scope.component = {type: 'coolHeader'};
    dgComponentProvider.registerComponent('coolHeader', {templateUrl: 'templates/coolHeader.html'});
    $templateCache.put('templates/coolHeader.html', '<h1>I am a cool header again!</h1>');
    $scope.data = {};
    var element = $compile('<div dg-component="component" ng-model="data"></div>')($scope);
    $scope.$digest();

    var componentRoot = element.children().first();
    expect(componentRoot.scope().$component).not.to.be.undefined;
    expect(element.children().first().html()).to.equal('I am a cool header again!');
  });

  it('should init scope values', function() {
    dgComponentProvider.registerComponent('inputElement', {
      template: '<h1>I am a cool header!</h1>',
      options: {a: 'a', b: 'b'},
      constraints: {min: 0, max: 10},
      layout: {orientation: 'vertical', height: '100px'}
    });
    $scope.component = {
      id: 'inputElement_1', type: 'inputElement', label: 'element label',
      description: 'element description',
      placeholder: 'element placeholder',
      options: {a: 'a', b: 'b', c: 'c'},
      constraints: {min: 5},
      layout: {height: '70px', width: '50%'}
    };
    $scope.data = {};
    $scope.$parent.formModel = {};
    $scope.$parent.formName = 'form_1';
    var element = $compile('<div dg-component="component" ng-model="data"></div>')($scope);
    $scope.$digest();

    var componentRoot = element.children().first();
    var componentScope = componentRoot.scope();
    expect(componentScope.formModel).not.to.be.undefined;
    expect(componentScope.formName).to.equal('form_1');
    expect(componentScope.id).to.equal('inputElement_1');
    expect(componentScope.label).to.equal('element label');
    expect(componentScope.description).to.equal('element description');
    expect(componentScope.placeholder).to.equal('element placeholder');
    expect(componentScope.options).to.deep.equal({a: 'a', b: 'b', c: 'c'});
    expect(componentScope.constraints).to.deep.equal({min: 5, max: 10});
    expect(componentScope.layout).to.deep.equal({orientation: 'vertical', height: '70px', width: '50%'});
  });

  it('should init default object value', function() {
    $scope.component = {
      id: 'elementA', type: 'inputElement', defaultValue: {foo: 1, bar: 'a', baz: true}
    };
    dgComponentProvider.registerComponent('inputElement', {
      template: '<input />'
    });
    $scope.data = {};
    var element = $compile('<div dg-component="component" ng-model="data"></div>')($scope);
    $scope.$digest();
    expect($scope.data['elementA']).to.deep.equal({foo: 1, bar: 'a', baz: true});
  });

  it('should not init default object value', function() {
    $scope.component = {
      id: 'elementA', type: 'inputElement', defaultValue: {foo: 1, bar: 'a', baz: true}
    };
    dgComponentProvider.registerComponent('inputElement', {
      template: '<input />'
    });
    $scope.data = {'elementA': {foo: 2, bar: 'b'}};
    var element = $compile('<div dg-component="component" ng-model="data"></div>')($scope);
    $scope.$digest();
    expect($scope.data['elementA']).to.deep.equal({foo: 2, bar: 'b'});
  });

  it('should init default string value', function() {
    $scope.component = {
      id: 'elementA', type: 'inputElement', defaultValue: 'foobar'
    };
    dgComponentProvider.registerComponent('inputElement', {
      template: '<input />'
    });
    $scope.data = {};
    var element = $compile('<div dg-component="component" ng-model="data"></div>')($scope);
    $scope.$digest();
    expect($scope.data['elementA']).to.deep.equal("foobar");
  });

  it('should not init default string value', function() {
    $scope.component = {
      id: 'elementA', type: 'inputElement', defaultValue: 'foobar'
    };
    dgComponentProvider.registerComponent('inputElement', {
      template: '<input />'
    });
    $scope.data = {'elementA': 'barbaz'};
    var element = $compile('<div dg-component="component" ng-model="data"></div>')($scope);
    $scope.$digest();
    expect($scope.data['elementA']).to.deep.equal('barbaz');
  });

  it('should have at least setData() function defined in scope', function() {
    dgComponentProvider.registerComponent('inputComponent', {template: '< type="text">'});
    $scope.component = {
      type: 'inputComponent'
    };
    $scope.data = {};
    var element = $compile('<div dg-component="component" ng-model="data"></div>')($scope);
    $scope.$digest();
    expect(element.isolateScope().setData).not.to.be.undefined;
  });

  it('should execute functions when form data changes', function() {
    dgComponentProvider.registerComponent('inputComponent', {template: '< type="text">'});
    $scope.component = {
      id: 'calculatedElement',
      type: 'inputComponent',
      functions: ['setData(foo * 2 + 10)']
    };
    $scope.data = {};
    $scope.foo = 'moo';
    var element = $compile('<div dg-component="component" ng-model="data"></div>')($scope);
    $scope.$digest();
    $scope.$apply(function() {
      $scope.data.foo = 7;
    });
    expect($scope.data.calculatedElement).to.equal(24);
    $scope.$apply(function() {
      $scope.data.foo = 1;
    });
    expect($scope.data.calculatedElement).to.equal(12);
  });

});
