export default class App {
  static getStructure() {
    const structure = document.createDocumentFragment();

    const page = document.createElement('div');
    page.classList.add('page');

    const header = document.createElement('div');
    header.classList.add('header', 'container');
    page.append(header);

    const headerBody = document.createElement('div');
    headerBody.classList.add('header__body');
    header.append(headerBody);

    const headerControlPanel = document.createElement('div');
    headerControlPanel.classList.add('header__control-panel');
    headerBody.append(headerControlPanel);

    const headerBtn = document.createElement('button');
    headerBtn.classList.add('btn');
    headerBtn.innerText = 'Leaderboard';
    headerControlPanel.append(headerBtn);

    const headerSwitch = document.createElement('div');
    headerSwitch.classList.add('switch');
    headerControlPanel.append(headerSwitch);

    const switchInput = document.createElement('input');
    switchInput.classList.add('switch__input');
    switchInput.setAttribute('id', 'switch-theme');
    switchInput.setAttribute('type', 'checkbox');
    headerSwitch.append(switchInput);

    const switchLabel = document.createElement('label');
    switchLabel.classList.add('switch__label');
    switchLabel.setAttribute('for', 'switch-theme');
    headerSwitch.append(switchLabel);

    const main = document.createElement('div');
    main.classList.add('main', 'container');
    page.append(main);

    const app = document.createElement('div');
    app.classList.add('app');
    main.append(app);

    const col1 = document.createElement('div');
    col1.classList.add('app__col');
    app.append(col1);

    const col2 = document.createElement('div');
    col2.classList.add('app__col');
    app.append(col2);

    const minesweeper = document.createElement('div');
    minesweeper.classList.add('app__minesweeper', 'minesweeper');
    col2.append(minesweeper);

    const minesweeperOptions = document.createElement('div');
    minesweeperOptions.classList.add('minesweeper__header', 'options');
    minesweeper.append(minesweeperOptions);

    const minesweeperBoard = document.createElement('div');
    minesweeperBoard.classList.add('minesweeper__board', 'board');
    minesweeper.append(minesweeperBoard);

    const minesweeperButton = document.createElement('button');
    minesweeperButton.classList.add('minesweeper__button', 'btn');
    minesweeperButton.innerText = 'New game';
    minesweeper.append(minesweeperButton);

    const footer = document.createElement('div');
    footer.classList.add('footer', 'container');
    page.append(footer);

    const footerCopy = document.createElement('span');
    footerCopy.classList.add('footer__copy');
    footerCopy.innerText = '© SadMearise';
    footer.append(footerCopy);

    structure.append(page);

    return structure;
  }
}
