app.controller("NewDogController", function($scope, identity, FileReaderAng, DogService){
	$( "#date-picker" ).datepicker();
	var userId = (!!identity.currentUser)? identity.currentUser._id: "no-user";
	var profPhoto = {};
	var data;
	var contentType;

	$scope.getFile = function () {
        $scope.progress = 0;
        FileReaderAng.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          data = result.slice(result.indexOf(",") +1, result.length);
                          contentType = result.slice(result.indexOf(":") + 1, result.indexOf(";base64"))
                      });
    };
    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });

    $scope.addDog = function(dog){
    	profPhoto.data = data;
    	profPhoto.contentType = contentType;
    	dog.profPhoto = profPhoto;
    	DogService.createDog(dog).then(function(success){if(success)console.log("success?");});
    }
});