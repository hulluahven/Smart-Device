import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

const footerContainer = document.querySelector('[data-container]');
const mainNav = document.querySelector('[data-nav]');
const contactsFeild = document.querySelector('[data-contacts]');
const accordeonButton = document.querySelectorAll('[data-button]');
const navButton = document.querySelector('[nav-button]');
const contactsButton = document.querySelector('[contacts-button]');
// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------
  footerContainer.classList.remove('footer__container--no-js');
  mainNav.classList.remove('main-nav--no-js');
  contactsFeild.classList.remove('footer__contacts-wrapper--no-js');

  accordeonButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (mainNav && mainNav.classList.contains('is-opened')) {
        mainNav.classList.remove('is-opened');
        navButton.classList.remove('is-opened');
        contactsFeild.classList.add('is-opened');
        contactsButton.classList.add('is-opened');
      } else {
        contactsFeild.classList.remove('is-opened');
        contactsButton.classList.remove('is-opened');
        mainNav.classList.add('is-opened');
        navButton.classList.add('is-opened');
      }
    });
  });
});


// все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
// в load следует добавить скрипты, не участвующие в работе первого экрана
window.addEventListener('load', () => {
  initModals();
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
