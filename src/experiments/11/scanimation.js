// INITIALISE HEADER START
$(document).ready(function () {
// INITIALISE HEADER END

// MAIN FUNCTION BLOCK START

    $(window).keyup(function(e) {
      // console.log(e.which);
      if (e.which === 48) {
          $('#content').addClass('animate');
        return false;
      }
    });

    $(window).keyup(function(e) {
      if (e.which === 57) {
          $('#div__content').addClass('animate');
        return false;
      }
    });

  /*
  //This worked as well but the scroll might be dependant on the user settings.
  $(window).scroll(function () {
    var target = $('#content'),
        documentHeight = $(document).height(),
        distanceScrolled = $(this).scrollTop(),
        windowHeight = $(this).height(),
        windowWidth = $(this).width(),
        targetWidth = (target.width() - windowWidth),
        scrollPercent = (distanceScrolled / (documentHeight - windowHeight));
    target.css({
        'left': (((targetWidth * scrollPercent) * -1) + $(document).width())
    });

    // This worked as well, but it wasn't smooth. Probably a heavy function?
    // target.stop().animate({
    //     left: ((targetWidth * scrollPercent) * -1) + 'px'
    // });
  });
  */
// MAIN FUNCTION BLOCK END

// INITIALISE FOOTER START
});
// INITIALISE FOOTER END