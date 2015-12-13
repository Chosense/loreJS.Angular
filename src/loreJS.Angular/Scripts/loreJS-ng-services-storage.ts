
module lorejs.angularjs.services
{
	/**
	 * A base class for a storage service that can use either 'window.localStorage' or
	 * 'window.sessionStorage' as storage.
	 */
	export class StorageService implements IStorageService
	{
		constructor(root: ng.IRootScopeService, store: Storage)
		{
			this.Root = root;
			this.Store = store;
		}

		private Root: ng.IRootScopeService;
		private Store: Storage;

		getValue(propertyName: string): any
		{
			if (this.Store)
			{
				var s: string = this.Store.getItem(propertyName);
				if (s)
				{
					return JSON.parse(s);
				}
			}
			return undefined;
		}

		setValue(propertyName: string, value?: any, changedEventName?: string): void
		{
			var current = this.getValue(propertyName);
			if (this.Store)
			{
				if (value)
				{
					var s = JSON.stringify(value);
					this.Store.setItem(propertyName, s);
				}
				else
				{
					this.Store.removeItem(propertyName);
				}

				if (changedEventName && current != value)
				{
					this.Root.$emit(changedEventName, value);
				}
			}
		}

	}



	var loreSessionStorageServiceFactory = function (root: ng.IRootScopeService) : IStorageService
	{
		return new StorageService(root, window.sessionStorage);
	};
	loreSessionStorageServiceFactory.$inject = ["$rootScope"];
	lorejs.angularjs.servicesModule.service("loreSessionStorageService", loreSessionStorageServiceFactory);


	var loreLocalStorageServiceFactory = function (root: ng.IRootScopeService): IStorageService
	{
		return new StorageService(root, window.localStorage);
	};
	loreLocalStorageServiceFactory.$inject = ["$rootScope"];
	lorejs.angularjs.servicesModule.service("loreLocalStorageService", loreLocalStorageServiceFactory);

}