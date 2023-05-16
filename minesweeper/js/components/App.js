import BaseComponent from './BaseComponent.js';

export default class App {
  static getElements() {
    const structure = {
      page: {
        component: new BaseComponent({ classNames: ['page'] }),
        header: {
          component: new BaseComponent({ tagName: 'header', classNames: ['header', 'container'] }),
        },
        main: {
          component: new BaseComponent({ tagName: 'main', classNames: ['main', 'container'] }),
          app: {
            component: new BaseComponent({ tagName: 'div', classNames: ['app'] }),
            appCol1: {
              component: new BaseComponent({ tagName: 'div', classNames: ['app__col'] }),
              appTitle: {
                component: new BaseComponent({ tagName: 'h1', classNames: ['app__title'], textContent: 'Minesweeper' }),
              },
              appDescription: {
                component: new BaseComponent({
                  tagName: 'p',
                  classNames: ['app__description'],
                  textContent: 'Minesweeper is single-player logic-based computer game played on rectangular board whose object is to locate a predetermined number of randomly-placed "mines" in the shortest possible time by clicking on "safe" squares while avoiding the squares with mines. If the player clicks on a mine, the game ends. Otherwise, a number between 0 and 8 is displayed that identifies the total number of mines present in the eight neighboring squares. Therefore, finding a square containing "8" indicated that all eight adjacent squares contain mines, while if a zero (displayed as a blank) is uncovered, there are no mines in the surrounding squares. A square suspected of containing a mine may be marked with flag.',
                }),
              },
            },
            appCol2: {
              component: new BaseComponent({ tagName: 'div', classNames: ['app__col'] }),
              appMinesweeper: {
                component: new BaseComponent({ tagName: 'div', classNames: ['app__minesweeper', 'minesweeper'] }),
                minesweeperHeader: {
                  component: new BaseComponent({ tagName: 'div', classNames: ['minesweeper__header', 'options'] }),
                },
                minesweeperBoard: {
                  component: new BaseComponent({ tagName: 'div', classNames: ['minesweeper__board', 'board'] }),
                },
                minesweeperButton: {
                  component: new BaseComponent({
                    tagName: 'button', classNames: ['minesweeper__button', 'btn', 'btn-primary'], attributes: { type: 'button' }, textContent: 'New game',
                  }),
                },
              },
            },
          },
        },
        footer: {
          component: new BaseComponent({ tagName: 'footer', classNames: ['footer', 'container'] }),
        },
      },
    };

    return structure;
  }
  // static getElements() {
  //   const elements = {
  //     page: new BaseComponent({ classNames: ['page'] }),
  //     header: new BaseComponent({ tagName: 'header', classNames: ['header', 'container'] }),
  //     main: new BaseComponent({ tagName: 'main', classNames: ['main', 'container'] }),
  //     app: new BaseComponent({ tagName: 'div', classNames: ['app'] }),
  //     appCol: [
  //       new BaseComponent({ tagName: 'div', classNames: ['app__col'] }),
  //       new BaseComponent({ tagName: 'div', classNames: ['app__col'] }),
  //     ],
  // appTitle: new BaseComponent({ tagName: 'h1', classNames: ['app__title'], textContent: 'Minesweeper' }),
  // appDescription: new BaseComponent({ tagName: 'p', classNames: ['app__description'], textContent: 'Minesweeper is single-player logic-based computer game played on rectangular board whose object is to locate a predetermined number of randomly-placed "mines" in the shortest possible time by clicking on "safe" squares while avoiding the squares with mines. If the player clicks on a mine, the game ends. Otherwise, a number between 0 and 8 is displayed that identifies the total number of mines present in the eight neighboring squares. Therefore, finding a square containing "8" indicated that all eight adjacent squares contain mines, while if a zero (displayed as a blank) is uncovered, there are no mines in the surrounding squares. A square suspected of containing a mine may be marked with flag.' }),
  //     appMinesweeper: new BaseComponent({ tagName: 'div', classNames: ['app__minesweeper', 'minesweeper'] }),
  //     footer: new BaseComponent({ tagName: 'footer', classNames: ['footer', 'container'] }),
  //     footerCopy: new BaseComponent({ tagName: 'span', classNames: ['footer__copy', 'container'], textContent: '© SadMearise' }),
  //   };

  //   return elements;
  // }

  // добавить метод который будет собирать весь дом
}
