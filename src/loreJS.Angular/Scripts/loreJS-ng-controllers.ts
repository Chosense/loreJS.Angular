
module lorejs.angularjs.controllers
{

	/** An empty controller that can be used for simple scenarios where you only need a controller to wrap a piece of UI in a controller. */
	var loreEmptyController = function (scope: ng.IScope)
	{
	}
	loreEmptyController.$inject = ["$scope"];
	lorejs.angularjs.controllersModule.controller("loreEmptyController", loreEmptyController);
}