$(document).ready(function () {





var debounceFunction = (function() {
	var	interval = 5,
		timer;

	return function() {
		clearTimeout(timer);
		timer = setTimeout(function() {

			function isScrolledIntoView(element) {
						// The activation Line has been set to the bottom of the window.
				var	activationLine = window.innerHeight,
						// The Marker has been adjusted to be at the bottom of each element.
						activationMarker = ($(element).offset().top + $(element).outerHeight()) - ($(window).scrollTop());
				// Code that I used to confirm the output of each variable 
					// console.log("activationLine is at " + activationLine);
					// console.log("activationMarker is at " + activationMarker);
					// console.log(activationLine >= activationMarker);
				return (activationLine >= activationMarker);
			}

			$('.eiffel__section').each(function() {
				// I added the '===true' for clarity, it works without it.
				if (isScrolledIntoView(this) === true) {
					$(this).find('.eiffel__image').addClass('activated');
					} else {
					$(this).find('.eiffel__image').removeClass('activated');					
				}
			});

		}, interval);
	};
})();

window.addEventListener('scroll', debounceFunction);





});