const categories = document.querySelectorAll('.experiments--category span');
const experiments = document.querySelectorAll('.experiment__img--container a[data-category]');
const linkBlocks = document.querySelectorAll('.link--block');
let experimentHeight;

function filterCategory(e) {
  let filter = this.dataset.category;
  experiments.forEach(experiment => {
    const match = experiment.dataset.category.includes(filter);
    if(match) {
      experiment.classList.remove('hidden');
      experimentHeight = experiment.offsetHeight;
      console.log(experimentHeight);
    } else {
      experiment.classList.add('hidden');
    }
  });
  handleLinkBlock();
}

function handleLinkBlock() {
  linkBlocks.forEach(linkBlock => {
    linkBlock.classList.add('filter--active');
    linkBlock.style.height = `${experimentHeight}px`;
  })
}

categories.forEach(category => {
  category.addEventListener('click', filterCategory)
});