const sliderBtns = document.querySelectorAll('.slider__pagination-btn');
const sliderItems = document.querySelectorAll('.slider__item');
const sliderNext = document.querySelector('.slider__btn-swap--right');
const sliderPrev = document.querySelector('.slider__btn-swap--left');


function initSlider () {
  sliderPrev.setAttribute('disabled', 'disabled');

  for(let i = 0; i < sliderBtns.length; i++) {
    sliderBtns[i].addEventListener('click', () => {
      for(let j = 0; j < sliderBtns.length; j++) {
        sliderBtns[j].classList.remove('slider__pagination-btn--active');
        sliderItems[j].classList.remove('slider__item--active');
      }
      sliderBtns[i].classList.add('slider__pagination-btn--active');
      sliderItems[i].classList.add('slider__item--active');
      if (i === 0) {
        sliderPrev.setAttribute('disabled', 'disabled');
        sliderNext.removeAttribute('disabled');
      } else if (i === sliderBtns.length - 1) {
        sliderNext.setAttribute('disabled', 'disabled');
        sliderPrev.removeAttribute('disabled');
      } else {
        sliderPrev.removeAttribute('disabled');
        sliderNext.removeAttribute('disabled');
      }
    });
  }


  sliderNext.addEventListener('click', () => {
    let nextIndex;
    for(let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].classList.contains('slider__item--active')) {
        nextIndex = i + 1;
        sliderItems[i].classList.remove('slider__item--active');
        sliderBtns[i].classList.remove('slider__pagination-btn--active');
        if (nextIndex === sliderItems.length - 1) {
          sliderNext.setAttribute('disabled', 'disabled');
        }
      }
    }
    sliderItems[nextIndex].classList.add('slider__item--active');
    sliderBtns[nextIndex].classList.add('slider__pagination-btn--active');
    sliderPrev.removeAttribute('disabled');
  });


  sliderPrev.addEventListener('click', () => {
    let prevIndex;
    for(let i = 0; i < sliderItems.length; i++) {
      if (sliderItems[i].classList.contains('slider__item--active')) {
        prevIndex = i - 1;
        sliderItems[i].classList.remove('slider__item--active');
        sliderBtns[i].classList.remove('slider__pagination-btn--active');
        if (prevIndex === 0) {
          sliderPrev.setAttribute('disabled', 'disabled');
        }
      }
    }
    sliderItems[prevIndex].classList.add('slider__item--active');
    sliderBtns[prevIndex].classList.add('slider__pagination-btn--active');
    sliderNext.removeAttribute('disabled');
  });
}

export {initSlider};
