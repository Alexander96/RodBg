app.controller('GreetingController', function($scope, $timeout, identity){
	$scope.identity = identity;
	$scope.title = 'musaka';
	function openGreeting(){
		$('.gr-dialog').css({
			display:'block',
			top: $(document).height()/1.2 - $('.gr-dialog').height() + 'px'
		});
		$('.gr-overlay').css({
			display:'block'
		})
	}
	function closeGreeting(){
		$('.gr-overlay').css({
			display:'none'
		})
		$('.gr-dialog').css({
			display: 'none',
			top:"200px"
		})
	}
	$('.gr-overlay').click(closeGreeting);
	$('.gr-close').click(closeGreeting);
	$scope.openGreeting = openGreeting;
	$scope.closeGreeting = closeGreeting;

	$scope.openGreeting();
});