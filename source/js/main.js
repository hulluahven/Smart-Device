import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

const footerContainer = document.querySelector('[data-container]');
const mainNav = document.querySelector('[data-nav]');
const contactsFeild = document.querySelector('[data-contacts]');
const accordeonButton = document.querySelectorAll('[data-button]');
const navButton = document.querySelector('[data-nav-button]');
const contactsButton = document.querySelector('[data-contacts-button]');
const closeButton = document.querySelector('[data-close]');
const userPhones = document.querySelectorAll('input[type=tel]');
const callOffer = document.querySelector('[data-modal]');
const pageBody = document.querySelector('[data-body]');
const popUpForm = document.querySelector('[data-message]');
const nameField = popUpForm.querySelector('input[type=text]');
const navField = document.querySelector('[data-nav-field]');
const contactsField = document.querySelector('[data-contacts-field]');
const pageForm = document.querySelectorAll('[autocomplete="off"]');

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------
  iosVhFix();

  // Modules
  // --

  // Аккордеон

  if (footerContainer) {
    footerContainer.classList.remove('footer__container--no-js');
  }
  if (mainNav) {
    mainNav.classList.remove('main-nav--no-js');
  }
  if (contactsFeild) {
    contactsFeild.classList.remove('footer__contacts-wrapper--no-js');
  }

  if (accordeonButton) {
    navField.addEventListener('click', () => {
      if (mainNav && mainNav.classList.contains('is-opened')) {
        mainNav.classList.remove('is-opened');
        navButton.classList.remove('is-opened');

      } else {
        mainNav.classList.add('is-opened');
        navButton.classList.add('is-opened');
        contactsFeild.classList.remove('is-opened');
        contactsButton.classList.remove('is-opened');
      }
    });

    contactsField.addEventListener('click', () => {
      if (contactsFeild && contactsFeild.classList.contains('is-opened')) {
        contactsFeild.classList.remove('is-opened');
        contactsButton.classList.remove('is-opened');
      } else {
        contactsFeild.classList.add('is-opened');
        contactsButton.classList.add('is-opened');
        mainNav.classList.remove('is-opened');
        navButton.classList.remove('is-opened');
      }
    });
  }

  // Маска для телефона

  let getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, '');
  };

  if (userPhones) {
    userPhones.forEach(function (el) {
      el.addEventListener('input', function (e) {
        const input = e.target;
        const inputNumbersValue = getInputNumbersValue(input);

        let formatedInputValue = ' ';

        if (!inputNumbersValue) {
          input.value = ' ';
        }
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(inputNumbersValue[0]) > -1) {

          let firstSymbols = '+7';

          formatedInputValue = firstSymbols;

          if (inputNumbersValue.length > 1) {
            formatedInputValue += ' (' + inputNumbersValue.substring(1, 4);
          }

          if (inputNumbersValue.length >= 5) {
            formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
          }

          if (inputNumbersValue.length >= 8) {
            formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
          }

          if (inputNumbersValue.length >= 10) {
            formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
          }
        }

        input.value = formatedInputValue;
        return formatedInputValue;
      });
    });

    const onNumberKeyDown = function (e) {
      const input = e.target;
      if (e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
        input.value = '';
      }
    };

    userPhones.forEach(function (el) {
      el.addEventListener('keydown', onNumberKeyDown);
    });

    phoneChecker();
  }
  // -----------------

  function phoneChecker() {
    pageForm.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        userPhones.forEach((phone) => {
          const valueLength = phone.value.length;
          if (valueLength < 16) {
            return;
          }
          form.submit();
        });
      });
    });
  }

  // --------------
  // для Pop-up

  const closeMessage = () => {
    const removeListener = () => {
      if (closeButton) {
        document.removeEventListener('keydown', onPopupEscapeKeydown);
        popUpForm.removeEventListener('click', onClickMessage);
        closeButton.removeEventListener('click', onClickMessage);
        document.removeEventListener('focus', catchFocus);

      }
    };

    const addEventListener = () => {
      window.addEventListener('keydown', onPopupEscapeKeydown);
      popUpForm.addEventListener('click', onClickMessage);
      closeButton.addEventListener('click', onClickMessage);
    };

    const onPopupEscapeKeydown = function (e) {
      if (e.keyCode === 27) {
        if (popUpForm && popUpForm.classList.contains('is-open')) {
          popUpForm.classList.remove('is-open');
          pageBody.classList.remove('is-hidden');
        }

      }
    };

    function onClickMessage(e) {
      if (e.target === popUpForm || e.target === closeButton) {
        removeListener();
        if (popUpForm && popUpForm.classList.contains('is-open')) {
          popUpForm.classList.remove('is-open');
          pageBody.classList.remove('is-hidden');
        }
      } else {
        addEventListener();
      }
    }
    addEventListener();
  };

  if (callOffer) {
    callOffer.addEventListener('click', function () {
      closeMessage();
      if (popUpForm && popUpForm.classList.contains('is-open')) {
        popUpForm.classList.remove('is-open');
        pageBody.classList.remove('is-hidden');
      } else {
        popUpForm.classList.add('is-open');
        pageBody.classList.add('is-hidden');
        nameField.focus();
        catchFocus();
      }
    });
  }

  function catchFocus() {
    const modalElements = popUpForm.querySelectorAll('input, textarea, button');
    const firstFocusableElement = modalElements[0];
    const lastfocusableElement = modalElements[modalElements.length - 1];
    const keyCodeTab = 9;

    function buttonListener() {
      document.addEventListener('keydown', function (e) {
        const isTabPressed = (e.key === 'Tab' || e.keyCode === keyCodeTab);

        if (!isTabPressed) {
          return;
        } else {
          if (document.activeElement === lastfocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }

        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastfocusableElement.focus();
            e.preventDefault();
          } else {
            if (document.activeElement === lastfocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        }
      });
    }
    buttonListener();
  }
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
