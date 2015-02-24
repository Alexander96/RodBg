app.controller("SlidesController", function($scope, OpinionService){

    OpinionService.getAllOpinions().then(function(data){
    	$scope.opinions = data;
    	console.log($scope.opinions);
    });
})