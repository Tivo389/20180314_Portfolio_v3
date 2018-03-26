// MOBILE & DESKTOP / LOAD COMPONENTS IIFE
(function() {
  return fetch("./../components/menu.html")
  .then(response => response.text())
  .then((data) => {
    $('#main').before(data);
  });
})();
(function() {
  return fetch("./../components/menuBtn.html")
  .then(response => response.text())
  .then((data) => {
    $('#main').after(data);
    const menuBtn = document.getElementById('menuBtn');
    const btnTop = menuBtn.getBoundingClientRect().top + window.scrollY;
    const onLandingView = btnTop < window.innerHeight;
    buttonColor();
    if(onLandingPage && onLandingView) menuBtn.classList.add('hidden');
    menuBtn.addEventListener('click', openMenu);
    document.addEventListener('scroll', debounce(visibleButton));
  });
})();



// MOBILE & DESKTOP / DEBOUNCER
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}



// MOBILE & DESKTOP / MENU BUTTON / HANDLE CLICK
function openMenu(e) {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const main = document.querySelector('#main');
  const menu = document.querySelector('#menu');
  const aria = e.currentTarget.attributes["aria-expanded"];
  const ariaExpanded = (aria.value == 'true');
  ariaExpanded ? aria.value = "false": aria.value = "true";
  menu.classList.toggle('active');
  html.classList.toggle('active');
  body.classList.toggle('active');
  main.classList.toggle('active');
  handleMenuBackColor(menu);
}



// MOBILE & DESKTOP / MENU BUTTON / SHOW OR HIDE
function visibleButton() {
  let scrollY = window.scrollY;
  const onLandingPage = document.querySelector('#landing');
  const onLandingView = scrollY < window.innerHeight * 0.75;
  if(onLandingPage && onLandingView) {
    menuBtn.classList.add('fade');
  } else {
    menuBtn.classList.remove('hidden');
    menuBtn.classList.remove('fade');
  }
}



// MOBILE & DESKTOP / MENU BUTTON / BAR COLOR CHANGE
function buttonColor() {
  const colorPickers = document.querySelectorAll('[data-color]');
  if(colorPickers.length > 1) {
    findCurrentSectionColor(colorPickers);
  } else {
    const colorPicker = document.querySelector('[data-color]');
    const menuColor = colorPicker.dataset.color;
    const iconBars = document.querySelectorAll('.icon-bar');
    iconBars.forEach(bar => bar.style.backgroundColor = `${menuColor}`);
  }
}
function findCurrentSectionColor(sections) {
  sections.forEach(colorPicker => {
    const detectTop = 0;
    const detectBtm = window.innerHeight;
    const sectTop = colorPicker.getBoundingClientRect().top;
    const sectBtm = colorPicker.getBoundingClientRect().bottom;
    const menuColor = colorPicker.dataset.color;
    const iconBars = document.querySelectorAll('.icon-bar');
    const isInView = sectTop > detectTop && sectTop < detectBtm || sectBtm > detectTop && sectBtm < detectBtm || sectTop < detectTop && sectBtm > detectBtm;
    if(isInView) iconBars.forEach(bar => bar.style.backgroundColor = `${menuColor}`);
  });
}
document.addEventListener('scroll', debounce(buttonColor));



// MOBILE & DESKTOP / MENU BUTTON / BACKGROUND COLOR CHANGE
function handleMenuBackColor(menu) {
  const currentColor = document.querySelector('.icon-bar').style.backgroundColor;
  const pattern = /\d{1,3}/g;
  const match = currentColor.match(pattern);
  const r = match[0];
  const g = match[1];
  const b = match[2];
  menu.style.backgroundColor = `rgba(${r},${g},${b},0.65)`;
}



// MOBILE & DESKTOP / ANIMATE SCROLL
const onLandingPage = document.querySelector('#landing');
if(onLandingPage) {
  $('a[href=#featuredWork]')[0].addEventListener('click', function(e) {
    $('html, body').animate({
      scrollTop: $('#featuredWork').offset().top + 60
    }, 800);
  });
}



// MOBILE ONLY / PSEUDO-HOVER FOR WORK IMAGE
window.addEventListener('touchstart', function() {
function activateImage() {
  const detectTop = window.innerHeight * 0.15;
  const detectBtm = window.innerHeight * 0.85;
  const images = document.querySelectorAll('a.work--image');
  images.forEach(image => {
    const imgYCenter = image.getBoundingClientRect().top + (image.offsetHeight/2);
    const imgInDetect = imgYCenter > detectTop && imgYCenter < detectBtm;
    imgInDetect ?  image.classList.add('active') : image.classList.remove('active');
  });
}
document.addEventListener('scroll', debounce(activateImage));
});








// - index.html if you scroll past the landing page show the button
// - *.html show it from the start
// $.get("./../components/menuBtn.html", data => $('#main').after(data) );

// - if the button aria-expanded is true, show this.
// - also add .active to body, html, #main
// $.get("./../components/menu.html", data => $('#main').before(data) );