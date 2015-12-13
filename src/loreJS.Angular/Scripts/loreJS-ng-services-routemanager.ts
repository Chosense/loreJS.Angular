
module lorejs.angularjs.services
{
	interface IRouteHistoryEntry
	{
		name: string;

		params?: any;
	}

	class RouteManagerService implements IRouteManagerService
	{
		constructor(route: ng.route.IRouteService, routeParams: ng.route.IRouteParamsService)
		{
			this.route = route;
			this.routeParams = routeParams;
		}

		private route: ng.route.IRouteService;
		private routeParams: ng.route.IRouteParamsService;
		private historyEntries: IRouteHistoryEntry[] = [];

		get canGoBack(): boolean
		{
			return this.historyEntries && this.historyEntries.length > 0;
		}

		goBack(): void
		{
			if (this.historyEntries && this.historyEntries.length > 0)
			{
				var entry = this.historyEntries.pop();
				this.goTo(entry.name, entry.params, false, true);
			}
		}

		goTo(routeName: string, params?: any, clearHistory?: boolean, skipHistory?: boolean): void
		{
			if (clearHistory)
			{
				this.historyEntries = [];
			}

			if (!skipHistory)
			{
				this.historyEntries.push({
					name: this.route.current.name,
					params: this.copyObj(this.routeParams)
				});
			}

			var path = this.path(routeName, params);
			if (path)
			{
				this.navigate(path);
			}
		}

		path(routeName: string, params?: any): string
		{
			var pSet = this.copyObj(params);
			var r = this.findRoute(routeName);
			var path: string;

			if (r)
			{
				path = "/#" + this.parsePath(r["originalPath"], pSet);
			}
			else
			{
				console.error("A route with the name '{0}' was not found.".format(routeName));
			}

			return path;
		}



		private copyObj(input: any): any
		{

			if (input)
			{
				var output = {}
				for (var key in input)
				{
					output[key] = input[key];
				}
				return output;
			}

			return undefined;
		}

		private findRoute(name: string): ng.route.IRoute
		{
			for (var key in this.route.routes)
			{
				var r: ng.route.IRoute = this.route.routes[key];
				if (r && r.name == name) return r;
			}

			return undefined;
		}

		private navigate(url: string)
		{
			setTimeout(function ()
			{
				window.location.href = url;
			}, 100);
		}

		private parsePath(input: string, params: any): string
		{
			if (!input) return "";

			var output: string = input;

			if (params)
			{
				for (var key in params)
				{
					var val = encodeURIComponent(params[key]);
					var pattern = "\\:" + key + "\\??";

					var matches = output.match(pattern);
					if (matches && matches.length)
					{
						for (var i = 0; i < matches.length; i++)
						{
							var m = matches[i];
							output = output.replace(m, val);
						}
					}
				}
			}

			// Now we need to clear any parameter placeholder that was not populated with values from the params object
			output = output.replace(/\:\w+\??/g, "");
			return output;
		}
	}

	var loreRouteManager = function (route: ng.route.IRouteService, routeParams: ng.route.IRouteParamsService): IRouteManagerService
	{
		return new RouteManagerService(route, routeParams);
	}
	loreRouteManager.$inject = ["$route", "$routeParams"];
	lorejs.angularjs.servicesModule.service("loreRouteManager", loreRouteManager);

}