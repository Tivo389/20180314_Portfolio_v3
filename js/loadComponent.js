// - index.html if you scroll past the landing page show the button
// - *.html show it from the start
$.get("./../components/mobileMenuBtn.html", data => $('#main').after(data) );


// - if the button aria-expanded is true, show this.
// - also add .menuOpen to body, html, #main
// $.get("./../components/mobileMenu.html", data => $('#main').before(data) );