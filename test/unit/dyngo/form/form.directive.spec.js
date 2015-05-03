describe('dgForm directive', function () {
  var $scope, $compile, dyngo;

  beforeEach(module('dyngo.form'));

  beforeEach(inject(function ($rootScope, _$compile_, _dyngo_) {
    $scope = $rootScope;
    $compile = _$compile_;
    dyngo = _dyngo_;
  }));

  it('should render initial form div', function () {
    var form = {components: [], translations: {}};
    dyngo.registerForm('sampleForm', form);
    $scope.data = {};
    var element = $compile('<div dg-form="sampleForm" ng-model="data"></div>')($scope);
    $scope.$digest();
    var formRoot = element.children().first();
    expect(formRoot.attr('dg-container')).to.equal('form.structure');
    expect(formRoot.attr('ng-model')).to.equal('data');
    expect(formRoot.scope().form).not.to.be.undefined;
  });

  it('should do nothing if form is undefined', function () {
    var element = $compile('<div dg-form="sampleForm" ng-model="data"></div>')($scope);
    $scope.$digest();
    expect(element.children().length).to.equal(0);
  });

});
