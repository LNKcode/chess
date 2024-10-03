// source/scripts/modules/creeping-line.js
var creepingLines = document.querySelectorAll(".creeping-line");
function copyDesc() {
  if (creepingLines.length > 0) {
    creepingLines.forEach((creepingLine) => {
      const creepingLineWrapperNode = creepingLine.querySelector(".creeping-line__wrapper");
      creepingLine.append(creepingLineWrapperNode.cloneNode(true));
    });
  }
}

// source/scripts/modules/animation-observer.js
function animationObserver() {
  const parentElements = document.querySelectorAll("[data-animation]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      } else {
        entry.target.classList.remove("animate");
      }
    });
  }, {
    // Указываем порог срабатывания (0 = начало появления, 1 = полный показ)
    threshold: 0.6
    // 10% элемента должно быть видно
  });
  parentElements.forEach((parent) => observer.observe(parent));
}

// source/scripts/modules/history-slider.js
var sliderNode = document.querySelector(".history__slider");
var sliderContentNode = sliderNode.querySelector(".history__time-line");
var slides = sliderNode.querySelectorAll(".history__time-line-item");
var sliderBullets = sliderNode.querySelectorAll(".history__slider-pagination-item span");
var sliderBtnLeftNode = sliderNode.querySelector(".history__slider-arrow--left");
var sliderBtnRightNode = sliderNode.querySelector(".history__slider-arrow--right");
var gapWidth = 20;
var trfRegExp = /[-0-9.]+(?=px)/;
var slideWidth = slides[0].offsetWidth;
var slideIndex = 0;
var step = slideWidth + gapWidth;
var posInit = 0;
var posX1 = 0;
var posX2 = 0;
var posFinal = 0;
var posThreshold = slideWidth * 0.35;
function initSlider() {
  if (sliderNode) {
    sliderBtnRightNode.addEventListener("click", () => {
      slideIndex++;
      swipeHandler(step, slideIndex);
    });
    sliderBtnLeftNode.addEventListener("click", () => {
      slideIndex--;
      swipeHandler(step, slideIndex);
    });
    sliderNode.addEventListener("touchstart", swipeStart);
    sliderNode.addEventListener("mousedown", swipeStart);
  }
}
function swipeHandler(step3, slideIndex2) {
  sliderContentNode.style.transform = `translateX(-${step3 * slideIndex2}px)`;
  sliderContentNode.style.transition = "transform 0.5s";
  if (slideIndex2 === 0) {
    sliderBtnLeftNode.setAttribute("disabled", "");
  } else if (slideIndex2 === slides.length - 1) {
    sliderBtnRightNode.setAttribute("disabled", "");
  } else {
    sliderBtnLeftNode.removeAttribute("disabled");
    sliderBtnRightNode.removeAttribute("disabled");
  }
  for (let i = 0; i < sliderBullets.length; i++) {
    if (sliderBullets[i].classList.contains("active")) {
      sliderBullets[i].classList.remove("active");
    }
  }
  sliderBullets[slideIndex2].classList.add("active");
}
function getEvent() {
  return event.type.search("touch") !== -1 ? event.touches[0] : event;
}
function swipeStart() {
  const evt = getEvent();
  posInit = posX1 = evt.clientX;
  sliderContentNode.style.transition = "";
  document.addEventListener("touchmove", swipeAction);
  document.addEventListener("touchend", swipeEnd);
  document.addEventListener("mousemove", swipeAction);
  document.addEventListener("mouseup", swipeEnd);
}
function swipeAction() {
  const evt = getEvent(), style = sliderContentNode.style.transform, transform = +style.match(trfRegExp);
  posX2 = posX1 - evt.clientX;
  posX1 = evt.clientX;
  sliderContentNode.style.transform = `translateX(${transform - posX2}px)`;
}
function swipeEnd() {
  posFinal = posInit - posX1;
  document.removeEventListener("touchmove", swipeAction);
  document.removeEventListener("mousemove", swipeAction);
  document.removeEventListener("touchend", swipeEnd);
  document.removeEventListener("mouseup", swipeEnd);
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

// source/scripts/modules/slider-players.js
var sliderNode2 = document.querySelector(".players__slider-list");
var slides2 = sliderNode2.querySelectorAll(".players__slider-item");
var rightBtnNode = document.querySelector(".players__slider-arrow--right");
var leftBtnNode = document.querySelector(".players__slider-arrow--left");
var counterCurrentNode = document.querySelector(".players__slider-counter-current");
var counterAllNode = document.querySelector(".players__slider-counter-all");
var slideWidth2 = slides2[0].offsetWidth;
var gapWidth2 = 20;
var counter;
if (window.innerWidth <= 767) {
  counter = 1;
} else {
  counter = 3;
}
var step2 = (slideWidth2 + gapWidth2) * counter;
var slideTime = 1e3;
var lengthDuble = (slideWidth2 + gapWidth2) * slides2.length;
var counterCurrent = counter;
function initSliderPlayer() {
  counterAllNode.textContent = slides2.length;
  counterCurrentNode.textContent = counterCurrent;
  for (let i = 1; i <= slides2.length; i++) {
    const clone = slides2[slides2.length - i].cloneNode(true);
    sliderNode2.prepend(clone);
  }
  sliderNode2.style.transform = `translateX(-${lengthDuble}px)`;
  setInterval(() => {
    moveSlide("right");
  }, 4e3);
  rightBtnNode.addEventListener("click", () => {
    moveSlide("right");
  });
  leftBtnNode.addEventListener("click", () => {
    moveSlide("left");
  });
}
function moveSlide(side) {
  sliderNode2.style.transition = `transform ${slideTime}ms`;
  if (side === "right") {
    sliderNode2.style.transform = `translateX(${-lengthDuble - step2}px)`;
    counterCurrent += counter;
    if (counterCurrent > slides2.length) {
      counterCurrent -= slides2.length;
    }
  } else {
    sliderNode2.style.transform = `translateX(${-lengthDuble + step2}px)`;
    counterCurrent -= counter;
    if (counterCurrent < counter) {
      counterCurrent += slides2.length;
    }
  }
  counterCurrentNode.textContent = counterCurrent;
  setTimeout(
    () => {
      for (let i = 0; i < counter; i++) {
        if (side === "left") {
          const li = sliderNode2.lastElementChild;
          const liClone = sliderNode2.lastElementChild.cloneNode(true);
          sliderNode2.prepend(liClone);
          sliderNode2.removeChild(li);
        } else {
          const li = sliderNode2.firstElementChild;
          const liClone = sliderNode2.firstElementChild.cloneNode(true);
          sliderNode2.append(liClone);
          sliderNode2.removeChild(li);
        }
      }
      sliderNode2.style.transition = "";
      sliderNode2.style.transform = `translateX(${-lengthDuble}px)`;
    },
    slideTime
  );
}

// source/scripts/index.js
document.addEventListener("DOMContentLoaded", () => {
  copyDesc();
  animationObserver();
  initSliderPlayer();
  if (window.innerWidth <= 767) {
    initSlider();
  }
});
//# sourceMappingURL=index.js.map
