const sliderNode = document.querySelector('.players__slider-list');
const slides = sliderNode.querySelectorAll('.players__slider-item');
const rightBtnNode = document.querySelector('.players__slider-arrow--right');
const leftBtnNode = document.querySelector('.players__slider-arrow--left');
const slideWidth = slides[0].offsetWidth;
const gapWidth = 20;
let counter = 3;
let step = (slideWidth + gapWidth) * counter;
let slideTime = 1000;
let lengthDuble = (slideWidth + gapWidth) * slides.length;

function initSliderPlayer () {
  // for (let j = 0; j < counter; j++) {
  //   slides[j].classList.add('current');
  // }
  for (let i = 1; i <= slides.length; i++) {
    let clone = slides[slides.length - i].cloneNode(true);
    sliderNode.prepend(clone);
  }
  sliderNode.style.transform = `translateX(-${lengthDuble}px)`;
  // setInterval(() => {
  //   moveSlide('left');
  // }, 4000);

  rightBtnNode.addEventListener('click', () => {
    moveSlide('right');
  });
  leftBtnNode.addEventListener('click', () => {
    moveSlide('left');
  });
}

function moveSlide (side) {
  sliderNode.style.transition = `transform ${slideTime}ms`;
  if (side == 'right') {
    sliderNode.style.transform = `translateX(${-lengthDuble - step}px)`;
  } else {
    sliderNode.style.transform = `translateX(${-lengthDuble + step}px)`;
  }

  setTimeout(() => {
    // const currents = sliderNode.querySelectorAll('.players__slider-item.current');
    // if (side == 'right') {
    //   for (let i = currents.length - 1; i >= 0; i--) {
    //     let li = currents[i];
    //     let liClone = currents[i].cloneNode(true);
    //     sliderNode.prepend(liClone);
    //     sliderNode.removeChild(li);
    //   }
    // } else {
    //   for (let i = 0; i < currents.length; i++) {
    //     let li = currents[i];
    //     let liClone = currents[i].cloneNode(true);
    //     sliderNode.append(liClone);
    //     sliderNode.removeChild(li);
    //   }
    // }
    for (let i = 0; i < counter; i++) {
      if (side == 'right') {
        let li = sliderNode.lastElementChild;
        let liClone = sliderNode.lastElementChild.cloneNode(true);
        sliderNode.prepend(liClone);
        sliderNode.removeChild(li);
      } else {
        let li = sliderNode.firstElementChild;
        let liClone = sliderNode.firstElementChild.cloneNode(true);
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
