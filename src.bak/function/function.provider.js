angular.module('dyngo.functions', [])

  .provider('dgFunctionProvider', function () {
    var instance = {functions: []};

    instance.registerFunction = function (name, func) {
      instance.functions.push(name);
      instance[name] = func;
    };

    instance.get = function (name) {
      return instance[name] || angular.noop;
    };

    var attachFunctionsToScope = function (scope) {
      angular.forEach(instance.functions, function (funcName) {
        if (angular.isUndefined(scope[funcName])) {
          scope[funcName] = instance[funcName];
        }
      });
    };

    instance.executeFunctions = function (scope, component, data) {
      attachFunctionsToScope(scope);
      angular.forEach(component.functions, function (f) {
        scope.$eval(f, data);
      });
    };

    // Default functions
    var round = function (value, precision) {
      var p = Math.pow(10, angular.isDefined(precision) ? precision : 2);
      return Math.round(value * p) / p;
    };

    return {
      $get: function init() {
        instance.registerFunction('round', round);
        return instance;
      }
    };
  });

