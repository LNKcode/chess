const sliderNode = document.querySelector('.history__slider');
const sliderContentNode = sliderNode.querySelector('.history__time-line');
const slides = sliderNode.querySelectorAll('.history__time-line-item');
const sliderBullets = sliderNode.querySelectorAll('.history__slider-pagination-item span');
const sliderBtnLeftNode = sliderNode.querySelector('.history__slider-arrow--left');
const sliderBtnRightNode = sliderNode.querySelector('.history__slider-arrow--right');
const gapWidth = 20;
const trfRegExp = /[-0-9.]+(?=px)/;
const slideWidth = slides[0].offsetWidth;
let slideIndex = 0;
const step = slideWidth + gapWidth;
let posInit = 0;
let posX1 = 0;
let posX2 = 0;
let posFinal = 0;
const posThreshold = slideWidth * .35;

function initSlider () {
  if (sliderNode) {
    sliderBtnRightNode.addEventListener('click', () => {
      slideIndex++;
      swipeHandler(step, slideIndex);
    });
    sliderBtnLeftNode.addEventListener('click', () => {
      slideIndex--;
      swipeHandler(step, slideIndex);
    });
    sliderNode.addEventListener('touchstart', swipeStart);
    sliderNode.addEventListener('mousedown', swipeStart);
  }
}

function swipeHandler (step, slideIndex) {
  sliderContentNode.style.transform = `translateX(-${step * slideIndex}px)`;
  sliderContentNode.style.transition = 'transform 0.5s';
  if (slideIndex === 0) {
    sliderBtnLeftNode.setAttribute('disabled', '');
  } else if (slideIndex === slides.length - 1) {
    sliderBtnRightNode.setAttribute('disabled', '');
  } else {
    sliderBtnLeftNode.removeAttribute('disabled');
    sliderBtnRightNode.removeAttribute('disabled');
  }

  for (let i = 0; i < sliderBullets.length; i++) {
    if (sliderBullets[i].classList.contains('active')) {
      sliderBullets[i].classList.remove('active');
    }
  }
  sliderBullets[slideIndex].classList.add('active');
}

function getEvent() {
  return event.type.search('touch') !== -1 ? event.touches[0] : event;
}

function swipeStart() {
  const evt = getEvent();
  posInit = posX1 = evt.clientX;
  sliderContentNode.style.transition = '';
  document.addEventListener('touchmove', swipeAction);
  document.addEventListener('touchend', swipeEnd);
  document.addEventListener('mousemove', swipeAction);
  document.addEventListener('mouseup', swipeEnd);
}

function swipeAction() {
  const evt = getEvent(),
    style = sliderContentNode.style.transform,
    transform = +style.match(trfRegExp);

  posX2 = posX1 - evt.clientX;
  posX1 = evt.clientX;

  sliderContentNode.style.transform = `translateX(${transform - posX2}px)`;
}

function swipeEnd() {
  posFinal = posInit - posX1;

  document.removeEventListener('touchmove', swipeAction);
  document.removeEventListener('mousemove', swipeAction);
  document.removeEventListener('touchend', swipeEnd);
  document.removeEventListener('mouseup', swipeEnd);

  if (Math.abs(posFinal) > posThreshold) {
    if (posInit < posX1 && slideIndex > 0) {
      slideIndex--;
    } else if (posInit > posX1 && slideIndex < slides.length - 1) {
      slideIndex++;
    }
  }

  if (posInit !== posX1) {
    swipeHandler(step, slideIndex);
  }
}

export {initSlider};
