import App from './components/App.js';
import Minesweeper from './components/Minesweeper.js';
import LocalStorage from './components/LocalStorage.js';
import { initDOM, convertPositionToArr } from './files/functions.js';

let minesweeperData = LocalStorage.checkLocalStorage('minesweeper');

minesweeperData = minesweeperData ? LocalStorage.getLocalStorage('minesweeper') : {};

const appElements = App.getStructure();
const { page } = appElements;
const pageDOM = Object.assign(Object.create(Object.getPrototypeOf(page.component)), page.component);

initDOM(page, pageDOM);

const board = page.main.app.col2.minesweeper.board.component;
const minesweeper = new Minesweeper(minesweeperData);
const minesweeperStructure = minesweeper.getStructure();

initDOM(minesweeperStructure, board);

document.body.prepend(pageDOM.getNode());

const minesArr = minesweeper.getMines();
let firstClick = true;

board.getNode().addEventListener('click', (event) => {
  const { target } = event;
  const cellPos = target.dataset.pos;
  const [x, y] = convertPositionToArr(cellPos);

  if (minesArr.includes(cellPos)) { // наткнулись на мину
    if (firstClick) { // если 1 клик, то прощаем
      const index = minesArr.indexOf(cellPos);

      firstClick = false;

      minesweeper.replaceMine(index);
      minesweeper.checkCells(minesweeperStructure, x, y);
    } else {
      minesweeperStructure[`row${x}`][`cell${y}`].component.getNode().classList.add('cell_mine');

      minesweeper.endGame();
    }
  } else {
    firstClick = false;

    minesweeper.checkCells(minesweeperStructure, x, y);
  }
});

board.getNode().addEventListener('contextmenu', (event) => {
  event.preventDefault();

  const { target } = event;
  const [x, y] = convertPositionToArr(target.dataset.pos);
  const minesweeperObj = minesweeper.getMinesweeperObj();
  const { flag, visited } = minesweeperObj.board[`row${x}`][`cell${y}`];

  if (visited) return;

  if (flag) {
    minesweeperObj.board[`row${x}`][`cell${y}`].flag = false;
    minesweeperStructure[`row${x}`][`cell${y}`].component.getNode().classList.remove('cell_flag');
  } else {
    minesweeperObj.board[`row${x}`][`cell${y}`].flag = true;
    minesweeperStructure[`row${x}`][`cell${y}`].component.getNode().classList.add('cell_flag');
  }
});
