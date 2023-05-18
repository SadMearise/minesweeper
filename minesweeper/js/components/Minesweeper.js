import BaseComponent from './BaseComponent.js';
import { randomIndex } from '../files/functions.js';

export default class Minesweeper {
  constructor({ countMines = 0, difficult = 'easy' }) {
    // this.obj = {
    //   moves: 999,
    //   timer: 999,
    //   difficult: this.difficult,
    //   countMines: 0,
    //   gameStatus: '', // end/start/game
    //   board: {
    //     row0: {
    //       cell0: {
    //         flag: false,
    //         mine: false,
    //         minesAround: 3,
    //         visited: false
    //       },
    //     },
    //   },
    // };
    this.difficult = difficult;
    this.countMines = countMines;
    if (this.difficult === 'easy') this.lines = 7; // изменить на 10
    else if (this.difficult === 'medium') this.lines = 15;
    else if (this.difficult === 'hard') this.lines = 25;

    this.minesweeper = {
      difficult,
      countMines: countMines === 0 ? this.lines : 0,
      mines: [],
      board: [],
      detailedBoard: {

      },
    };
    // возможно нужно будет создать метод по получению этого объекта
    // для передачи его в ls
  }

  getStructure() {
    const structure = {
      component: '',
    };

    for (let i = 0; i < this.lines; i += 1) {
      const row = new BaseComponent({ classNames: ['board__row'] });
      structure[`row${i}`] = { component: row };
      this.minesweeper.detailedBoard[`row${i}`] = {};
      for (let j = 0; j < this.lines; j += 1) {
        const cell = new BaseComponent({ classNames: ['board__cell', 'cell'], attributes: { 'data-pos': `${i}-${j}` } });
        structure[`row${i}`][`cell${j}`] = { component: cell };

        this.minesweeper.detailedBoard[`row${i}`][`cell${j}`] = {
          flag: false,
          mine: false,
          visited: false,
          minesAround: 0,
        };
      }
    }

    return structure;
  }

  static endGame() { // lose or win option
    console.log('end game');
  }

  // дописать 2 метода. При открытии клеток нужно проверять все соседние ячейки.
  // Если:
  // Соседняя ячейка пустая, то добавляем её индекс в рекурсию
  // Соседняя ячейка имеет число, то выводим его
  // Так же нужно добавить стек с уже посешёнными ячейками
  // Выход из функции осуществляем когда стек очищается
  // clickCell(x, y) { // tile
  //   if (tile.classList.contains('tile--checked') || tile.classList.contains('tile--flagged')) return;

  //   const position = `${x}-${y}`;

  //   let num = this.minesweeper.board[x][y];
  //   if (num !== 9 && num !== 0) {
  //     tile.classList.add('tile--checked');
  //     // тут добавить класс для открытия ячейки
  //     return;
  //   }

  //   checkCells(structure, position);
  //   }
  //   tile.classList.add('tile--checked');
  // }

  // checkCells(structure, position) {
  //   const cellPos = position.split('-');
  //   const x = cellPos[0];
  //   const y = cellPos[cellPos.length - 1];

  //   /* check nearby tiles */
  //   if (x > 0) {
  //     clickTile(x-1, y);
  //   }
  //   // if (x < this.lines - 1) {
  //   //   let targetE = document.querySelectorAll(`[data-tile="${x+1},${y}"`)[0];
  //   //   clickTile(targetE, `${x+1},${y}`);
  //   // }
  //   // if (y > 0) {
  //   //   let targetN = document.querySelectorAll(`[data-tile="${x},${y-1}"]`)[0];
  //   //   clickTile(targetN, `${x},${y-1}`);
  //   // }
  //   // if (y < this.lines - 1) {
  //   //   let targetS = document.querySelectorAll(`[data-tile="${x},${y+1}"]`)[0];
  //   //   clickTile(targetS, `${x},${y+1}`);
  //   // }

