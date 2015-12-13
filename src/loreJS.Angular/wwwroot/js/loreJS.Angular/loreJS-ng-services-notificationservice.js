var lorejs;
(function (lorejs) {
    var angularjs;
    (function (angularjs) {
        var services;
        (function (services) {
            var NotificationService = (function () {
                function NotificationService() {
                }
                NotificationService.prototype.startLoading = function (scope) {
                };
                NotificationService.prototype.endLoading = function (scope) {
                };
                NotificationService.prototype.error = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                };
                NotificationService.prototype.information = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                };
                NotificationService.prototype.success = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                };
                NotificationService.prototype.warning = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                };
                return NotificationService;
            })();
            var loreNotificationService = function () {
                return new NotificationService();
            };
        })(services = angularjs.services || (angularjs.services = {}));
    })(angularjs = lorejs.angularjs || (lorejs.angularjs = {}));
})(lorejs || (lorejs = {}));
//# sourceMappingURL=loreJS-ng-services-notificationservice.js.map