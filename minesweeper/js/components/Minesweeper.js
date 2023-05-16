import BaseComponent from './BaseComponent.js';

export default class Minesweeper {
  constructor(board, difficult = 'easy') {
    this.difficult = difficult;
    this.board = board;

    if (this.difficult === 'easy') this.lines = 10;
    else if (this.difficult === 'medium') this.lines = 15;
    else if (this.difficult === 'hard') this.lines = 25;
  }

  getElements() {
    const structure = {};

    for (let i = 0; i < this.lines; i += 1) {
      const row = new BaseComponent({ classNames: ['board__row'] });
      structure[`row${i}`] = { component: row };

      for (let j = 0; j < this.lines; j += 1) {
        const cell = new BaseComponent({ classNames: ['board__cell', 'cell'], attributes: { 'data-pos': `${i}-${j}` } });
        structure[`row${i}`][`cell${j}`] = { component: cell };
      }
    }
    console.log(structure);
    return structure;
  }

  initMines() {

  }
}
