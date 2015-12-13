var lorejs;
(function (lorejs) {
    var angularjs;
    (function (angularjs) {
        var directives;
        (function (directives) {
            var loreGoRoute = function (route, routeParams, routeMan) {
                return {
                    link: function (scope, element, attr, ctrl) {
                        var oStr = attr["loreGoRoute"];
                        var options = scope.$eval(oStr);
                        var getParams = function () {
                            var targetParams = {};
                            if (!options.cleanRoute) {
                                for (key in routeParams)
                                    targetParams[key] = routeParams[key];
                            }
                            if (options.params) {
                                for (var key in options.params) {
                                    targetParams[key] = options.params[key];
                                }
                            }
                            return targetParams;
                        };
                        element.click(function (e) {
                            var pSet = getParams();
                            routeMan.goTo(options.name, pSet, options.clearHistory, options.skipHistory);
                        });
                        if (options.attr) {
                            var pSet = getParams();
                            var path = routeMan.path(options.name, pSet);
                            element.attr(options.attr, path);
                        }
                    },
                    replace: false,
                    restrict: "A",
                    scope: true
                };
            };
            loreGoRoute.$inject = ["$route", "$routeParams", "loreRouteManager"];
            lorejs.angularjs.directivesModule.directive("loreGoRoute", loreGoRoute);
        })(directives = angularjs.directives || (angularjs.directives = {}));
    })(angularjs = lorejs.angularjs || (lorejs.angularjs = {}));
})(lorejs || (lorejs = {}));
//# sourceMappingURL=loreJS-ng-directives-loregoroute.js.map