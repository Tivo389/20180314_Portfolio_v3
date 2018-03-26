(function() {
  return fetch("./../components/menuBtn.html")
  .then(response => response.text())
  .then((data) => {
    $('#main').after(data);
    const menuBtn = document.getElementById('menuBtn');
    menuBtn.addEventListener('click', openMenu);
  });
})();

(function() {
  return fetch("./../components/menu.html")
  .then(response => response.text())
  .then((data) => {
    $('#main').before(data);
    const menuBtn = document.getElementById('menuBtn');
    menuBtn.addEventListener('click', openMenu);
  });
})();