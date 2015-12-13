
module lorejs.angularjs.services
{

	class NotificationService implements INotificationService
	{
		toastTimeout: number;

		startLoading(scope: ng.IScope): void
		{
		}

		endLoading(scope: ng.IScope): void
		{
		}

		error(...args: any[]): void
		{
		}

		information(...args: any[]): void
		{
		}

		success(...args: any[]): void
		{
		}

		warning(...args: any[]): void
		{
		}
	}

	var loreNotificationService = function (): INotificationService
	{
		return new NotificationService();
	};

	// The notification service is not yet complete, so we don't add it to the service module.
	//lorejs.angularjs.servicesModule.service("loreNotificationService", loreNotificationService);
}