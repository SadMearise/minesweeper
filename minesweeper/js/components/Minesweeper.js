import BaseComponent from './BaseComponent.js';
import { randomIndex } from '../files/functions.js';

export default class Minesweeper {
  constructor(board, countMines = 0, difficult = 'easy') {
    this.difficult = difficult;
    this.board = board;
    this.countMines = countMines;
    this.mines = [];

    if (this.difficult === 'easy') this.lines = 10;
    else if (this.difficult === 'medium') this.lines = 15;
    else if (this.difficult === 'hard') this.lines = 25;

    if (countMines === 0) this.countMines = this.lines;
  }

  getStructure() {
    const structure = {
      component: '',
    };

    for (let i = 0; i < this.lines; i += 1) {
      const row = new BaseComponent({ classNames: ['board__row'] });
      structure[`row${i}`] = { component: row };

      for (let j = 0; j < this.lines; j += 1) {
        const cell = new BaseComponent({ classNames: ['board__cell', 'cell'], attributes: { 'data-pos': `${i}-${j}` } });
        structure[`row${i}`][`cell${j}`] = { component: cell };
      }
    }

    return structure;
  }

  endGame() { // lose or win option
    console.log('end game');
  }

  getCountMinesAroundCell() {
    const fullBoard = [];
    console.log(this.mines);

    for (let i = 0; i < this.lines; i += 1) {
      fullBoard.push([]);
      for (let j = 0; j < this.lines; j += 1) {
        if (this.mines.includes(`${i}-${j}`)) fullBoard[i].push(1);
        else fullBoard[i].push(0);
      }
    }
    console.log(fullBoard);
  }

  getMines() {
    for (let i = 0; i < this.countMines; i += 1) {
      const ind = this.#getPairIndexes();
      this.mines.push(ind);
    }

    return this.mines;
  }

  replaceMine(index) {
    this.mines[index] = this.#getPairIndexes();
  }

  #getPairIndexes() {
    const i = randomIndex(this.lines);
    const j = randomIndex(this.lines);
    const index = `${i}-${j}`;

    if (this.mines.includes(index)) return this.#getPairIndexes();

    return index;
  }
}
