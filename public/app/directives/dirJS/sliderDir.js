app.directive('slides', function () {
  return {
  	templateUrl: "/partials/directives/slides",
  	restrict: "C",
  	scope: {
  		opinions: '=data'
  	},
  	controller: 'SlidesController',
  	replace: true,
    link: function (scope, element, attrs) {
      element.slidesjs({
        width: 940,
        height: 528,
        navigation: {
          active: false, //doesnt add previous and next button
          effect: "fade"
        },
        play: {
      		active: true,
      		effect: "fade",
      		interval: 7000,
        // [number] Time spent on each slide in milliseconds.
      		auto: true,
        // [boolean] Start playing the slideshow on load.
      		swap: true,
        // [boolean] show/hide stop and play buttons
      		pauseOnHover: false,
        // [boolean] pause a playing slideshow on hover
      		restartDelay: 1000
        // [number] restart delay on inactive slideshow
    	},
    	effect: {
      		slide: {
        // Slide effect settings.
        		speed: 400
          // [number] Speed in milliseconds of the slide animation.
      		},
          fade: {
            speed: 700
          }
    	}
      });
    }
   }
});