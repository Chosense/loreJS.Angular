var lorejs;
(function (lorejs) {
    var angularjs;
    (function (angularjs) {
        var services;
        (function (services) {
            var RouteManagerService = (function () {
                function RouteManagerService(route, routeParams) {
                    this.historyEntries = [];
                    this.route = route;
                    this.routeParams = routeParams;
                }
                Object.defineProperty(RouteManagerService.prototype, "canGoBack", {
                    get: function () {
                        return this.historyEntries && this.historyEntries.length > 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                RouteManagerService.prototype.goBack = function () {
                    if (this.historyEntries && this.historyEntries.length > 0) {
                        var entry = this.historyEntries.pop();
                        this.goTo(entry.name, entry.params, false, true);
                    }
                };
                RouteManagerService.prototype.goTo = function (routeName, params, clearHistory, skipHistory) {
                    if (clearHistory) {
                        this.historyEntries = [];
                    }
                    if (!skipHistory) {
                        this.historyEntries.push({
                            name: this.route.current.name,
                            params: this.copyObj(this.routeParams)
                        });
                    }
                    var path = this.path(routeName, params);
                    if (path) {
                        this.navigate(path);
                    }
                };
                RouteManagerService.prototype.path = function (routeName, params) {
                    var pSet = this.copyObj(params);
                    var r = this.findRoute(routeName);
                    var path;
                    if (r) {
                        path = "/#" + this.parsePath(r["originalPath"], pSet);
                    }
                    else {
                        console.error("A route with the name '{0}' was not found.".format(routeName));
                    }
                    return path;
                };
                RouteManagerService.prototype.copyObj = function (input) {
                    if (input) {
                        var output = {};
                        for (var key in input) {
                            output[key] = input[key];
                        }
                        return output;
                    }
                    return undefined;
                };
                RouteManagerService.prototype.findRoute = function (name) {
                    for (var key in this.route.routes) {
                        var r = this.route.routes[key];
                        if (r && r.name == name)
                            return r;
                    }
                    return undefined;
                };
                RouteManagerService.prototype.navigate = function (url) {
                    setTimeout(function () {
                        window.location.href = url;
                    }, 100);
                };
                RouteManagerService.prototype.parsePath = function (input, params) {
                    if (!input)
                        return "";
                    var output = input;
                    if (params) {
                        for (var key in params) {
                            var val = encodeURIComponent(params[key]);
                            var pattern = "\\:" + key + "\\??";
                            var matches = output.match(pattern);
                            if (matches && matches.length) {
                                for (var i = 0; i < matches.length; i++) {
                                    var m = matches[i];
                                    output = output.replace(m, val);
                                }
                            }
                        }
                    }
                    // Now we need to clear any parameter placeholder that was not populated with values from the params object
                    output = output.replace(/\:\w+\??/g, "");
                    return output;
                };
                return RouteManagerService;
            })();
            var loreRouteManager = function (route, routeParams) {
                return new RouteManagerService(route, routeParams);
            };
            loreRouteManager.$inject = ["$route", "$routeParams"];
            lorejs.angularjs.servicesModule.service("loreRouteManager", loreRouteManager);
        })(services = angularjs.services || (angularjs.services = {}));
    })(angularjs = lorejs.angularjs || (lorejs.angularjs = {}));
})(lorejs || (lorejs = {}));
//# sourceMappingURL=loreJS-ng-services-routemanager.js.map