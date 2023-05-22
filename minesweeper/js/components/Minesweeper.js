import { randomIndex, convertPositionToArr } from '../files/functions.js';
import LocalStorage from './LocalStorage.js';
import App from './App.js';
import Popup from './Popup.js';
import Sound from './Sound.js';

export default class Minesweeper {
  constructor({
    timer = 0, steps = 0, countMines = 0, difficult = 'easy', mines = [], board = {}, leaderboard = [], gameStatus = 'active', interval = false, firstClick = true, flags = 0, currentBoard = {},
  } = {}) {
    this.minesweeper = {
      timer,
      steps,
      countMines,
      difficult,
      mines,
      board,
      gameStatus,
      leaderboard,
      interval,
      firstClick,
      flags,
      currentBoard,
    };

    if (this.minesweeper.difficult === 'easy') this.lines = 10;
    else if (this.minesweeper.difficult === 'medium') this.lines = 15;
    else if (this.minesweeper.difficult === 'hard') this.lines = 25;

    if (this.minesweeper.countMines === 0) this.minesweeper.countMines = this.lines;
  }

  set setMinesweeperValue(value) {
    if (value.countMines) this.minesweeper.countMines = value.countMines;
    if (value.interval) this.minesweeper.interval = value.interval;
    if (value.difficult) {
      this.minesweeper.difficult = value.difficult;
      if (this.minesweeper.difficult === 'easy') this.lines = 10;
      else if (this.minesweeper.difficult === 'medium') this.lines = 15;
      else if (this.minesweeper.difficult === 'hard') this.lines = 25;
    }
  }

  getStructure(lsState = false) {
    const structure = document.createDocumentFragment();

    for (let x = 0; x < this.lines; x += 1) {
      const row = document.createElement('div');
      row.classList.add('board__row');

      if (lsState === false) {
        this.minesweeper.board[`row${x}`] = {};
        this.minesweeper.currentBoard[`row${x}`] = {};
      }

      for (let y = 0; y < this.lines; y += 1) {
        const cell = document.createElement('div');
        cell.classList.add('board__cell', 'cell');
        cell.setAttribute('data-pos', `${x}-${y}`);
        row.append(cell);

        if (lsState === false) {
          this.minesweeper.board[`row${x}`][`cell${y}`] = {
            flag: false,
            mine: false,
            visited: false,
            minesAround: false,
          };

          this.minesweeper.currentBoard[`row${x}`][`cell${y}`] = {
            flag: false,
            mine: false,
            minesAround: false,
          };
        }
      }

      structure.append(row);
    }

    return structure;
  }

  getMinesweeperObj() {
    return this.minesweeper;
  }

  getMines() {
    this.minesweeper.mines = [];

    for (let i = 0; i < this.minesweeper.countMines; i += 1) {
      const index = this.#getPairIndexes();
      this.minesweeper.mines.push(index);
    }

    this.#addInfoAboutMinesToCells();
    return this.minesweeper.mines;
  }

  getReplacedMines(index) {
    const [oldMineX, oldMineY] = convertPositionToArr(this.minesweeper.mines[index]);

    this.minesweeper.board[`row${oldMineX}`][`cell${oldMineY}`].mine = false;

    const newMinePosition = this.#getPairIndexes();
    const [newMineX, newMineY] = convertPositionToArr(newMinePosition);

    this.minesweeper.board[`row${newMineX}`][`cell${newMineY}`].mine = true;

    this.minesweeper.mines[index] = newMinePosition;

    this.#addInfoAboutMinesToCells();

    return this.minesweeper.mines;
  }

  clickCell(x, y) {
    const { minesAround, mine } = this.minesweeper.board[`row${x}`][`cell${y}`];
    if (this.minesweeper.board[`row${x}`][`cell${y}`].visited) return;

    const node = document.querySelector(`.cell[data-pos="${x}-${y}"]`);

    if (node.classList.contains('cell_flag')) {
      this.displayUpdatedFlagsCounter(false);
      node.classList.remove('cell_flag');

      this.minesweeper.currentBoard[`row${x}`][`cell${y}`].flag = false;
    }

    if (!mine && minesAround > 0) {
      this.minesweeper.currentBoard[`row${x}`][`cell${y}`].minesAround = minesAround;

      this.minesweeper.board[`row${x}`][`cell${y}`].visited = true;
      node.classList.add('cell_opened', `cell_count-mines_${minesAround}`);
      node.innerHTML = minesAround;
      this.checkVictory();
      return;
    }

    this.checkCells(node, x, y);

    this.minesweeper.board[`row${x}`][`cell${y}`].visited = true;
    node.classList.add('cell_opened');
  }

