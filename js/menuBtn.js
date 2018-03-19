function openMenu(e) {
  const body = document.querySelector('body');
  const html = document.querySelector('html');
  const main = document.querySelector('#main');
  body.classList.toggle('menuOpen');
  html.classList.toggle('menuOpen');
  main.classList.toggle('menuOpen');
}


// - index.html if you scroll past the landing page show the button
// - *.html show it from the start
// $.get("./../components/menuBtn.html", data => $('#main').after(data) );

// - if the button aria-expanded is true, show this.
// - also add .menuOpen to body, html, #main
// $.get("./../components/mobileMenu.html", data => $('#main').before(data) );