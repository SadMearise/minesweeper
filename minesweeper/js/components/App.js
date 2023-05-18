import BaseComponent from './BaseComponent.js';

export default class App {
  static getStructure() {
    const structure = {};

    const pageComponent = new BaseComponent({ classNames: ['page'] });

    const headerComponent = new BaseComponent({ tagName: 'header', classNames: ['header', 'container'] });
    const headerBodyComponent = new BaseComponent({ tagName: 'div', classNames: ['header__body'] });
    const headerControlPanelComponent = new BaseComponent({ tagName: 'div', classNames: ['header__control-panel'] });

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

    const optionsCounterStepsComponent = new BaseComponent({ tagName: 'div', classNames: ['options__counter', 'counter', 'counter_steps'], textContent: '000' });
    const optionsCustomComponent = new BaseComponent({ tagName: 'div', classNames: ['options__custom'] });
    const optionsCounterTimerComponent = new BaseComponent({ tagName: 'div', classNames: ['options__counter', 'counter', 'counter_timer'], textContent: '000' });

    const difficultMenuComponent = new BaseComponent({ tagName: 'div', classNames: ['options__difficult-menu', 'difficult-menu'] });
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
    minesweeper.options.difficultMenu = { component: difficultMenuComponent };
    minesweeper.options.difficultMenu.select = { component: difficultMenuSelectComponent };
    minesweeper.options.difficultMenu.select.option1 = { component: difficultMenuOption1Component };
    minesweeper.options.difficultMenu.select.option2 = { component: difficultMenuOption2Component };
    minesweeper.options.difficultMenu.select.option3 = { component: difficultMenuOption3Component };
    minesweeper.options.custom = { component: optionsCustomComponent };
    minesweeper.options.counterTimer = { component: optionsCounterTimerComponent };
    minesweeper.board = { component: minesweeperBoardComponent };
    minesweeper.button = { component: minesweeperButtonComponent };
    page.footer = { component: footerComponent };
    page.footer.copy = { component: footerCopyComponent };

    return structure;
  }
}