  checkCells(element, x, y) {
    const node = element;
    const { minesAround } = this.minesweeper.board[`row${x}`][`cell${y}`];

    if (minesAround === 0) {
      node.classList.add('cell_opened');

      this.minesweeper.currentBoard[`row${x}`][`cell${y}`].minesAround = minesAround;
      this.minesweeper.board[`row${x}`][`cell${y}`].visited = true;
    } else if (minesAround > 0) {
      if (node.classList.contains('cell_flag')) {
        this.displayUpdatedFlagsCounter(false);
        node.classList.remove('cell_flag');

        this.minesweeper.currentBoard[`row${x}`][`cell${y}`].flag = false;
      }
      node.classList.add('cell_opened', `cell_count-mines_${minesAround}`);
      node.innerHTML = minesAround;

      this.minesweeper.currentBoard[`row${x}`][`cell${y}`].minesAround = minesAround;
      this.minesweeper.board[`row${x}`][`cell${y}`].visited = true;
      this.checkVictory();
      return;
    }

    setTimeout(() => {
      if (x > 0) this.clickCell(x - 1, y);
      if (x < this.lines - 1) this.clickCell(x + 1, y);
      if (y > 0) this.clickCell(x, y - 1);
      if (y < this.lines - 1) this.clickCell(x, y + 1);

      if (x > 0 && y > 0) this.clickCell(x - 1, y - 1);
      if (x < this.lines - 1 && y < this.lines - 1) this.clickCell(x + 1, y + 1);

      if (y > 0 && x < this.lines - 1) this.clickCell(x + 1, y - 1);
      if (x > 0 && y < this.lines - 1) this.clickCell(x - 1, y + 1);
    }, 10);

    this.checkVictory();
  }

  startTimer(nodeElement) {
    if (this.minesweeper.timer >= 999) this.endGame('end time');
    else {
      const node = nodeElement;

      this.minesweeper.timer += 1;

      const timerLength = `${this.minesweeper.timer}`.length;
      let text = '';
      if (timerLength === 1) text = '00';
      if (timerLength === 2) text = '0';

      node.innerHTML = `${text}${this.minesweeper.timer}`;
    }
  }

  static stopTimer(timer) {
    window.clearInterval(timer);
  }

  displayUpdatedFlagsCounter(increase) {
    if (increase) this.minesweeper.flags += 1;
    else if (increase === false) this.minesweeper.flags -= 1;

    const flags = document.querySelector('.counter_flags .counter__text');
    const mines = document.querySelector('.counter_mines .counter__text');

    flags.innerText = this.minesweeper.flags;
    mines.innerText = this.minesweeper.countMines - this.minesweeper.flags;
  }

  stepCounter(nodeElement) {
    const node = nodeElement;
    this.minesweeper.steps += 1;

    const counterLength = `${this.minesweeper.steps}`.length;
    let text = '';
    if (counterLength === 1) text = '00';
    if (counterLength === 2) text = '0';

    node.innerHTML = `${text}${this.minesweeper.steps}`;
  }

  checkVictory() {
    const openedElements = document.querySelectorAll('.cell_opened').length;
    if (((this.lines * this.lines) - this.minesweeper.countMines) === openedElements) this.endGame('win');
  }

  endGame(cause) {
    let popup;
    let text = '';
    let path = '';
    if (cause === 'end time') {
      popup = App.getPopup('EndTime', 'Time is over! You lose :(');
      text = 'EndTime';
      path = '/minesweeper/assets/lose.mp3';
    } else if (cause === 'mine') {
      popup = App.getPopup('LoseGame', 'Game over. Try again');
      text = 'LoseGame';
      path = '/minesweeper/assets/lose.mp3';
    } else if (cause === 'win') {
      popup = App.getPopup('Win', `Hooray! You found all mines in ${this.minesweeper.timer} seconds and ${this.minesweeper.steps} moves!`);
      text = 'Win';
      path = '/minesweeper/assets/win.mp3';
    }

    const sound = new Sound();
    sound.musicPath = path;
    sound.on();
    document.body.prepend(popup);

    this.minesweeper.mines.forEach((mine) => {
      const node = document.querySelector(`.cell[data-pos="${mine}"]`);
      const [x, y] = convertPositionToArr(mine);

      if (!node.classList.contains('cell_mine')) {
        if (node.classList.contains('cell_flag')) {
          this.minesweeper.currentBoard[`row${x}`][`cell${y}`].flag = false;
          node.classList.remove('cell_flag');
        }

        node.classList.add('cell_mine');

        this.minesweeper.currentBoard[`row${x}`][`cell${y}`].mine = true;
      }
    });

    const popupNode = document.getElementById(`popup${text}`);

    Minesweeper.stopTimer(this.minesweeper.interval);
    Popup.open(popupNode, sound);

    if (this.minesweeper.leaderboard.length === 10) {
      for (let i = 0; i < this.minesweeper.leaderboard.length - 1; i += 1) {
        this.minesweeper.leaderboard[i].item0 -= 1;
      }
      this.minesweeper.leaderboard.pop();
    }

    this.minesweeper.leaderboard.unshift({
      item0: this.minesweeper.leaderboard.length + 1,
      item1: this.minesweeper.timer,
      item2: this.minesweeper.steps,
    });
    if (cause === 'win') this.minesweeper.gameStatus = 'win';
    else this.minesweeper.gameStatus = 'lose';

    LocalStorage.setLocalStorage('minesweeper', this.minesweeper);
  }

