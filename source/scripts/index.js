
import {copyDesc} from './modules/creeping-line.js';
import {animationObserver} from './modules/animation-observer.js';
import {initSlider} from './modules/history-slider.js';
import {initSliderPlayer} from './modules/slider-players.js';

document.addEventListener('DOMContentLoaded', () => {
  copyDesc();
  animationObserver();
  initSliderPlayer();
  if (window.innerWidth <= 767) {
    initSlider();
  }
});

