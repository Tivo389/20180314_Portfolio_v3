$(document).ready(function () {





var debounceFunction = (function() {
	var	interval = 10,
		timer;

	return function() {
		clearTimeout(timer);
		timer = setTimeout(function() {

			function isScrolledIntoView(element) {
				var	markerWindowTop = window.innerHeight*0.25,
					markerWindowBottom = window.innerHeight*0.75,				
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

			$('.image__frame').each(function() {

				if (isScrolledIntoView(this) === true) {
				// I added the '===true' for clarity, it works without it.

					$(this).addClass('image__frame--active');
				} else {
					$(this).removeClass('image__frame--active');
				}
			});

		}, interval);
	};
})();

window.addEventListener('scroll', debounceFunction);





});