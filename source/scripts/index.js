/* в этот файл добавляет скрипты*/
// import {toggleBurger} from './modules/menu.js';
// import {initSlider} from './modules/slider.js';
import {copyDesc} from './modules/creeping-line.js';
import {animationObserver} from './modules/animation-observer.js';

document.addEventListener('DOMContentLoaded', () => {
  copyDesc();
  animationObserver();
});

// initSlider();
// toggleBurger();
