'use strict';
app.controller('FrontPageController', function($scope, $rootScope, identity, auth, notifier, $location, OpinionService){
	$scope.identity = identity;
	$("body").css("height", $(document).height());
	$("#left-window img").hover(function(){
		$(this).css("display", "none");
		$(".text-we").css("display", "block");
	});
	$(".text-we").mouseleave(function(){$(this).css("display", "none");
		$("#left-window img").css("display", "block");
	});
	$("#lgn-email").on('keydown', function(e){
		var keyCode = e.keyCode || e.which;
		if(keyCode == 9){
			//$('#lgn-password')[0].focus();
		}
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
    $scope.signup = function(user){
        if(user.password != user.password2){
            notifier.error('Въвели сте 2 различни пароли!');
            return;
        }
        user.birthDate = user.day.value + '/' + user.month.value + "/" + user.year.value;
        console.log(user.Sex);
        console.log(user);
        auth.signup(user).then(function(){
            notifier.success('Успешна регистрация!');
            $location.path('/home');
        })
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    $scope.user = {};
    $scope.optionsYear = [];
    for(var i=0;i<100;i++){
        var obj = {};
        obj.label = yyyy - i;
        obj.value = yyyy - i;
        $scope.optionsYear.push(obj); 
    }
    $scope.user.year = $scope.optionsYear[0];

    $scope.optionsDay = [];
    for(var i=1;i<=31;i++){
        var obj = {};
        obj.label = i;
        obj.value = i;
        $scope.optionsDay.push(obj); 
    }
    $scope.user.day = $scope.optionsDay[0];

    $scope.optionsMonth = [];
    for(var i = 1;i<=12;i++){
        var obj = {};
        obj.label = i;
        obj.value = i;
        $scope.optionsMonth.push(obj);
    }
    $scope.user.month = $scope.optionsMonth[0];
    
    /*jQuery(document).ready(function($) {
		$('#banner-fade').bjqs({
			'height' : 320,
			'width' : 620,
			'responsive' : true,
			"animduration ": 200,
			"animspeed ": 1000,
			'automatic ': true
		});
	});*/
});