$(document).ready(function () {





var debounceFunction = (function() {
	var	interval = 10,
		timer;

	return function() {
		clearTimeout(timer);
		timer = setTimeout(function() {

			function isScrolledIntoView(element) {
				// I originally set the markerWindow to be at 50% of the window height, positioned in the center of the window (0.25, 0.75). This worked when the colour transitions were 'colorA, white, colorB', however this caused issues when the transition were changed to 'colorA, colorB, colorC'. There would be a position where the elementCenter would not be within the detection area resulting in no color, or white. I've left the multipliers as a reminder.
				var	markerWindowTop = window.innerHeight*0,
					markerWindowBottom = window.innerHeight*1,
					elementCenterVertical = ($(element).offset().top + $(element).outerHeight()/2) - ($(window).scrollTop());

				// Code that I used to confirm the output of each variable
				// console.log(elementCenterVertical);
				// console.log( (elementCenterVertical >= markerWindowTop) );
				// console.log( (elementCenterVertical <= markerWindowBottom) );
				// console.log( (elementCenterVertical >= markerWindowTop) && (elementCenterVertical <= markerWindowBottom) );

				return ((elementCenterVertical >= markerWindowTop) && (elementCenterVertical <= markerWindowBottom));
			}

				// Code that I used to confirm the output of each variable
				// console.log( 'markerTop is ' + window.innerHeight*0.25 );
				// console.log( 'markerBottom is ' + window.innerHeight*0.75 );
				// console.log( 'Scroll dist from top is ' + $(window).scrollTop() );
				// console.log( 'The distance of #3 is ' + ( ($('#section__3').offset().top) + ($('#section__3').outerHeight()/2) - ($(window).scrollTop()) ) + ' from the top of the window' );


			if (isScrolledIntoView($('#section__1')) === true) {
				$('.section__block').addClass('background__color--blue');
			} else {
				$('.section__block').removeClass('background__color--blue');
			};

			if (isScrolledIntoView($('#section__2')) === true) {
				$('.section__block').addClass('background__color--pink');
			} else {
				$('.section__block').removeClass('background__color--pink');
			};

			if (isScrolledIntoView($('#section__3')) === true) {
				$('.section__block').addClass('background__color--yellow');
			} else {
				$('.section__block').removeClass('background__color--yellow');
			};

		}, interval);
	};
})();

window.addEventListener('scroll', debounceFunction);




// This was the code used for the first version where I had a separate div element as a fixed background. In the second version I set the background of all the sections to change color which made the code below unnecessary.
// var background = $('#background');

// function resizeBackgroundForTouchDevice() {
// 	background.height( screen.height + 100 );
// }

// $(window).resize(resizeBackgroundForTouchDevice);
// resizeBackgroundForTouchDevice();






});