var lorejs;
(function (lorejs) {
    var angularjs;
    (function (angularjs) {
        var services;
        (function (services) {
            /**
             * A base class for a storage service that can use either 'window.localStorage' or
             * 'window.sessionStorage' as storage.
             */
            var StorageService = (function () {
                function StorageService(root, store) {
                    this.Root = root;
                    this.Store = store;
                }
                StorageService.prototype.getValue = function (propertyName) {
                    if (this.Store) {
                        var s = this.Store.getItem(propertyName);
                        if (s) {
                            return JSON.parse(s);
                        }
                    }
                    return undefined;
                };
                StorageService.prototype.setValue = function (propertyName, value, changedEventName) {
                    var current = this.getValue(propertyName);
                    if (this.Store) {
                        if (value) {
                            var s = JSON.stringify(value);
                            this.Store.setItem(propertyName, s);
                        }
                        else {
                            this.Store.removeItem(propertyName);
                        }
                        if (changedEventName && current != value) {
                            this.Root.$emit(changedEventName, value);
                        }
                    }
                };
                return StorageService;
            })();
            services.StorageService = StorageService;
            var loreSessionStorageServiceFactory = function (root) {
                return new StorageService(root, window.sessionStorage);
            };
            loreSessionStorageServiceFactory.$inject = ["$rootScope"];
            lorejs.angularjs.servicesModule.service("loreSessionStorageService", loreSessionStorageServiceFactory);
            var loreLocalStorageServiceFactory = function (root) {
                return new StorageService(root, window.localStorage);
            };
            loreLocalStorageServiceFactory.$inject = ["$rootScope"];
            lorejs.angularjs.servicesModule.service("loreLocalStorageService", loreLocalStorageServiceFactory);
        })(services = angularjs.services || (angularjs.services = {}));
    })(angularjs = lorejs.angularjs || (lorejs.angularjs = {}));
})(lorejs || (lorejs = {}));
//# sourceMappingURL=loreJS-ng-services-storage.js.map