  //   // if (x > 0 && y > 0) {
  //   //   let targetNW = document.querySelectorAll(`[data-tile="${x-1},${y-1}"`)[0];
  //   //   clickTile(targetNW, `${x-1},${y-1}`);
  //   // }
  //   // if (x < this.lines - 1 && y < this.lines - 1) {
  //   //   let targetSE = document.querySelectorAll(`[data-tile="${x+1},${y+1}"`)[0];
  //   //   clickTile(targetSE, `${x+1},${y+1}`);
  //   // }

  //   // if (y > 0 && x < this.lines - 1) {
  //   //   let targetNE = document.querySelectorAll(`[data-tile="${x+1},${y-1}"]`)[0];
  //   //   clickTile(targetNE, `${x+1},${y-1}`);
  //   // }
  //   // if (x > 0 && y < this.lines - 1) {
  //   //   let targetSW = document.querySelectorAll(`[data-tile="${x-1},${y+1}"`)[0];
  //   //   clickTile(targetSW, `${x-1},${y+1}`);
  //   // }

  //   // сделать проверку на то, куда мы кликнули, на пустую клетку или клетку с цифрой
  // }

  #check(queue, structure, xx, yy) {
    const x = Number(xx);
    const y = Number(yy);
    console.log(this.minesweeper.board);
    console.log(this.minesweeper.board[x][y]);

    // if (!queue.includes([x, y])) {
    //   queue.push([x, y]);
    // }
    // if (this.minesweeper.board[x][y] !== 9 && this.minesweeper.board[x][y] !== 0) {
    //   console.log('цифра');
    //   return queue;
    // }
    // this.#check(queue, structure, x - 1, y - 1);
    // this.#check(queue, structure, x, y - 1);
    // this.#check(queue, structure, x + 1, y - 1);
    // this.#check(queue, structure, x - 1, y);
    // this.#check(queue, structure, x - 1, y + 1);

    // this.#check(queue, structure, x, y + 1);
    // this.#check(queue, structure, x + 1, y);
    // this.#check(queue, structure, x + 1, y + 1);
  }

  #getMineInCell(x, y) {
    return this.minesweeper.board[x][y] === 9 ? 1 : 0;
  }

  #getCompletedBoard() {
    for (let i = 0; i < this.lines; i += 1) {
      this.minesweeper.board.push([]);
      for (let j = 0; j < this.lines; j += 1) {
        if (this.minesweeper.mines.includes(`${i}-${j}`)) this.minesweeper.board[i].push(9);
        else this.minesweeper.board[i].push(0);
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

        if (this.minesweeper.board[x][y] !== 9) this.minesweeper.board[x][y] = mines;
      }
    }

    return this.minesweeper.board;
  }

  getMines() {
    for (let i = 0; i < this.minesweeper.countMines; i += 1) {
      // const index = this.#getPairIndexes(); // раскомментировать
      // this.mines.push(index); // раскомментировать

      // test arr
      //   [2, 9, 1, 0, 0, 0, 0],
      //   [9, 2, 1, 0, 0, 0, 0],
      //   [1, 1, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 1, 1],
      //   [0, 0, 1, 1, 1, 1, 9],
      //   [0, 0, 1, 9, 1, 2, 2],
      //   [0, 0, 1, 1, 1, 1, 9],
    }
    this.minesweeper.mines.push('0-1'); // удалить после тестов
    this.minesweeper.mines.push('1-0'); // удалить после тестов
    this.minesweeper.mines.push('4-6'); // удалить после тестов
    this.minesweeper.mines.push('5-3'); // удалить после тестов
    this.minesweeper.mines.push('6-6'); // удалить после тестов

    this.#getCompletedBoard();
    return this.minesweeper.mines;
  }

  replaceMine(index) {
    this.minesweeper.mines[index] = this.#getPairIndexes();
  }

  #getPairIndexes() {
    const i = randomIndex(this.lines);
    const j = randomIndex(this.lines);
    const index = `${i}-${j}`;

    if (this.minesweeper.mines.includes(index)) return this.#getPairIndexes();

    return index;
  }
}
