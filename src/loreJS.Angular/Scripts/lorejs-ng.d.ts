
declare module lorejs.angularjs
{

	/** Extends the angular scope interface with some basic properties and methods shared by all other scopes in loreJS.Angular. */
	interface IScope extends ng.IScope
	{
		/** Specifies whether the 'load()' method is loading its data. */
		isLoading: boolean;

		/** When invoked, loads the data held in the scope and stores it in the 'data' property. This method is also responsible for setting and clearing the 'isLoading' property. */
		load(): void;

		/** The data held by the scope instance. */
		data: any;
	}

	/** Defines the interface for a scope that holds an array of items in its 'data' property. */
	interface IArrayScope extends IScope
	{
		data: any[];
	}

	/** Defines the interface for a scope that queries an API controller using the OData protocol. */
	interface IODataQueryScope extends IArrayScope
	{

		/** The query options to use when querying the API controller for data. */
		query: lorejs.odata.IQueryOptions;

		/** The total number of items that match the options defined in 'query'. */
		itemCount: number;

		/** Returns 'true' if the currently viewed page of items is not the last page. */
		hasNextPage: boolean;

		/** Returns 'true' if the currently viewed page of items is not the first page. */
		hasPreviousPage: boolean;

		/** Returns the URL that is used to query the API controller for data. The returned URL must include the options specified in 'query'. Use the 'buildUrl' method of the given 'query' instance to build the URL. */
		buildUrl(query: lorejs.odata.IQueryOptions): string;

		/** Navigates to the next page of result items. */
		nextPage(): void;

		/** Navigates to the previous page of result items. */
		previousPage(): void;

	}

	/** Defines the service that assists controllers that use the 'IODataQueryScope' scope to query an API controller for data. */
	interface IODataQueryService
	{

		/** Registers the scope with the query service. */
		register(scope: IODataQueryScope): void;

	}

	/** Defines the inteface for a service that handles file uploads using AJAX. */
	interface IFileUploadService
	{

		/** Uploads the given files to the specified URL. Files are uploaded one at a time making it simpler on the server side to handle. */
		upload(url: string, ...files: File[]): ng.IPromise<any>;

	}

	/** Defines the service that works against a storage, such as local storage and session storage. */
	interface IStorageService
	{
		/** Returns the named value from the storage. */
		getValue(propertyName: string): any;

		/** Sets the named value in the storage. The optional event name is the name of the event that is fired on the root scope in case the value of the property changes. */
		setValue(propertyName: string, value?: any, changedEventName?: string): void;

	}

	/** Defines the interface implemented by the imRouteManager service. */
	interface IRouteManagerService
	{
		/** Returns true if the route manager has at least one history item to go back to. */
		canGoBack: boolean;

		/** Takes the last history entry from the history, and loads that route. The item is also removed from the history entries. */
		goBack(): void;

		/** Navigates to the route with the given name. If the specified route defines any parameters, the values are obtained from the given params object. */
		goTo(routeName: string, params?: any, clearHistory?: boolean, skipHistory?: boolean): void;

		/** Returns the path for the route with the given name using the given set of optional parameters. */
		path(routeName: string, params?: any): string;
	}



	/**
	Defines the interface for a service that is used to send notifications to the UI with. For instance, a controller can send
	'Information saved' kind of messages or errors that occur during the saving.
	*/
	interface INotificationService
	{
		/** The timeout in milliseconds that toasts will be shown. The default is 3000 ms. */
		toastTimeout: number;

		/**
		Used by a controller to signal to the UI that it is loading data from the server. When loading completes, you must call the
		'endLoading' function. The scope parameter contains the scope of the controller that is doing the loading to keep track of
		all controllers that may be loading simultaneously.
		*/
		startLoading(scope: ng.IScope): void;

		/**
		Ends a loading operation.
		 */
		endLoading(scope: ng.IScope): void;

		/** Displays an error toast. */
		error(...args: any[]): void;

		/** Displays an information toast. */
		information(...args: any[]): void;

		/** Displays a success toast. */
		success(...args: any[]): void;

		/** Displays a warning toast. */
		warning(...args: any[]): void;
	}

	/** Defines the interface for one single toast. */
	interface IToast
	{
	}

	/** Defines the interface used by the loreGoRoute directive for specifying options for the directive. */
	export interface IGoRouteDirectiveOptions
	{
		/** The name of the route to navigate to. */
		name: string;

		/**
		 * The name of an attribute to write the route path to. If this field is set, the route path is written to
		 * the given attribute instead of navigating to that route when the element that the directive is attached
		 * to is clicked.
		 */
		attr: string;

		/**
		 * If set to true, only the parameters from 'params' are included in the route navigate to. If set to false 
		 * (default), all parameters from the current route are included (if applicable) in the target route.
		 */
		cleanRoute: boolean;

		/**
		 * If set to true, clears the history recorded by the route manager service.
		 */
		clearHistory: boolean;

		/** If set to true, instructs the route manager to skip the history entiry for the current directive. */
		skipHistory: boolean;

		/**
		 * An object that defines parameters for the route to navigate to. If they exist in the current route, 
		 * they are replaced with the values specified in this object.
		 */
		params?: any;
	}

}