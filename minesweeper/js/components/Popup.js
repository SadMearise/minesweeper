export default class Popup {
  static open(currentPopup) {
    if (currentPopup) {
      document.body.classList.add('lock');
      currentPopup.classList.add('open');

      currentPopup.addEventListener('click', (event) => {
        if (!event.target.closest('.popup__content')) {
          Popup.close(event.target.closest('.popup'));
        }
      });
    }
  }

  static close(popupActive) {
    popupActive.classList.remove('open');
    document.body.classList.remove('lock');
  }
}
