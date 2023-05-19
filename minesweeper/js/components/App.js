import BaseComponent from './BaseComponent.js';

export default class App {
  constructor({ timer = '000', steps = '000' } = {}) {
    this.timer = timer;
    this.steps = steps;
  }

  getStructure() {
    const structure = {};

    const pageComponent = new BaseComponent({ tagName: 'div', classNames: ['page'] });

    const headerComponent = new BaseComponent({ tagName: 'header', classNames: ['header', 'container'] });
    const headerBodyComponent = new BaseComponent({ tagName: 'div', classNames: ['header__body'] });
    const headerControlPanelComponent = new BaseComponent({ tagName: 'div', classNames: ['header__control-panel'] });

    const controlPanelBtnComponent = new BaseComponent({ tagName: 'button', classNames: ['btn', 'popup-link'], textContent: 'Leaderboard' });

    const switchComponent = new BaseComponent({ tagName: 'div', classNames: ['switch'] });
    const switchInputComponent = new BaseComponent({ tagName: 'input', classNames: ['switch__input'], attributes: { id: 'switch-theme', type: 'checkbox' } });
    const switchLabelComponent = new BaseComponent({ tagName: 'label', classNames: ['switch__label'], attributes: { for: 'switch-theme' } });

    const mainComponent = new BaseComponent({ tagName: 'main', classNames: ['main', 'container'] });

    const appComponent = new BaseComponent({ tagName: 'div', classNames: ['app'] });
    const appCol1Component = new BaseComponent({ tagName: 'div', classNames: ['app__col'] });
    const appCol2Component = new BaseComponent({ tagName: 'div', classNames: ['app__col'] });
    const appTitleComponent = new BaseComponent({ tagName: 'h1', classNames: ['app__title'], textContent: 'Minesweeper' });
    const appDescriptionComponent = new BaseComponent({
      tagName: 'p',
      classNames: ['app__description'],
      textContent: 'Minesweeper is single-player logic-based computer game played on rectangular board whose object is to locate a predetermined number of randomly-placed "mines" in the shortest possible time by clicking on "safe" squares while avoiding the squares with mines. If the player clicks on a mine, the game ends. Otherwise, a number between 0 and 8 is displayed that identifies the total number of mines present in the eight neighboring squares. Therefore, finding a square containing "8" indicated that all eight adjacent squares contain mines, while if a zero (displayed as a blank) is uncovered, there are no mines in the surrounding squares. A square suspected of containing a mine may be marked with flag.',
    });

    const minesweeperComponent = new BaseComponent({ tagName: 'div', classNames: ['app__minesweeper', 'minesweeper'] });
    const minesweeperHeaderComponent = new BaseComponent({ tagName: 'div', classNames: ['minesweeper__header', 'options'] });
    const minesweeperBoardComponent = new BaseComponent({ tagName: 'div', classNames: ['minesweeper__board', 'board'] });
    const minesweeperButtonComponent = new BaseComponent({
      tagName: 'button', classNames: ['minesweeper__button', 'btn', 'btn-primary'], attributes: { type: 'button' }, textContent: 'New game',
    });

    const optionsCounterStepsComponent = new BaseComponent({ tagName: 'div', classNames: ['options__item', 'counter', 'counter_steps'] });
    const counterStepsIcon = new BaseComponent({ tagName: 'img', classNames: ['counter__icon'], attributes: { src: './img/steps.svg', alt: 'steps' } });
    const counterStepsText = new BaseComponent({ tagName: 'span', classNames: ['counter__text'], textContent: `${this.steps}` });

    const optionsCustomComponent = new BaseComponent({ tagName: 'button', classNames: ['options__item', 'btn'], textContent: 'Custom' });
    const optionsCounterTimerComponent = new BaseComponent({ tagName: 'div', classNames: ['options__item', 'counter', 'counter_timer'] });
    const counterTimerIcon = new BaseComponent({ tagName: 'img', classNames: ['counter__icon'], attributes: { src: './img/timer.svg', alt: 'timer' } });
    const counterTimerText = new BaseComponent({ tagName: 'span', classNames: ['counter__text'], textContent: `${this.timer}` });

    const difficultMenuComponent = new BaseComponent({ tagName: 'div', classNames: ['options__item', 'difficult-menu'] });
    const difficultMenuSelectComponent = new BaseComponent({ tagName: 'select', classNames: ['difficult-menu__select'], attributes: { name: 'difficult-menu' } });
    const difficultMenuOption1Component = new BaseComponent({
      tagName: 'option', classNames: ['difficult-menu__option'], textContent: 'Easy', attributes: { value: 'Easy' },
    });
    const difficultMenuOption2Component = new BaseComponent({
      tagName: 'option', classNames: ['difficult-menu__option'], textContent: 'Medium', attributes: { value: 'Medium' },
    });
    const difficultMenuOption3Component = new BaseComponent({
      tagName: 'option', classNames: ['difficult-menu__option'], textContent: 'Hard', attributes: { value: 'Hard' },
    });

    const footerComponent = new BaseComponent({ tagName: 'footer', classNames: ['footer', 'container'] });
    const footerCopyComponent = new BaseComponent({ tagName: 'span', classNames: ['footer__copy'], textContent: '© SadMearise' });

    structure.page = { component: pageComponent };

    const { page } = structure;

    page.header = { component: headerComponent };

    const { header } = page;

    header.body = { component: headerBodyComponent };
    header.body.controlPanel = { component: headerControlPanelComponent };
    header.body.controlPanel.btn = { component: controlPanelBtnComponent };
    header.body.controlPanel.switch = { component: switchComponent };
    header.body.controlPanel.switch.input = { component: switchInputComponent };
    header.body.controlPanel.switch.label = { component: switchLabelComponent };

    page.main = { component: mainComponent };
    page.main.app = { component: appComponent };

    const { app } = page.main;

    app.col1 = { component: appCol1Component };
    app.col2 = { component: appCol2Component };
    app.col1.title = { component: appTitleComponent };
    app.col1.description = { component: appDescriptionComponent };
    app.col2.minesweeper = { component: minesweeperComponent };

    const { minesweeper } = app.col2;

    minesweeper.options = { component: minesweeperHeaderComponent };
    minesweeper.options.counterSteps = { component: optionsCounterStepsComponent };
    minesweeper.options.counterSteps.icon = { component: counterStepsIcon };
    minesweeper.options.counterSteps.text = { component: counterStepsText };
    minesweeper.options.difficultMenu = { component: difficultMenuComponent };
    minesweeper.options.difficultMenu.select = { component: difficultMenuSelectComponent };
    minesweeper.options.difficultMenu.select.option1 = { component: difficultMenuOption1Component };
    minesweeper.options.difficultMenu.select.option2 = { component: difficultMenuOption2Component };
    minesweeper.options.difficultMenu.select.option3 = { component: difficultMenuOption3Component };
    minesweeper.options.custom = { component: optionsCustomComponent };
    minesweeper.options.counterTimer = { component: optionsCounterTimerComponent };
    minesweeper.options.counterTimer.icon = { component: counterTimerIcon };
    minesweeper.options.counterTimer.text = { component: counterTimerText };
    minesweeper.board = { component: minesweeperBoardComponent };
    minesweeper.button = { component: minesweeperButtonComponent };
    page.footer = { component: footerComponent };
    page.footer.copy = { component: footerCopyComponent };

    return structure;
  }

