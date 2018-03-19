function openMenu(e) {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const main = document.querySelector('#main');
  const mobileMenu = document.querySelector('#mobileMenu');
  let aria = e.currentTarget.attributes["aria-expanded"];
  const ariaExpanded = (aria.value == 'true');

  if(ariaExpanded === false) {
    aria.value = "true";
    mobileMenu.classList.add('active');
  } else {
    aria.value = "false";
    mobileMenu.classList.remove('active');
  }
  html.classList.toggle('active');
  body.classList.toggle('active');
  main.classList.toggle('active');
}


// - index.html if you scroll past the landing page show the button
// - *.html show it from the start
// $.get("./../components/menuBtn.html", data => $('#main').after(data) );

// - if the button aria-expanded is true, show this.
// - also add .active to body, html, #main
// $.get("./../components/mobileMenu.html", data => $('#main').before(data) );