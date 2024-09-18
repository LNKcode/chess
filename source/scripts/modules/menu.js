const burgerBtnNode = document.querySelector('.header__burger');
const listNode = document.querySelector('.header__list-nav');


function toggleBurger () {
  burgerBtnNode.addEventListener('click', () => {
    listNode.classList.toggle('header__list-nav--open');
    burgerBtnNode.classList.toggle('header__burger--open');
  });
}


export {toggleBurger};
