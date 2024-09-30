/* в этот файл добавляет скрипты*/
// import {toggleBurger} from './modules/menu.js';
// import {initSlider} from './modules/slider.js';
import {copyDesc} from './modules/creeping-line.js';
import {animationObserver} from './modules/animation-observer.js';
import {initSlider} from './modules/history-slider.js';

document.addEventListener('DOMContentLoaded', () => {
  copyDesc();
  animationObserver();
  if (window.innerWidth <= 767) {
    initSlider();
  }
});

// initSlider();
// toggleBurger();
