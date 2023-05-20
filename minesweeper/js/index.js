import App from './components/App.js';
import Minesweeper from './components/Minesweeper.js';
import LocalStorage from './components/LocalStorage.js';
// import Popup from './components/Popup.js';
// import { initDOM, convertPositionToArr } from './files/functions.js';

let minesweeperData = LocalStorage.checkLocalStorage('minesweeper');

minesweeperData = minesweeperData ? LocalStorage.getLocalStorage('minesweeper') : {};

const app = App.getStructure();
document.body.prepend(app);

const minesweeper = new Minesweeper(minesweeperData);
const minesweeperStructure = minesweeper.getStructure();
const board = document.querySelector('.board');
board.append(minesweeperStructure);

board.addEventListener('click', (event) => {
  console.log(event);
  const minesArr = minesweeper.getMines();
  console.log(minesArr);
  // const timerComponent = minesweeperElement.options.counterTimer.text.component;
  // const stepCounterComponent = minesweeperElement.options.counterSteps.text.component;
  // const { target } = event;
  // const cellPos = target.dataset.pos;
  // const [x, y] = convertPositionToArr(cellPos);

  // // добавить проверку на visited ячейку
  // minesweeper.stepCounter(stepCounterComponent);
  // if (!timerEnabled) {
  //   timerEnabled = true;
  //   timer = window.setInterval(() => { minesweeper.startTimer(timerComponent); }, 1000);
  // }

  // if (minesArr.includes(cellPos)) {
  //   if (firstClick) {
  //     const index = minesArr.indexOf(cellPos);

  //     firstClick = false;

  //     minesweeper.replaceMine(index);
  //     minesweeper.checkCells(minesweeperStructure, x, y);
  //   } else {
  //     minesweeperStructure[`row${x}`][`cell${y}`].component.getNode().classList.add('cell_mine');
  //     Minesweeper.endGame('mine', timer);
  //   }
  // } else {
  //   firstClick = false;
  //   minesweeper.checkCells(minesweeperStructure, x, y);
  // }
});




















// const app = new App();
// const appStructure = app.getStructure();
// const { page } = appStructure;
// const pageDOM = Object.assign(Object.create(Object.getPrototypeOf(page.component)), page.component);
// console.log(appStructure);
// const minesweeperElement = page.main.app.col2.minesweeper;
// const boardComponent = minesweeperElement.board.component;
// const newGameButtonComponent = minesweeperElement.button.component;
// const leaderboardButtonComponent = page.header.body.controlPanel.btn.component;

// const minesweeper = new Minesweeper(minesweeperData);
// const minesweeperStructure = minesweeper.getStructure();
// console.log(minesweeperElement);
// const keys = Object.keys(minesweeperStructure);
// for (let i = 0; i < keys.length; i += 1) {
//   minesweeperElement.board[`row${i}`] = minesweeperStructure[`row${i}`];
// }
// initDOM(page, pageDOM);
// document.body.prepend(pageDOM.getNode());

// let firstClick = true;
// let timerEnabled = false;
// let timer;

// appStructure.page.main.app.col2.minesweeper.board.component.getNode().addEventListener('click', (event) => {
// // boardComponent.getNode().addEventListener('click', (event) => {
//   console.log(event);
//   const minesArr = minesweeper.getMines();
//   const timerComponent = minesweeperElement.options.counterTimer.text.component;
//   const stepCounterComponent = minesweeperElement.options.counterSteps.text.component;
//   const { target } = event;
//   const cellPos = target.dataset.pos;
//   const [x, y] = convertPositionToArr(cellPos);

//   // добавить проверку на visited ячейку
//   minesweeper.stepCounter(stepCounterComponent);
//   if (!timerEnabled) {
//     timerEnabled = true;
//     timer = window.setInterval(() => { minesweeper.startTimer(timerComponent); }, 1000);
//   }

//   if (minesArr.includes(cellPos)) {
//     if (firstClick) {
//       const index = minesArr.indexOf(cellPos);

//       firstClick = false;

//       minesweeper.replaceMine(index);
//       minesweeper.checkCells(minesweeperStructure, x, y);
//     } else {
//       minesweeperStructure[`row${x}`][`cell${y}`].component.getNode().classList.add('cell_mine');
//       Minesweeper.endGame('mine', timer);
//     }
//   } else {
//     firstClick = false;
//     minesweeper.checkCells(minesweeperStructure, x, y);
//   }
// });

// boardComponent.getNode().addEventListener('contextmenu', (event) => {
//   event.preventDefault();

//   const { target } = event;
//   const [x, y] = convertPositionToArr(target.dataset.pos);
//   const minesweeperObj = minesweeper.getMinesweeperObj();
//   const { flag, visited } = minesweeperObj.board[`row${x}`][`cell${y}`];

//   if (visited) return;

//   if (flag) {
//     minesweeperObj.board[`row${x}`][`cell${y}`].flag = false;
//     minesweeperStructure[`row${x}`][`cell${y}`].component.getNode().classList.remove('cell_flag');
//   } else {
//     minesweeperObj.board[`row${x}`][`cell${y}`].flag = true;
//     minesweeperStructure[`row${x}`][`cell${y}`].component.getNode().classList.add('cell_flag');
//   }
// });

// // difficultMenuComponent.getNode().addEventListener('change', () => {
// //   console.log(this.value);
// // });

// newGameButtonComponent.getNode().addEventListener('click', () => {
//   boardComponent.destroy();
//   delete minesweeperElement.board;

//   const newStructure = minesweeper.newGame();
//   const mKeys = Object.keys(newStructure);
//   minesweeperElement.board = { component: App.getBoard() };
//   for (let i = 0; i < mKeys.length; i += 1) {
//     minesweeperElement.board[`row${i}`] = newStructure[`row${i}`];
//   }
//   initDOM(newStructure, minesweeperElement.board.component);
//   minesweeperElement.options.component.after(minesweeperElement.board.component);
//   console.log(appStructure.page.main.app.col2.minesweeper.board);
// });

// leaderboardButtonComponent.getNode().addEventListener('click', () => {
//   const leaderboardPopupStructure = app.getPopupStructure({ id: 1 }); // сюда будем передавать только что сформированный обновлённый объект
//   leaderboardPopupStructure.popup.component.destroy();
//   initDOM(leaderboardPopupStructure, pageDOM);
//   Popup.open(leaderboardPopupStructure.popup.component.getNode());
// });

// // подумать на счёт передачи отмены передачи minesweeperStructure в функции и
// // вместо этого получать структуру в самих методах
