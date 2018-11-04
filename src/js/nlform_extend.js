const actionItems = document.querySelectorAll('.nl-field ul li');
const exclusion = document.querySelector('.exclusion');
const optionA = document.querySelector('.optionA');
const optionB = document.querySelector('.optionB');

actionItems.forEach(item => item.addEventListener('click', displayText));

function displayText() {
  if(this.innerHTML.includes('see')) {
    exclusion.style.display = 'none';
    optionA.style.display = 'none';
    optionB.style.display = 'inline';
  } else {
    exclusion.style.display = 'inline';
    optionA.style.display = 'inline';
    optionB.style.display = 'none';
  }
}