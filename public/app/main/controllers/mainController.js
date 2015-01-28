'use strict';
app.controller('MainController', function($scope, identity, auth, notifier, $location){
	$("body").css("height", $(document).height());
	$scope.signout = function(){
        auth.logout().then(function(){
            notifier.success('Successfully logout!');
            if($scope.user){
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
            location.reload();
        });
    }
});