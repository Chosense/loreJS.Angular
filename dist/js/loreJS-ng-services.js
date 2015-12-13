/// <reference path="typings/loreJS/lorejs.d.ts" />
var lorejs;
(function (lorejs) {
    var angularjs;
    (function (angularjs) {
        var services;
        (function (services) {
            var ODataQueryService = (function () {
                function ODataQueryService(http, timeout) {
                    this.httpSrv = http;
                    this.timeoutSrv = timeout;
                }
                ODataQueryService.prototype.register = function (scope) {
                    if (!scope.query)
                        scope.query = lorejs.odata.queryOptions();
                    scope.query.inlineTotalCount = true;
                    if (!scope.query.skip)
                        scope.query.skip = 0;
                    if (!scope.query.top)
                        scope.query.top = 20;
                    scope.hasNextPage = false;
                    scope.hasPreviousPage = false;
                    var http = this.httpSrv;
                    var timeout = this.timeoutSrv;
                    scope.load = function () {
                        scope.isLoading = true;
                        var url = scope.buildUrl(scope.query);
                        scope.data = [];
                        http.get(url)
                            .success(function (result) {
                            if (result && result.Items && result.Items.length) {
                                scope.data = result.Items;
                            }
                            scope.itemCount = result.Count;
                            scope.hasNextPage = scope.query.skip + scope.query.top < scope.itemCount;
                            scope.hasPreviousPage = scope.query.skip > 0;
                        })
                            .finally(function () {
                            scope.isLoading = false;
                        });
                    };
                    scope.nextPage = function () {
                        scope.query.skip += scope.query.top;
                    };
                    scope.previousPage = function () {
                        scope.query.skip -= scope.query.top;
                        if (scope.query.skip < 0)
                            scope.query.skip = 0;
                    };
                    var timeoutHandle;
                    this["lore-watcher"] = scope.$watchCollection("[query, query.skip, query.top, query.select, query.expand, query.filter, query.orderBy, query.inlineTotalCount]", function () {
                        // Ensure that skip and top are numbers. Some data binding can set them to strings, which causes unwanted behaviour.
                        scope.query.skip = scope.query.skip * 1;
                        scope.query.top = scope.query.top * 1;
                        if (timeoutHandle != undefined)
                            timeout.cancel(timeoutHandle);
                        timeoutHandle = timeout(function () {
                            scope.load();
                        }, 300);
                    });
                    scope["lore-destroyer"] = scope.$on("$destroy", function (e) {
                        var args = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            args[_i - 1] = arguments[_i];
                        }
                        // Listen for the event that is fired when the scope is destroyed, and deactivate any handles that have been registered for the scope.
                        scope["lore-watcher"]();
                        scope["lore-destroyer"]();
                    });
                };
                return ODataQueryService;
            })();
            var FileUploadService = (function () {
                function FileUploadService(http, q) {
                    this.httpSrv = http;
                    this.qSrv = q;
                }
                FileUploadService.prototype.upload = function (url) {
                    var files = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        files[_i - 1] = arguments[_i];
                    }
                    var promiseArr = [];
                    if (files && files.length) {
                        for (var i = 0; i < files.length; i++) {
                            var promise = this.uploadFile(url, files[i]);
                            if (promise)
                                promiseArr.push(promise);
                        }
                    }
                    return this.qSrv.all(promiseArr);
                };
                FileUploadService.prototype.uploadFile = function (url, file) {
                    var fd = new FormData();
                    fd.append("file", file);
                    return this.httpSrv.post(url, fd, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    });
                };
                return FileUploadService;
            })();
            var odataQueryServiceFactory = function (http, timeout) {
                var s = new ODataQueryService(http, timeout);
                return s;
            };
            odataQueryServiceFactory.$inject = ["$http", "$timeout"];
            lorejs.angularjs.servicesModule.service("loreOdataQueryService", odataQueryServiceFactory);
            var fileUploadServiceFactory = function (http, q) {
                var s = new FileUploadService(http, q);
                return s;
            };
            fileUploadServiceFactory.$inject = ["$http", "$q"];
            lorejs.angularjs.servicesModule.service("loreFileUploadService", fileUploadServiceFactory);
        })(services = angularjs.services || (angularjs.services = {}));
    })(angularjs = lorejs.angularjs || (lorejs.angularjs = {}));
})(lorejs || (lorejs = {}));
//# sourceMappingURL=loreJS-ng-services.js.map