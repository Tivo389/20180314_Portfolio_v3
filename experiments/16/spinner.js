$(document).ready(function() {
  var input = $('#spinnerCss')[0];
  $('.spinner--up').on('click', function() {
    input.value++;
  });
  $('.spinner--down').on('click', function() {
    if (input.value > 0) {
      input.value--;
    }
  });
})