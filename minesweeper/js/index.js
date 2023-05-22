import App from './components/App.js';
import Minesweeper from './components/Minesweeper.js';
import LocalStorage from './components/LocalStorage.js';
import Popup from './components/Popup.js';
import Sound from './components/Sound.js';
import { convertPositionToArr } from './files/functions.js';

let minesweeperData = LocalStorage.checkLocalStorage('minesweeper');

minesweeperData = minesweeperData ? LocalStorage.getLocalStorage('minesweeper') : {};

const app = new App();
const minesweeper = new Minesweeper(minesweeperData);

const minesweeperObj = minesweeper.getMinesweeperObj();
const appStructure = app.getStructure(minesweeperObj.countMines);
document.body.prepend(appStructure);

const minesweeperStructure = minesweeper.getStructure(Object.keys(minesweeperData).length > 0);

const board = document.querySelector('.board');
board.append(minesweeperStructure);

let minesArr = [];

if (Object.keys(minesweeperData).length > 0) {
  const stepsNode = document.querySelector('.counter_steps .counter__text');
  const timerNode = document.querySelector('.counter_timer .counter__text');

  const stepsLength = `${minesweeperObj.steps}`.length;

  let text = '';
  if (stepsLength === 1) text = '00';
  if (stepsLength === 2) text = '0';

  stepsNode.innerText = `${text}${minesweeperObj.steps}`;

  const timerLength = `${minesweeperObj.timer}`.length;

  let text2 = '';
  if (timerLength === 1) text2 = '00';
  if (timerLength === 2) text2 = '0';

  timerNode.innerText = `${text2}${minesweeperObj.timer}`;

  if (minesweeperObj.interval && minesweeperObj.gameStatus === 'active') {
    minesweeper.setMinesweeperValue = {
      interval: window.setInterval(() => {
        minesweeper.startTimer(timerNode);
        LocalStorage.setLocalStorage('minesweeper', minesweeperObj);
      }, 1000),
    };
  }

  minesweeper.displayUpdatedFlagsCounter();

  const difficultMenu = document.querySelector('.difficult-menu__select');
  difficultMenu.value = minesweeperObj.difficult[0].toUpperCase()
  + minesweeperObj.difficult.slice(1);

  const currentBoardLength = Object.keys(minesweeperObj.currentBoard).length;

  for (let x = 0; x < currentBoardLength; x += 1) {
    for (let y = 0; y < currentBoardLength; y += 1) {
      const cell = document.querySelector(`[data-pos="${x}-${y}"]`);

      if (minesweeperObj.currentBoard[`row${x}`][`cell${y}`].flag === true) {
        cell.classList.add('cell_flag');
      }
      if (minesweeperObj.currentBoard[`row${x}`][`cell${y}`].mine === true) {
        cell.classList.add('cell_mine');
      }
      if (minesweeperObj.currentBoard[`row${x}`][`cell${y}`].minesAround !== false) {
        if (minesweeperObj.currentBoard[`row${x}`][`cell${y}`].minesAround > 0) {
          cell.classList.add('cell_opened', `cell_count-mines_${minesweeperObj.currentBoard[`row${x}`][`cell${y}`].minesAround}`);
          cell.innerText = minesweeperObj.currentBoard[`row${x}`][`cell${y}`].minesAround;
        } else {
          cell.classList.add('cell_opened');
        }
      }
    }
  }

  minesArr.push(...minesweeperObj.mines);
} else {
  minesArr = minesweeper.getMines();
}

LocalStorage.setLocalStorage('minesweeper', minesweeperObj);

const stepsNode = document.querySelector('.counter_steps .counter__text');
const timerNode = document.querySelector('.counter_timer .counter__text');

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
        LocalStorage.setLocalStorage('minesweeper', minesweeperObj);
      }, 1000),
    };
  }

  const cellNode = document.querySelector(`.cell[data-pos="${x}-${y}"]`);

  if (!target.classList.contains('cell_opened')) {
    const sound = new Sound();
    sound.musicPath = '/minesweeper/assets/open.mp3';
    sound.on();
  }

  if (minesArr.includes(cellPos)) {
    if (minesweeperObj.firstClick) {
      const index = minesArr.indexOf(cellPos);

      minesweeperObj.firstClick = false;

      minesArr = minesweeper.getReplacedMines(index);
      minesweeper.checkCells(cellNode, x, y);
    } else {
      target.classList.add('cell_mine');
      minesweeperObj.currentBoard[`row${x}`][`cell${y}`].mine = true;
      minesweeper.endGame('mine');
    }
  } else {
    minesweeperObj.firstClick = false;
    minesweeper.checkCells(cellNode, x, y);
  }

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj);
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
    minesweeperObj.currentBoard[`row${x}`][`cell${y}`].flag = false; // rewrite to 'set'
    minesweeper.displayUpdatedFlagsCounter(false);
  } else {
    minesweeperObj.board[`row${x}`][`cell${y}`].flag = true;
    target.classList.add('cell_flag');
    minesweeperObj.currentBoard[`row${x}`][`cell${y}`].flag = true; // rewrite to 'set'
    minesweeper.displayUpdatedFlagsCounter(true);
  }

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj);
});

const minesweeperNewGameButton = document.querySelector('.minesweeper__button');

minesweeperNewGameButton.addEventListener('click', () => {
  const newMinesArr = minesweeper.newGame(board, stepsNode, timerNode);
  minesArr = newMinesArr;

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj);
});

const difficultMenu = document.querySelector('.difficult-menu__select');

difficultMenu.addEventListener('change', function select() {
  const value = this.value.toLowerCase();

  let mines;
  if (value === 'easy') mines = 10;
  else if (value === 'medium') mines = 15;
  else if (value === 'hard') mines = 25;

  minesweeper.setMinesweeperValue = { countMines: mines };
  minesweeper.setMinesweeperValue = { difficult: value };

  const newMinesArr = minesweeper.newGame(board, stepsNode, timerNode);
  minesArr = newMinesArr;

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj);
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
    let mines = 0;

    if (input.value < 10) mines = 10;
    else mines = input.value;

    minesweeper.setMinesweeperValue = { countMines: mines };

    const newMinesArr = minesweeper.newGame(board, stepsNode, timerNode);
    minesArr = newMinesArr;
  });

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj);
});

const leaderboardButton = document.getElementById('leaderboard');

leaderboardButton.addEventListener('click', () => {
  const popup = App.getPopup('Leaderboard', 'Last results', false, false, false, minesweeperObj.leaderboard);

  document.body.prepend(popup);

  const popupNode = document.getElementById('popupLeaderboard');
  Popup.open(popupNode);

  LocalStorage.setLocalStorage('minesweeper', minesweeperObj);
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
