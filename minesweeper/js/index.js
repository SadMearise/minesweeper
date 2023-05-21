import App from './components/App.js';
import Minesweeper from './components/Minesweeper.js';
import LocalStorage from './components/LocalStorage.js';
import Popup from './components/Popup.js';
import Sound from './components/Sound.js';
import { convertPositionToArr } from './files/functions.js';

let minesweeperData = LocalStorage.checkLocalStorage('minesweeper');

minesweeperData = minesweeperData ? LocalStorage.getLocalStorage('minesweeper') : {};

const app = new App();
let minesweeper = new Minesweeper(minesweeperData);

const minesweeperObj = minesweeper.getMinesweeperObj();
const appStructure = app.getStructure(minesweeperObj.countMines);
document.body.append(appStructure);
console.log('start', minesweeperObj); //
LocalStorage.setLocalStorage('minesweeper', minesweeperObj); //
console.log('start', minesweeperObj); //

let minesweeperStructure = minesweeper.getStructure();
const board = document.querySelector('.board');
board.append(minesweeperStructure);

const stepsNode = document.querySelector('.counter_steps .counter__text');
const timerNode = document.querySelector('.counter_timer .counter__text');

let minesArr = minesweeper.getMines();
board.addEventListener('click', (event) => {
  if (minesweeperObj.gameStatus !== 'active') return;

  const { target } = event;

  if (!target.classList.contains('cell')) return;
  if (target.classList.contains('cell_flag')) return;

  const cellPos = target.dataset.pos;
  const [x, y] = convertPositionToArr(cellPos);

  if (!minesweeperObj.board[`row${x}`][`cell${y}`].visited) minesweeper.stepCounter(stepsNode);
  if (!minesweeperObj.interval) {
    minesweeper.setMinesweeperValue = {
      interval: window.setInterval(() => {
        minesweeper.startTimer(timerNode);
        LocalStorage.setLocalStorage('minesweeper', minesweeperObj); //
      }, 1000),
    };
  }

  const cellNode = document.querySelector(`.cell[data-pos="${x}-${y}"]`);
  if (minesArr.includes(cellPos)) {
    if (minesweeperObj.firstClick) {
      const index = minesArr.indexOf(cellPos);

      minesweeperObj.firstClick = false;

      minesArr = minesweeper.getReplacedMines(index);
      minesweeper.checkCells(cellNode, x, y);
    } else {
      target.classList.add('cell_mine');
      minesweeper.endGame('mine');
    }
  } else {
    minesweeperObj.firstClick = false;
    minesweeper.checkCells(cellNode, x, y);
  }

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj); //
});

board.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  if (minesweeperObj.gameStatus !== 'active') return;

  const { target } = event;
  const [x, y] = convertPositionToArr(target.dataset.pos);
  const { flag, visited } = minesweeperObj.board[`row${x}`][`cell${y}`];

  if (visited) return;

  const sound = new Sound();
  sound.musicPath = '/minesweeper/assets/flagged.mp3';
  sound.on();

  if (flag) {
    minesweeperObj.board[`row${x}`][`cell${y}`].flag = false;
    target.classList.remove('cell_flag');
    minesweeper.flagsCounter(false);
  } else {
    minesweeperObj.board[`row${x}`][`cell${y}`].flag = true;
    target.classList.add('cell_flag');
    minesweeper.flagsCounter();
  }

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj); //
});

const minesweeperNewGameButton = document.querySelector('.minesweeper__button');

minesweeperNewGameButton.addEventListener('click', () => {
  const newMinesArr = minesweeper.newGame(board, stepsNode, timerNode);
  minesArr = newMinesArr;

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj); //
});

const difficultMenu = document.querySelector('.difficult-menu__select');

difficultMenu.addEventListener('change', function select() {
  minesweeper = new Minesweeper({ difficult: this.value.toLowerCase() });

  minesweeperStructure = minesweeper.getStructure();

  const newMinesArr = minesweeper.newGame(board, stepsNode, timerNode);
  minesArr = newMinesArr;

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj); //
});

const customButton = document.getElementById('custom-button');

customButton.addEventListener('click', () => {
  const popup = App.getPopup('Custom', 'Options', false, true, true);

  document.body.append(popup);

  const elementhWithMaxLength = document.querySelectorAll('[maxlength]');

  elementhWithMaxLength.forEach((el) => {
    el.addEventListener('input', function s() {
      this.value = this.value.substr(0, el.getAttribute('maxlength'));
    });
  });

  const popupNode = document.getElementById('popupCustom');
  Popup.open(popupNode);

  const popupSaveButton = document.querySelector('.popup .btn_save');

  popupSaveButton.addEventListener('click', () => {
    const input = document.querySelector('.popup .field__input');

    minesweeper.setMinesweeperValue = { countMines: input.value };
    const newMinesArr = minesweeper.newGame(board, stepsNode, timerNode);
    minesArr = newMinesArr;
  });

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj); //
});

const leaderboardButton = document.getElementById('leaderboard');

leaderboardButton.addEventListener('click', () => {
  const popup = App.getPopup('Leaderboard', 'Last results', false, false, false, minesweeperObj.leaderboard);

  document.body.append(popup);

  const popupNode = document.getElementById('popupLeaderboard');
  Popup.open(popupNode);

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj); //
});

const switchNode = document.getElementById('switch-theme');
const checkTheme = LocalStorage.checkLocalStorage('theme');
const theme = checkTheme ? LocalStorage.getLocalStorage('theme') : 'default';

if (theme === 'light') {
  document.body.classList.add('theme', 'theme_light');
  switchNode.checked = true;
}

switchNode.addEventListener('click', (event) => {
  if (event.target.checked) {
    LocalStorage.setLocalStorage('theme', 'light');
    document.body.classList.add('theme', 'theme_light');
  } else {
    LocalStorage.setLocalStorage('theme', 'default');
    document.body.classList.remove('theme', 'theme_light');
  }
});
