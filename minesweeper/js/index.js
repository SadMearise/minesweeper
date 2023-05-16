import BaseComponent from './components/BaseComponent.js';
import App from './components/App.js';
import Minesweeper from './components/Minesweeper.js';

// const o = new App();
// console.log(o.getStructure());

const elements = App.getElements();

const { page } = elements;
// const {
//   page, header, main, footer, app, appTitle, appDescription, appMinesweeper,
// } = elements;
// page.append(header);
// page.append(main);
// page.append(footer);

// main.append(app);
// elements.appCol.forEach((el) => {
//   app.append(el);
// });

// footer.getNode().addEventListener('click', (event) => console.log(event));
// document.body.prepend(page.getNode());

// console.log(Object.getPrototypeOf(elements.page.component));
// console.log(Object.create(Object.getPrototypeOf(elements.page.component)));
// console.log(Object.create(Object.prototype(elements)));

const pageDOM = Object.assign(Object.create(Object.getPrototypeOf(page.component)), page.component);

function initDOM(from, to) {
  const keys = Object.keys(from);
  // console.log(keys);
  if (keys) {
    const keysLength = keys.length;
    if (keysLength > 1) {
      for (let i = 1; i < keysLength; i += 1) {
        const key = keys[i];
        to.append(from[key].component);

        initDOM(from[key], from[key].component);
      }
    }
  }
}

initDOM(page, pageDOM);
document.body.prepend(pageDOM.getNode());
const board = page.main.app.appCol2.appMinesweeper.minesweeperBoard;
const minesweeperInstance = new Minesweeper(board);
const minesweeperStructure = minesweeperInstance.getElements();

// initDOM(minesweeperStructure, board);
