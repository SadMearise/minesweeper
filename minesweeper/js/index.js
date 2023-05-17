import App from './components/App.js';
import Minesweeper from './components/Minesweeper.js';
import { initDOM } from './files/functions.js';

const appElements = App.getStructure();
const { page } = appElements;

const pageDOM = Object.assign(Object.create(Object.getPrototypeOf(page.component)), page.component);
initDOM(page, pageDOM);

const board = page.main.app.appCol2.appMinesweeper.minesweeperBoard.component;
const minesweeperInstance = new Minesweeper(board);
const minesweeperStructure = minesweeperInstance.getStructure();
initDOM(minesweeperStructure, board);

document.body.prepend(pageDOM.getNode());

const minesArr = minesweeperInstance.getMines();

const firstClick = true;

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
//     // сюда вписываем алгоритм открытия поля
//   }
// });

board.getNode().addEventListener('contextmenu', (event) => {
  event.preventDefault();
  const { target } = event;

  if (target.classList.value === 'board__cell cell') target.classList.add('cell_flag');
  else if (target.classList.contains('cell_flag')) target.classList.remove('cell_flag');
});

minesweeperInstance.getCountMinesAroundCell();
