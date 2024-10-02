const sliderNode = document.querySelector('.players__slider-list');
const slides = sliderNode.querySelectorAll('.players__slider-item');
const rightBtnNode = document.querySelector('.players__slider-arrow--right');
const leftBtnNode = document.querySelector('.players__slider-arrow--left');
const counterCurrentNode = document.querySelector('.players__slider-counter-current');
const counterAllNode = document.querySelector('.players__slider-counter-all');
const slideWidth = slides[0].offsetWidth;
const gapWidth = 20;
let counter;
if (window.innerWidth <= 767) {
  counter = 1;
} else {
  counter = 3;
}
const step = (slideWidth + gapWidth) * counter;
const slideTime = 1000;
const lengthDuble = (slideWidth + gapWidth) * slides.length;
let counterCurrent = counter;

function initSliderPlayer () {
  counterAllNode.textContent = slides.length;
  counterCurrentNode.textContent = counterCurrent;
  for (let i = 1; i <= slides.length; i++) {
    const clone = slides[slides.length - i].cloneNode(true);
    sliderNode.prepend(clone);
  }
  sliderNode.style.transform = `translateX(-${lengthDuble}px)`;
  setInterval(() => {
    moveSlide('right');
  }, 4000);

  rightBtnNode.addEventListener('click', () => {
    moveSlide('right');
  });
  leftBtnNode.addEventListener('click', () => {
    moveSlide('left');
  });
}

function moveSlide (side) {
  sliderNode.style.transition = `transform ${slideTime}ms`;
  if (side === 'right') {
    sliderNode.style.transform = `translateX(${-lengthDuble - step}px)`;
    counterCurrent += counter;
    if (counterCurrent > slides.length) {
      counterCurrent -= slides.length;
    }
  } else {
    sliderNode.style.transform = `translateX(${-lengthDuble + step}px)`;
    counterCurrent -= counter;
    if (counterCurrent < counter) {
      counterCurrent += slides.length;
    }
  }
  counterCurrentNode.textContent = counterCurrent;

  setTimeout(() => {
    for (let i = 0; i < counter; i++) {
      if (side === 'left') {
        const li = sliderNode.lastElementChild;
        const liClone = sliderNode.lastElementChild.cloneNode(true);
        sliderNode.prepend(liClone);
        sliderNode.removeChild(li);
      } else {
        const li = sliderNode.firstElementChild;
        const liClone = sliderNode.firstElementChild.cloneNode(true);
        sliderNode.append(liClone);
        sliderNode.removeChild(li);
      }
    }
    sliderNode.style.transition = '';
    sliderNode.style.transform = `translateX(${-lengthDuble}px)`;
  }, slideTime
  );
}
export {initSliderPlayer};
