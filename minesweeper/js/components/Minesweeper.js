import BaseComponent from './BaseComponent.js';
import { randomIndex, convertPositionToArr, initDOM } from '../files/functions.js';

export default class Minesweeper {
  constructor({ countMines = 0, difficult = 'easy' } = {}) {
    this.minesweeper = {
      timer: 0,
      steps: 0,
      difficult,
      countMines,
      mines: [],
      board: {},
    };

    if (this.minesweeper.difficult === 'easy') this.lines = 7; // изменить на 10
    else if (this.minesweeper.difficult === 'medium') this.lines = 15;
    else if (this.minesweeper.difficult === 'hard') this.lines = 25;

    this.minesweeper.countMines = countMines === 0 ? this.lines : 0;
  }

  // возможно нужно перенести в App
  getStructure() {
    const structure = {};

    for (let x = 0; x < this.lines; x += 1) {
      const row = new BaseComponent({ classNames: ['board__row'] });

      structure[`row${x}`] = { component: row };
      this.minesweeper.board[`row${x}`] = {};
      for (let y = 0; y < this.lines; y += 1) {
        const cell = new BaseComponent({ classNames: ['board__cell', 'cell'], attributes: { 'data-pos': `${x}-${y}` } });

        structure[`row${x}`][`cell${y}`] = { component: cell };

        this.minesweeper.board[`row${x}`][`cell${y}`] = {
          flag: false,
          mine: false,
          visited: false,
          minesAround: false,
        };
      }
    }

    return structure;
  }

  getMinesweeperObj() {
    return this.minesweeper;
  }

  getMines() {
    for (let i = 0; i < this.minesweeper.countMines; i += 1) {
      const index = this.#getPairIndexes();

      this.minesweeper.mines.push(index);
    }

    this.#addInfoAboutMinesToCells();
    return this.minesweeper.mines;
  }

  replaceMine(index) {
    const [oldMineX, oldMineY] = convertPositionToArr(this.minesweeper.mines[index]);

    this.minesweeper.board[`row${oldMineX}`][`cell${oldMineY}`].mine = false;

    const newMinePosition = this.#getPairIndexes();
    const [newMineX, newMineY] = convertPositionToArr(newMinePosition);

    this.minesweeper.board[`row${newMineX}`][`cell${newMineY}`].mine = true;

    this.minesweeper.mines[index] = newMinePosition;
    console.log('minesweeper.mines after replaces', this.minesweeper.mines);
    this.#addInfoAboutMinesToCells();
  }

  clickCell(structure, x, y) {
    const { minesAround, mine } = this.minesweeper.board[`row${x}`][`cell${y}`];

    if (this.minesweeper.board[`row${x}`][`cell${y}`].visited) return;

    const node = structure[`row${x}`][`cell${y}`].component.getNode();

    if (node.classList.contains('cell_flag')) node.classList.remove('cell_flag');

    if (!mine && minesAround > 0) {
      this.minesweeper.board[`row${x}`][`cell${y}`].visited = true;
      node.classList.add('cell_opened', `cell_count-mines_${minesAround}`);
      node.innerHTML = minesAround;
      return;
    }

    this.checkCells(structure, x, y);

    this.minesweeper.board[`row${x}`][`cell${y}`].visited = true;
    node.classList.add('cell_opened');
  }

  checkCells(structure, x, y) {
    const { minesAround } = this.minesweeper.board[`row${x}`][`cell${y}`];

    if (minesAround > 0) {
      const node = structure[`row${x}`][`cell${y}`].component.getNode();

      if (node.classList.contains('cell_flag')) node.classList.remove('cell_flag');
      node.classList.add('cell_opened', `cell_count-mines_${minesAround}`);
      node.innerHTML = minesAround;

      this.minesweeper.board[`row${x}`][`cell${y}`].visited = true;
      return;
    }
    setTimeout(() => {
      if (x > 0) this.clickCell(structure, x - 1, y);
      if (x < this.lines - 1) this.clickCell(structure, x + 1, y);
      if (y > 0) this.clickCell(structure, x, y - 1);
      if (y < this.lines - 1) this.clickCell(structure, x, y + 1);

      if (x > 0 && y > 0) this.clickCell(structure, x - 1, y - 1);
      if (x < this.lines - 1 && y < this.lines - 1) this.clickCell(structure, x + 1, y + 1);

      if (y > 0 && x < this.lines - 1) this.clickCell(structure, x + 1, y - 1);
      if (x > 0 && y < this.lines - 1) this.clickCell(structure, x - 1, y + 1);
    }, 10);
  }

  startTimer(timerComponent) {
    if (this.minesweeper.timer >= 999) this.endGame('end time');
    else {
      const timerNode = timerComponent.getNode();

      this.minesweeper.timer += 1;

      const timerLength = `${this.minesweeper.timer}`.length;
      let text = '';
      if (timerLength === 1) text = '00';
      if (timerLength === 2) text = '0';

      timerNode.innerHTML = `${text}${this.minesweeper.timer}`;
    }
  }

  static stopTimer(timer) {
    window.clearInterval(timer);
  }

  resetTimer(timerComponent) {
    const timerNode = timerComponent.getNode();

    this.minesweeper.timer = 0;
    timerNode.innerHTML = `00${this.minesweeper.timer}`;
  }

  stepCounter(counterComponent) {
    const counterNode = counterComponent.getNode();
    this.minesweeper.steps += 1;

    const counterLength = `${this.minesweeper.steps}`.length;
    let text = '';
    if (counterLength === 1) text = '00';
    if (counterLength === 2) text = '0';

    counterNode.innerHTML = `${text}${this.minesweeper.steps}`;
  }

  static endGame(cause, timer) {
    Minesweeper.stopTimer(timer);
  }

  newGame() {
    this.minesweeper.timer = 0;
    this.minesweeper.steps = 0;
    this.minesweeper.mines = [];
    this.minesweeper.board = [];

    const structure = this.getStructure();
    return structure;
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
    console.log('minesweeper.board', this.minesweeper.board);
  }

  #getPairIndexes() {
    const x = Number(randomIndex(this.lines));
    const y = Number(randomIndex(this.lines));
    const index = `${x}-${y}`;

    if (this.minesweeper.mines.includes(index)) return this.#getPairIndexes();

    return index;
  }
}
