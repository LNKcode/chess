const sliderNode = document.querySelector('.players__slider-list');
const sliderItems = sliderNode.querySelectorAll('.players__slider-item');
let counter = 3;

function initSliderPlayer () {
  for (let i = 1; i <= counter; i++) {
    let clone = sliderItems[sliderItems.length - i].cloneNode(true);
    sliderNode.prepend(clone);
    console.log(i);
  }
  console.log(sliderItems[0]);
}

export {initSliderPlayer};
