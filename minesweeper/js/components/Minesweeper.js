import BaseComponent from './BaseComponent.js';
import { randomIndex, convertPositionToArr } from '../files/functions.js';

export default class Minesweeper {
  constructor({ countMines = 0, difficult = 'easy' }) {
    this.difficult = difficult;
    this.countMines = countMines;
    if (this.difficult === 'easy') this.lines = 7; // изменить на 10
    else if (this.difficult === 'medium') this.lines = 15;
    else if (this.difficult === 'hard') this.lines = 25;

    this.minesweeper = {
      difficult,
      countMines: countMines === 0 ? this.lines : 0,
      mines: [],
      board: {},
    };
  }

  getMinesweeperObj() {
    return this.minesweeper;
  }

  getStructure() {
    const structure = {
      component: '',
    };

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

  endGame() {
    console.log('end game', this.countMines);
  }

  clickCell(structure, x, y) {
    const { minesAround, mine } = this.minesweeper.board[`row${x}`][`cell${y}`];

    if (this.minesweeper.board[`row${x}`][`cell${y}`].visited) return;

    const node = structure[`row${x}`][`cell${y}`].component.getNode();

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

    this.#addInfoAboutMinesToCells();
  }

  #getPairIndexes() {
    const x = Number(randomIndex(this.lines));
    const y = Number(randomIndex(this.lines));
    const index = `${x}-${y}`;

    if (this.minesweeper.mines.includes(index)) return this.#getPairIndexes();

    return index;
  }
}
