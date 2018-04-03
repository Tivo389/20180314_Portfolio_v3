$(document).ready(function() {

  $('div.ms-parent')[0].addEventListener('click', function(e) {
    $('html, body').animate({
      scrollTop: $('#prefectures__ms-select--container').offset().top
    }, 600);
  });
});