/// <reference path="typings/loreJS/lorejs.d.ts" />


module lorejs.angularjs.directives
{

	interface IDirectiveScope extends ng.IScope
	{
		logEnabled: boolean;

		log(msg: string): void;
	}

	/** An attribute directive that prompts the user with the value of the attribute, and if the user clicks OK on that prompt, proceeds to execute the ng-click directive. The ng-click directive is not executed if the user cancels the prompt. */
	var loreConfirmClick = function (): ng.IDirective
	{
		var d: ng.IDirective = {
			compile: function (element: ng.IAugmentedJQuery, attr: ng.IAttributes)
			{
				var confirmMessage = attr["loreConfirmClick"];
				var clickAction = attr["ngClick"];
				delete attr["ngClick"];

				return function (scope: ng.IScope, element: ng.IAugmentedJQuery, attr: ng.IAttributes, controller: any, transclude: ng.ITranscludeFunction)
				{
					element.bind("click", function ()
					{
						if (confirm(confirmMessage))
						{
							scope.$apply(function ()
							{
								scope.$eval(clickAction);
							});
						}
					});
				};
			}
		};

		return d;
	};
	lorejs.angularjs.directivesModule.directive("loreConfirmClick", loreConfirmClick);






	/** Attribute directive. Sets the focus on the element that the directive is attached to. Optionally, the value of the attribute can be an expression that is evaluated, and the focus is set on the element only if the expression evaluates to 'true'. If no expression is given, the focus is always set on the element. */
	var loreFocus = function (): ng.IDirective
	{
		return {
			restrict: "A",
			link: function (scope: ng.IScope, element: ng.IAugmentedJQuery, attr: ng.IAttributes)
			{
				var focus = true;
				var expression = attr["loreFocus"];
				if (expression) focus = scope.$eval(expression);

				if (focus)
				{
					element.ready(function ()
					{
						element.focus();
					});
				}
			}
		};
	};
	lorejs.angularjs.directivesModule.directive("loreFocus", loreFocus);






	/** Returns 'true' if the given input is a Date object. */
	function isDate(input: any): boolean
	{
		return input && input.getDate && !isNaN(input.valueOf());
	}

	/** Formats the given input Date to a ISO string including both date and time. */
	function formatDateToISODateTimeString(input: Date): string
	{
		var output: string;
		if (input && input.getDate && !isNaN(input.valueOf()))
		{
			output = input.toLocalISOString();
		}

		return output;
	}

	/** Formats the given input (Date object) to a string formatted as 'yyyy-MM-dd' */
	function formatDateToISODateString(input: Date): string
	{
		var output: string;

		if (input)
		{
			var yyyy = ("0000" + input.getFullYear()).right(4);
			var MM = ("00" + (input.getMonth() + 1)).right(2);
			var dd = ("00" + input.getDate()).right(2);

			return "{0}-{1}-{2}".format(yyyy, MM, dd);
		}

		return output;
	}

	/** Formats the given input string to lower case. */
	function formatStringToLower(input: string): string
	{
		return input ? (input + "").toLowerCase() : input;
	}

	function createTimeString(hours: number, minutes: number, seconds?: number, milliseconds?: number): string
	{
		var output: string = ("00" + hours).right(2) + ":" + ("00" + minutes).right(2);
		if (!seconds) output = output + ":" + ("00" + seconds).right(2);
		if (!milliseconds) output = output + "." + ("000" + milliseconds).right(3);

		return output;
	}

}