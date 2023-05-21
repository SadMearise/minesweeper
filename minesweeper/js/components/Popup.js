import Sound from './Sound.js';

export default class Popup {
  static open(currentPopup, sound = false) {
    if (currentPopup) {
      document.body.classList.add('lock');
      currentPopup.classList.add('open');

      const popupCloseButtons = document.querySelectorAll('.close-popup');

      popupCloseButtons.forEach((btn) => {
        btn.addEventListener('click', (event) => {
          const popup = event.target.closest('.popup');

          if (sound) sound.off();
          Popup.close(popup);
          popup.remove();
        });
      });
    }
  }

  static close(popupActive) {
    popupActive.classList.remove('open');
    document.body.classList.remove('lock');
  }
}
