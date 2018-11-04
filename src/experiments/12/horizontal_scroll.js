// INITIALISE HEADER START
$(document).ready(function () {
// INITIALISE HEADER END

// MAIN FUNCTION BLOCK START
  var target = $('#content');
  $(window).scroll(function () {
    var documentHeight = $(document).height(),
        distanceScrolled = $(this).scrollTop(),
        windowHeight = $(this).height(),
        windowWidth = $(this).width(),
        targetWidth = (target.width() - windowWidth),
        scrollPercent = (distanceScrolled / (documentHeight - windowHeight));
    target.css({
        'left': ((targetWidth * scrollPercent) * -1)
    });
    // This worked as well, but it wasn't smooth. Probably a heavy function?
    // target.stop().animate({
    //     left: ((targetWidth * scrollPercent) * -1) + 'px'
    // });
  });
// MAIN FUNCTION BLOCK END

// INITIALISE FOOTER START
});
// INITIALISE FOOTER END