'use strict';
app.controller('FrontPageController', function($scope, identity, auth, notifier, $location){
	$scope.identity = identity;
	$("body").css("height", $(document).height());
	$("#left-window img").hover(function(){
		$(this).css("display", "none");
		$(".text-we").css("display", "block");
	});
	$(".text-we").mouseleave(function(){$(this).css("display", "none");
		$("#left-window img").css("display", "block");
	});

	$scope.login = function(user){
        auth.login(user).then(function(success){
            if(success){
                notifier.success('Successful login!');
                $location.path('/home');
            }
            else{
                notifier.error('Incorrect Username or Password!');
            }
        });
    };
});