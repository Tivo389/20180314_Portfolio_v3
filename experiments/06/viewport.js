$(document).ready(function() {

/* VERSION 1 [SUCCESS] Works with a single specific element */
// var debounceFunction = (function() {
// 	var	interval = 250,
// 		timer;
// 	return function() {
// 		clearTimeout(timer);
// 		timer = setTimeout(function() {
// 			var 	box02Center = ($('.box--02').offset().top  +  $('.box--02').outerHeight()/2),
// 				markerTop = $('.threshold__marker').offset().top,				
// 				markerBottom = ($('.threshold__marker').offset().top  +  $('.threshold__marker').outerHeight());
// 			if ((box02Center <= markerBottom) && (box02Center >= markerTop))console.log('Center is inside Marker')
// 				else console.log('Center is outside of Marker');
// 		}, interval);
// 	};
// })(); /* The () is an 'Immediately-Invoked Function Expression' (IIFE) that executes the function right after it created. Also this is a 'function expression' not a 'function declaration'. */
// window.addEventListener('scroll', debounceFunction);

// /* VERSION 2 [FAIL] Only works with the first elemenet with the specified class */
// var debounceFunction = (function() {
// 	var	interval = 500,
// 		timer;
// 	return function() {
// 		clearTimeout(timer);
// 		timer = setTimeout(function() {
// 			var 	markerTop = $('.threshold__marker').offset().top,
// 				markerBottom = ($('.threshold__marker').offset().top  +  $('.threshold__marker').outerHeight()),
// 				ping = $('.ping--box'),
// 				pingCenter = (ping.offset().top  +  ping.outerHeight()/2),
// 				isWithinMarker = (function() {
// 					return ((pingCenter <= markerBottom) && (pingCenter >= markerTop));
// 				});
// 			$('.ping--box').each(function() {
// 				if (isWithinMarker(this)) {
// 					console.log('INSIDE!');
// 				} else {
// 					console.log('OUTSIDE!');
// 				}
// 			}); 
// 		}, interval);
// 	};
// })();
// window.addEventListener('scroll', debounceFunction);

// /* VERSION 2.1 [SUCCESS] non-debounce Version. Works with all elements with the specified class. */
// function isScrolledIntoView(element) {
// 	var	markerTop = $('.threshold__marker').offset().top,
// 		markerBottom = ($('.threshold__marker').offset().top  +  $('.threshold__marker').outerHeight()),
// 		pingCenter = ($(element).offset().top  +  $(element).outerHeight()/2);
// 	return ((pingCenter <= markerBottom) && (pingCenter >= markerTop));
// }
// $(window).on("scroll", function() {
// 	$('.ping--box').each(function() {
// 		if (isScrolledIntoView(this)) {
// 			$(this).addClass('red');
// 			console.log('ITS RED!');
// 		} else {
// 			$(this).removeClass('red');
// 			console.log('ITS NOT RED!');
// 		}
// 	});
// });

/* VERSION 2.2 [SUCCESS] debounce Version. Works with all elements with the specified class. */
var debounceFunction = (function() {
// This is not a 'declaration', its a variable that defines a 'function expression'

	var	interval = 50,
		timer;
	// Variables are defined here, the 'timer' is defines just to avoid a 'variable undefined'

	return function() {
	// It seems that without the return it won't get the function to run

		clearTimeout(timer);
		// This clears the time set with setTimeout 

		timer = setTimeout(function() {
		// The function below is placed within a 'setTimeout' so that the frequency of it is controlled. As with 'scroll' events it tends to listen constantly. 

			function isScrolledIntoView(element) {
			// This function is to determine whether the 'pingCenter' is within the declared parameters.
				
				var	markerTop = $('.threshold__marker').offset().top,
					markerBottom = ($('.threshold__marker').offset().top  +  $('.threshold__marker').outerHeight()),
					pingCenter = ($(element).offset().top  +  $(element).outerHeight()/2);
				// Variables are defined

				return ((pingCenter <= markerBottom) && (pingCenter >= markerTop));
				// This returns a true of false statement regarding the position of the 'pingCenter'
			}

			$('.ping--box').each(function() {
			// For 'each' element that has the class 'ping--box', the following function is run.

				if (isScrolledIntoView(this) === true) {
				// I added the '===true' for clarity, it works without it.

					$(this).addClass('red');
				} else {
					$(this).removeClass('red');
				}
			});

		}, interval);
		// The interval is declared in the variable.
	};
})();

window.addEventListener('scroll', debounceFunction);
// This is what keeps an eye on the events that take place; in this case, if a scroll event is detected, it runs the function 'debounceFunction'.

});