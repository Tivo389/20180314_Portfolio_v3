const onLandingPage = document.querySelector("#landing");
let onLandingView;
let menuBtn;
let menuUl;
let menuUlTop;
let btnTop;



// IIFE FOR COMPONENT LOADING
document.addEventListener("DOMContentLoaded", function(event) {
  loadMenu();
  loadBtn();
  function loadMenu() {
    return fetch("./../components/menu.html")
    .then((response) => response.text())
    .then((data) => {
      $("#main").before(data);
    });
  };
  function loadBtn() {
    return fetch("./../components/menuBtn.html")
    .then((response) => response.text())
    .then((data) => {
      $("#main").after(data);
      // ONCE THE 2 COMPONENTS ARE LOADED DO THE FOLLOWING
      menuBtn = document.querySelector("#menuBtn");
      menuUl = document.querySelector("#menu ul");
      setButtonDisplay();
      setButtonColor();
      setMenuListDisplay();
      setMenuListActive();
      menuBtn.addEventListener("click", handleMenuClick);
      document.addEventListener("scroll", debounce(setMenuListDisplay));
      document.addEventListener("scroll", debounce(setButtonDisplay));
      document.addEventListener("scroll", debounce(setButtonColor));
    }).catch(() => console.log('loadBth().error'));
  };
});



// DEBOUNCER
function debounce(func, wait = 15, immediate = true) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}



// MENU BUTTON / HANDLE CLICK
function handleMenuClick(e) {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const main = document.querySelector('#main');
  const menu = document.querySelector('#menu');
  const aria = e.currentTarget.attributes["aria-expanded"];
  const ariaExpanded = (aria.value == "true");
  ariaExpanded ? aria.value = "false": aria.value = "true";
  menu.classList.toggle("active");
  html.classList.toggle("active");
  body.classList.toggle("active");
  main.classList.toggle("active");
  setMenuBackColor(menu);
}



// MENU BUTTON / SHOW OR HIDE
function setButtonDisplay() {
  btnTop = menuBtn.getBoundingClientRect().top + window.scrollY;
  onLandingView = btnTop < window.innerHeight;
  if(onLandingPage && onLandingView) {
    menuBtn.classList.add("fade");
  } else {
    menuBtn.classList.remove("fade");
  }
}



// MENU UNORDERED LIST / SHOW OR HIDE
function setMenuListDisplay() {
  menuUlTop = menuUl.getBoundingClientRect().top + window.scrollY;
  onLandingView = menuUlTop < window.innerHeight;
  if(onLandingPage && onLandingView && window.innerWidth > 1200) {
    menuUl.classList.remove("active");
  } else {
    menuUl.classList.add("active");
  }
}



// // MENU UNORDERED LIST-ITEM / ACTIVATE
function setMenuListActive() {
  const currentPage = document.querySelector("#main").dataset.location;
  switch (currentPage) {
    case "index"       : activateList(currentPage); break;
    case "work"        : activateList(currentPage); break;
    case "experiments" : activateList(currentPage); break;
    case "about"       : activateList(currentPage); break;
    case "work--detail": activateList(currentPage); break;
  }
  function activateList(currentPage) {
    const listItems = document.querySelectorAll("#menu ul a");
    listItems.forEach(item => {
      const locationMatch = currentPage.includes(item.dataset.location);
      if(locationMatch) item.classList.add("active");
    });
  }
}



// MENU BUTTON / BAR COLOR CHANGE
function setButtonColor() {
  const colorPickers = document.querySelectorAll("[data-color]");
  if(colorPickers.length > 1) {
    findCurrentSectionColor(colorPickers);
  } else {
    const colorPicker = document.querySelector("[data-color]");
    const menuColor = colorPicker.dataset.color;
    const iconBars = document.querySelectorAll(".icon-bar");
    iconBars.forEach(bar => bar.style.backgroundColor = `${menuColor}`);
  }
}
function findCurrentSectionColor(sections) {
  sections.forEach(colorPicker => {
    const detectTop = 0;
    const detectBtm = window.innerHeight * 0.8;
    const sectTop = colorPicker.getBoundingClientRect().top;
    const sectBtm = colorPicker.getBoundingClientRect().bottom;
    const menuColor = colorPicker.dataset.color;
    const iconBars = document.querySelectorAll(".icon-bar");
    const isInView = sectTop > detectTop && sectTop < detectBtm || sectBtm > detectTop && sectBtm < detectBtm || sectTop < detectTop && sectBtm > detectBtm;
    if(isInView) iconBars.forEach(bar => bar.style.backgroundColor = `${menuColor}`);
  });
}



// MENU BUTTON / BACKGROUND COLOR CHANGE
function setMenuBackColor(menu) {
  const currentColor = document.querySelector(".icon-bar").style.backgroundColor;
  const pattern = /\d{1,3}/g;
  const match = currentColor.match(pattern);
  const r = match[0];
  const g = match[1];
  const b = match[2];
  menu.style.backgroundColor = `rgba(${r},${g},${b},0.65)`;
}



// ANIMATE SCROLL
if(onLandingPage) {
  $("a[href=#featuredWork]")[0].addEventListener("click", function() {
    $("html, body").animate({
      scrollTop: $("#featuredWork").offset().top + (window.innerHeight * 0.05)
    }, 800);
  });
}



// COPY EMAIL TO CLIPBOARD
function copyToClipBoard() {
  const emailUser = document.querySelector('.aboutEmail').dataset.user;
  const emailWeb = document.querySelector('.aboutEmail').dataset.website;
  const emailAlert = document.querySelector('.emailAlert');
  const textArea = document.createElement('textarea');
  // *** This styling is an extra step which is likely not required. ***
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur ifthe textarea element is not visible.
  // The likelihood is the element won't even render, not even a flash, so some of these are just precautions. However in IE the element is visible whilst the popup box asking the user for permission for the web page to copy to the clipboard.
  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;
  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';
  textArea.value = `${emailUser.split('').reverse().join('')}@${emailWeb.split('').reverse().join('')}`;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    emailAlert.classList.add('active');
    emailAlert.addEventListener('transitionend', () => {
      setTimeout(() => emailAlert.classList.remove('active'), 1500);
    });
  } catch (err) {
    alert("Sorry, seems I can't copy the address...");
  }
  document.body.removeChild(textArea);
}



// MOBILE ONLY / SHOW IMAGE DETAIL
window.addEventListener("touchstart", function() {
  // WORK--IMAGE / PSEUDO-HOVER FOR WORK IMAGE
  function activateImage() {
    const detectTop = window.innerHeight * 0.15;
    const detectBtm = window.innerHeight * 0.85;
    const images = document.querySelectorAll("a.work--image");
    images.forEach(image => {
      const imgYCenter = image.getBoundingClientRect().top + (image.offsetHeight/2);
      const imgInDetect = imgYCenter > detectTop && imgYCenter < detectBtm;
      imgInDetect ?  image.classList.add("active") : image.classList.remove("active");
    });
  }
  document.addEventListener("scroll", debounce(activateImage));
});


