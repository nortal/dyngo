describe('dgContainer directive', function () {
  var $scope, $compile;

  beforeEach(module('dyngo.container'));

  beforeEach(inject(function ($rootScope, _$compile_) {
    $scope = $rootScope;
    $compile = _$compile_;
  }));

  it('should render three child components', function () {
    $scope.containerComponent = {components: [{}, {}, {}]};
    $scope.data = {};
    var element = $compile('<div dg-container="containerComponent" ng-model="data"></div>')($scope);
    $scope.$digest();
    expect(element.children().length).to.equal(3);
    angular.forEach(element.children(), function (child) {
      var childElem = $(child);
      expect(childElem.attr('dg-component')).to.equal('component');
      expect(childElem.attr('ng-model')).to.equal('data');
      expect(childElem.attr('ng-if')).to.equal('visible(component)');
    });
  });

});