  newGame(board, stepsElement, timerElement) {
    const stepsNode = stepsElement;
    const timerNode = timerElement;
    const boardRows = document.querySelectorAll('.board__row');

    boardRows.forEach((row) => row.remove());

    Minesweeper.stopTimer(this.minesweeper.interval);

    this.minesweeper.timer = 0;
    this.minesweeper.steps = 0;
    this.minesweeper.flags = 0;
    this.minesweeper.mines = [];
    this.minesweeper.board = {};
    this.minesweeper.currentBoard = {};
    this.minesweeper.gameStatus = 'active';
    this.minesweeper.firstClick = true;
    this.minesweeper.interval = false;

    stepsNode.innerText = '000';
    timerNode.innerText = '000';

    const structure = this.getStructure();

    const mines = this.getMines();

    const flagsNode = document.querySelector('.counter_flags .counter__text');
    const minesNode = document.querySelector('.counter_mines .counter__text');
    
    flagsNode.innerText = this.minesweeper.flags;
    minesNode.innerText = this.minesweeper.countMines - this.minesweeper.flags;

    board.append(structure);

    LocalStorage.setLocalStorage('minesweeper', this.minesweeper);

    return mines;
  }

  #getMineInCell(x, y) {
    return this.minesweeper.board[`row${x}`][`cell${y}`].mine ? 1 : 0;
  }

  #addInfoAboutMinesToCells() {
    for (let x = 0; x < this.lines; x += 1) {
      for (let y = 0; y < this.lines; y += 1) {
        if (this.minesweeper.mines.includes(`${x}-${y}`)) this.minesweeper.board[`row${x}`][`cell${y}`].mine = true;
        else this.minesweeper.board[`row${x}`][`cell${y}`].minesAround = 0;
      }
    }

    for (let x = 0; x < this.lines; x += 1) {
      for (let y = 0; y < this.lines; y += 1) {
        let topLeft = 0;
        let top = 0;
        let topRight = 0;
        let left = 0;
        let right = 0;
        let botLeft = 0;
        let bottom = 0;
        let botRight = 0;

        if (x > 0 && y > 0) topLeft = this.#getMineInCell(x - 1, y - 1);
        if (y > 0) top = this.#getMineInCell(x, y - 1);
        if (y > 0 && x < this.lines - 1) topRight = this.#getMineInCell(x + 1, y - 1);

        if (x > 0) left = this.#getMineInCell(x - 1, y);
        if (x < this.lines - 1) right = this.#getMineInCell(x + 1, y);

        if (x > 0 && y < this.lines - 1) botLeft = this.#getMineInCell(x - 1, y + 1);
        if (y < this.lines - 1) bottom = this.#getMineInCell(x, y + 1);
        if (x < this.lines - 1 && y < this.lines - 1) botRight = this.#getMineInCell(x + 1, y + 1);

        const mines = topLeft + top + topRight + left + right + botLeft + bottom + botRight;

        if (!this.minesweeper.board[`row${x}`][`cell${y}`].mine) this.minesweeper.board[`row${x}`][`cell${y}`].minesAround = mines;
      }
    }
  }

  #getPairIndexes() {
    const x = Number(randomIndex(this.lines));
    const y = Number(randomIndex(this.lines));
    const index = `${x}-${y}`;
    if (this.minesweeper.mines.length === 0) return index;
    if (this.minesweeper.mines.includes(index)) return this.#getPairIndexes();

    return index;
  }
}
