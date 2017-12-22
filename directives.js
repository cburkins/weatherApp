
// DIRECTIVES
weatherApp.directive("weatherReport", function() {
	return {
		restrict: 'E', 
		templateUrl: 'directives/weatherReport.html',
		replace: true, 
		scope: {
			// Poke holes in the scope
			// = means a two-way binding, or that entire object is passed in
			weatherDay: "=", 
			// & means passing in a function
			convertToStandard: "&", 
			convertToDate: "&", 
			// @ means one-way binding, or interpolated string
			// left side is the name of variable inside Angular, right side is name in HTML (normalized)
			dateFormatArg2: "@dateFormat",
			// Lef side is the name of the variable inside Angular, right side is defaulted to same since it's just @
			dateLabel: "@",
			dateFooter: "@" 
		}
	}

})