  static getBoard() {
    return new BaseComponent({ tagName: 'div', classNames: ['minesweeper__board', 'board'] });
  }

  getPopupStructure({
    id = null, title = null, text = null, field = null, leaderboard = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.leaderboard = leaderboard;
    this.text = text;
    this.field = field;
    // leaderboard = {
    //   row1: {
    //     item1: 1,
    //     item2: 172,
    //     item3: 4,
    //   }
    // }
    const structure = {
      component: '',
    };

    const popupComponent = new BaseComponent({ tagName: 'div', classNames: ['popup'], attributes: { id: `popup${this.id}` } });
    const popupBodyComponent = new BaseComponent({ tagName: 'div', classNames: ['popup__body'] });
    const popupWrapperComponent = new BaseComponent({ tagName: 'div', classNames: ['popup__wrapper'] });
    const popupContentComponent = new BaseComponent({ tagName: 'div', classNames: ['popup__content'] });

    if (this.title !== null) {
      const popupTitleComponent = new BaseComponent({ tagName: 'h3', classNames: ['popup__title'], textContent: `${this.title}` });
      structure.popup.body.wrapper.content.title = { component: popupTitleComponent };
    }

    if (this.text !== null) {
      const popupTextComponent = new BaseComponent({ tagName: 'p', classNames: ['popup__text'], textContent: `${this.text}` });
      structure.popup.body.wrapper.content.text = { component: popupTextComponent };
    }

    const popupRowComponent = new BaseComponent({ tagName: 'div', classNames: ['popup__row'] });
    const popupSaveButtonComponent = new BaseComponent({ tagName: 'button', classNames: ['popup__button', 'btn', 'btn_save'], textContent: 'Save' });
    const popupCloseButtonComponent = new BaseComponent({ tagName: 'button', classNames: ['popup__button', 'btn', 'btn_close', 'close-popup'], textContent: 'Close' });

    if (this.leaderboard !== null) {
      const keys = Object.keys(this.leaderboard);
      const keysLength = keys.length;

      for (let i = 0; i < keysLength; i += 1) {
        const leaderboardItemComponent = new BaseComponent({ tagName: 'div', classNames: ['leaderboard-list__item'] });
        structure.popup.body.wrapper.content.leaderboard[`item${i}`] = { component: leaderboardItemComponent };

        for (let j = 0; j < 3; j += 1) {
          const leaderboardTextComponent = new BaseComponent({ tagName: 'div', classNames: ['leaderboard-list__text'], textContent: `${this.leaderboard[`row${i}`][`item${j}`]}` });
          structure.popup.body.wrapper.content.leaderboard[`item${i}`][`text${j}`] = { component: leaderboardTextComponent };
        }
      }
    }

    const leaderboardListComponent = new BaseComponent({ tagName: 'div', classNames: ['leaderboard-list'] });

    if (this.field !== null) {
      const fieldComponent = new BaseComponent({ tagName: 'div', classNames: ['field'] });
      const fieldLabelComponent = new BaseComponent({ tagName: 'label', classNames: ['field__label'] });
      const fieldInputComponent = new BaseComponent({
        tagName: 'input',
        classNames: ['field__input'],
        attributes: {
          type: 'number', max: '99', min: '1', maxlength: '2',
        },
      });

      structure.popup.body.wrapper.content.field = { component: fieldComponent };
      structure.popup.body.wrapper.content.field.label = { component: fieldLabelComponent };
      structure.popup.body.wrapper.content.field.input = { component: fieldInputComponent };
    }

    structure.popup = { component: popupComponent };
    structure.popup.body = { component: popupBodyComponent };
    structure.popup.body.wrapper = { component: popupWrapperComponent };
    structure.popup.body.wrapper.content = { component: popupContentComponent };

    structure.popup.body.wrapper.content.leaderboard = { component: leaderboardListComponent };

    structure.popup.body.wrapper.content.row = { component: popupRowComponent };
    structure.popup.body.wrapper.content.row.saveButton = { component: popupSaveButtonComponent };
    structure.popup.body.wrapper.content.row.closeButton = { component: popupCloseButtonComponent };

    return structure;
  }
}
