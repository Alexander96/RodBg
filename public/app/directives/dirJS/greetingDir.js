app.directive("greeting", function(){
	return {
		templateUrl: '/partials/directives/greeting',
		restrict: 'C',
		replace: true,
		controller: 'GreetingController'
	}
})