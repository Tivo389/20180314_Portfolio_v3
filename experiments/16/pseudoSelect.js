$(document).ready(function() {
// ------------------------------------------------
  // IIFE TO CREATE PSEUDO-DROPDOWN
  (function createDropDown() {
    // VARIABLES
    var source = $("#source");
    var selected = source.find("option[selected]");
    var options = $("option", source);
    // CREATE PSEUDO SELECT DROPDOWN--CONTAINER
    $(".input--pseudo--select").append(
      '<dl id="target" class="dropdown"></dl>'
    );
    $("#target").append(
      '<dt><a href="#">' + selected.text() +
      '<span class="value">' + selected.val() +
      '</span></a></dt>'
    );
    // CREATE PSEUDO SELECT DROPDOWN--LIST
    $("#target").append(
      '<dd><ul></ul></dd>'
    );
    options.each(function() {
      $("#target dd ul").append(
        '<a href="#"><li>' + $(this).text() +
        '<span class="value">' + $(this).val() +
        '</span></li></a>'
      );
    });
  })();

// ------------------------------------------------
  // ON CLICK OF PSEUDO SELECT DROPDOWN--CONTAINER
  $(".dropdown dt").click(function() {
    $(".dropdown dd ul").toggle();
  });

// ------------------------------------------------
  // IF (PSEUDO DD OPEN && CLICK TARGET NOT PSEUDO) THEN CLOSE
  $('body').click(function(e) {
    var isOpen = $("#target dd ul").is(':visible');
    var clickTarget = $(e.target).parents('#target').length;
    // clickTarget returns 1 if the parent of the e.target is the specified element.
    // Hence if clickTarget is != 1, it means you didn't click within dl#target.
    if(isOpen === true && clickTarget != 1) {
      $(".dropdown dd ul").toggle();
    }
  });

// ------------------------------------------------
  // ON CLICK OF PSEUDO SELECT DROPDOWN--LIST--ITEM
  $(".dropdown dd ul a li").click(function() {
    var text = $(this).html();
    var source = $("#source");
    $(".dropdown dt a").html(text);
    $(".dropdown dd ul").hide();
    source.val($(this).find("span.value").html());
  });

// ------------------------------------------------
  // PREVENT CLICK ON HREF=# SCROLL
  $('a').click(function(e) {
    e.preventDefault();
  });

});