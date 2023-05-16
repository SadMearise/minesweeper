import App from './components/App.js';
import Minesweeper from './components/Minesweeper.js';
import { initDOM } from './files/functions.js';

const elements = App.getStructure();

const { page } = elements;
const pageDOM = Object.assign(Object.create(Object.getPrototypeOf(page.component)), page.component);
initDOM(page, pageDOM);
document.body.prepend(pageDOM.getNode());

const board = page.main.app.appCol2.appMinesweeper.minesweeperBoard.component;
const minesweeperInstance = new Minesweeper(board);
const minesweeperStructure = minesweeperInstance.getStructure();
initDOM(minesweeperStructure, board);

const minesArr = minesweeperInstance.getMines();
