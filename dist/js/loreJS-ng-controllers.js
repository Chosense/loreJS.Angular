var lorejs;
(function (lorejs) {
    var angularjs;
    (function (angularjs) {
        var controllers;
        (function (controllers) {
            /** An empty controller that can be used for simple scenarios where you only need a controller to wrap a piece of UI in a controller. */
            var loreEmptyController = function (scope) {
            };
            loreEmptyController.$inject = ["$scope"];
            lorejs.angularjs.controllersModule.controller("loreEmptyController", loreEmptyController);
        })(controllers = angularjs.controllers || (angularjs.controllers = {}));
    })(angularjs = lorejs.angularjs || (lorejs.angularjs = {}));
})(lorejs || (lorejs = {}));
//# sourceMappingURL=loreJS-ng-controllers.js.map