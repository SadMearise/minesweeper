import App from './components/App.js';
import Minesweeper from './components/Minesweeper.js';
import LocalStorage from './components/LocalStorage.js';
import { initDOM } from './files/functions.js';

let minesweeperData = LocalStorage.checkLocalStorage('minesweeper');

minesweeperData = minesweeperData ? LocalStorage.getLocalStorage('minesweeper') : {};

const appElements = App.getStructure();
const { page } = appElements;
const pageDOM = Object.assign(Object.create(Object.getPrototypeOf(page.component)), page.component);
initDOM(page, pageDOM);

const board = page.main.app.col2.minesweeper.board.component;
const minesweeperInstance = new Minesweeper(minesweeperData);
const minesweeperStructure = minesweeperInstance.getStructure();
initDOM(minesweeperStructure, board);

document.body.prepend(pageDOM.getNode());

const minesArr = minesweeperInstance.getMines();
console.log(minesArr);

let firstClick = true;

// board.getNode().addEventListener('click', (event) => {
//   const { target } = event;
//   const cellPos = target.dataset.pos;

//   if (minesArr.includes(cellPos)) { // наткнулись на мину
//     if (firstClick) { // если 1 клик, то прощаем
//       firstClick = false;
//       const index = minesArr.indexOf(cellPos);
//       minesweeperInstance.replaceMine(index);
//     } else {
//       minesweeperInstance.endGame();
//     }
//   } else { // не наткнулись на мину
//     firstClick = false;
//     minesweeperInstance.openCells(minesweeperStructure, cellPos);
//   }
// });

// board.getNode().addEventListener('contextmenu', (event) => {
//   event.preventDefault();
//   const { target } = event;

// });
