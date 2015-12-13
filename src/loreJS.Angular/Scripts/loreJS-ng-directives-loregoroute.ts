
module lorejs.angularjs.directives
{
	var loreGoRoute = function (route: ng.route.IRouteService, routeParams: ng.route.IRouteParamsService, routeMan: IRouteManagerService): ng.IDirective
	{
		return {
			link: function (scope: ng.IScope, element: ng.IAugmentedJQuery, attr: ng.IAttributes, ctrl: ng.INgModelController)
			{
				var oStr = attr["loreGoRoute"];
				var options: IGoRouteDirectiveOptions = scope.$eval(oStr);

				var getParams = function (): any
				{
					var targetParams: any = {};

					if (!options.cleanRoute)
					{
						for (key in routeParams) targetParams[key] = routeParams[key];
					}

					if (options.params)
					{
						for (var key in options.params)
						{
							targetParams[key] = options.params[key];
						}
					}

					return targetParams;
				};

				element.click(function (e: JQueryEventObject)
				{
					var pSet = getParams();

					routeMan.goTo(options.name, pSet, options.clearHistory, options.skipHistory);
				});

				if (options.attr)
				{
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
}