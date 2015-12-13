/// <reference path="typings/loreJS/lorejs.d.ts" />

module lorejs.angularjs.services
{
	class ODataQueryService implements IODataQueryService
	{
		constructor(http: ng.IHttpService, timeout: ng.ITimeoutService)
		{
			this.httpSrv = http;
			this.timeoutSrv = timeout;
		}

		private httpSrv: ng.IHttpService;
		private timeoutSrv: ng.ITimeoutService;

		register(scope: IODataQueryScope): void
		{
			if (!scope.query) scope.query = lorejs.odata.queryOptions();

			scope.query.inlineTotalCount = true;
			if(!scope.query.skip) scope.query.skip = 0;
			if(!scope.query.top) scope.query.top = 20;

			scope.hasNextPage = false;
			scope.hasPreviousPage = false;

			var http = this.httpSrv;
			var timeout = this.timeoutSrv;

			scope.load = function ()
			{
				scope.isLoading = true;

				var url = scope.buildUrl(scope.query);

				scope.data = [];
				http.get(url)
					.success(function (result: lorejs.odata.IQueryResult)
					{
						if (result && result.Items && result.Items.length)
						{
							scope.data = result.Items;
						}

						scope.itemCount = result.Count;

						scope.hasNextPage = scope.query.skip + scope.query.top < scope.itemCount;
						scope.hasPreviousPage = scope.query.skip > 0;
					})
					.finally(function ()
					{
						scope.isLoading = false;
					});
			};
			scope.nextPage = function ()
			{
				scope.query.skip += scope.query.top;
			};
			scope.previousPage = function ()
			{
				scope.query.skip -= scope.query.top;
				if (scope.query.skip < 0) scope.query.skip = 0;
			};

			var timeoutHandle: ng.IPromise<any>;
			this["lore-watcher"] = scope.$watchCollection("[query, query.skip, query.top, query.select, query.expand, query.filter, query.orderBy, query.inlineTotalCount]", function ()
			{
				// Ensure that skip and top are numbers. Some data binding can set them to strings, which causes unwanted behaviour.
				scope.query.skip = scope.query.skip * 1;
				scope.query.top = scope.query.top * 1;


				if (timeoutHandle != undefined) timeout.cancel(timeoutHandle);

				timeoutHandle = timeout(function ()
				{
					scope.load();
				}, 300);
			});

			scope["lore-destroyer"] = scope.$on("$destroy", function (e: ng.IAngularEvent, ...args: any[])
			{
				// Listen for the event that is fired when the scope is destroyed, and deactivate any handles that have been registered for the scope.
				scope["lore-watcher"]();
				scope["lore-destroyer"]();
			});
		}

	}


	class FileUploadService implements IFileUploadService
	{
		constructor(http: ng.IHttpService, q: ng.IQService)
		{
			this.httpSrv = http;
			this.qSrv = q;
		}

		private httpSrv: ng.IHttpService;
		private qSrv: ng.IQService;

		upload(url: string, ...files: File[]): ng.IPromise<any>
		{
			var promiseArr: ng.IPromise<any>[] = [];
			if (files && files.length)
			{
				for (var i = 0; i < files.length; i++)
				{
					var promise = this.uploadFile(url, files[i]);
					if (promise) promiseArr.push(promise);
				}
			}


			return this.qSrv.all(promiseArr);
		}

		private uploadFile(url: string, file: File): ng.IPromise<any>
		{
			var fd = new FormData();
			fd.append("file", file);

			return this.httpSrv.post(url, fd, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			});
		}
	}

	var odataQueryServiceFactory = function (http: ng.IHttpService, timeout: ng.ITimeoutService) : IODataQueryService
	{
		var s = new ODataQueryService(http, timeout);
		return s;
	};
	odataQueryServiceFactory.$inject = ["$http", "$timeout"];
	lorejs.angularjs.servicesModule.service("loreOdataQueryService", odataQueryServiceFactory);

	var fileUploadServiceFactory = function (http: ng.IHttpService, q: ng.IQService): IFileUploadService
	{
		var s = new FileUploadService(http, q);
		return s;
	};
	fileUploadServiceFactory.$inject = ["$http", "$q"];
	lorejs.angularjs.servicesModule.service("loreFileUploadService", fileUploadServiceFactory);

}