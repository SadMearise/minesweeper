export default class App {
  constructor({
    timer = '000', steps = '000',
  } = {}) {
    this.timer = timer;
    this.steps = steps;
  }

  getStructure(mines, flags = 0) {
    const structure = document.createDocumentFragment();

    const page = document.createElement('div');
    page.classList.add('page');

    const header = document.createElement('header');
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
    headerBtn.setAttribute('id', 'leaderboard');
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

    const main = document.createElement('main');
    main.classList.add('main', 'container');
    page.append(main);

    const app = document.createElement('div');
    app.classList.add('app');
    main.append(app);

    const col1 = document.createElement('div');
    col1.classList.add('app__col');
    app.append(col1);

    const appTitle = document.createElement('h1');
    appTitle.classList.add('app__title');
    appTitle.innerText = 'Minesweeper';
    col1.append(appTitle);

    const appDescription = document.createElement('p');
    appDescription.classList.add('app__description');
    appDescription.innerText = 'Minesweeper is single-player logic-based computer game played on rectangular board whose object is to locate a predetermined number of randomly-placed "mines" in the shortest possible time by clicking on "safe" squares while avoiding the squares with mines. If the player clicks on a mine, the game ends. Otherwise, a number between 0 and 8 is displayed that identifies the total number of mines present in the eight neighboring squares. Therefore, finding a square containing "8" indicated that all eight adjacent squares contain mines, while if a zero (displayed as a blank) is uncovered, there are no mines in the surrounding squares. A square suspected of containing a mine may be marked with flag.';
    col1.append(appDescription);

    const col2 = document.createElement('div');
    col2.classList.add('app__col');
    app.append(col2);

    const minesweeper = document.createElement('div');
    minesweeper.classList.add('app__minesweeper', 'minesweeper');
    col2.append(minesweeper);

    const minesweeperOptions = document.createElement('div');
    minesweeperOptions.classList.add('minesweeper__header', 'options');
    minesweeper.append(minesweeperOptions);

    const optionsStepsCounter = document.createElement('div');
    optionsStepsCounter.classList.add('options__counter', 'counter', 'counter_steps');
    minesweeperOptions.append(optionsStepsCounter);

    const counterStepsText = document.createElement('span');
    counterStepsText.classList.add('counter__text');
    counterStepsText.innerText = `${this.steps}`;
    optionsStepsCounter.append(counterStepsText);

    const counterStepsIcon = document.createElement('img');
    counterStepsIcon.classList.add('counter__icon');
    counterStepsIcon.setAttribute('src', './img/steps.svg');
    counterStepsIcon.setAttribute('alt', 'steps');
    optionsStepsCounter.append(counterStepsIcon);

    const optionsDifficultMenu = document.createElement('div');
    optionsDifficultMenu.classList.add('options__difficult-menu', 'difficult-menu');
    minesweeperOptions.append(optionsDifficultMenu);

    const difficultMenuSelect = document.createElement('select');
    difficultMenuSelect.classList.add('difficult-menu__select');
    difficultMenuSelect.setAttribute('name', 'difficult-menu');
    optionsDifficultMenu.append(difficultMenuSelect);

    const difficultMenuOption1 = document.createElement('option');
    difficultMenuOption1.classList.add('difficult-menu__option');
    difficultMenuOption1.setAttribute('value', 'Easy');
    difficultMenuOption1.innerText = 'Easy';
    difficultMenuSelect.append(difficultMenuOption1);

    const difficultMenuOption2 = document.createElement('option');
    difficultMenuOption2.classList.add('difficult-menu__option');
    difficultMenuOption2.setAttribute('value', 'Medium');
    difficultMenuOption2.innerText = 'Medium';
    difficultMenuSelect.append(difficultMenuOption2);

    const difficultMenuOption3 = document.createElement('option');
    difficultMenuOption3.classList.add('difficult-menu__option');
    difficultMenuOption3.setAttribute('value', 'Hard');
    difficultMenuOption3.innerText = 'Hard';
    difficultMenuSelect.append(difficultMenuOption3);

    const optionsButton = document.createElement('button');
    optionsButton.classList.add('options__custom-button', 'btn');
    optionsButton.setAttribute('id', 'custom-button');
    optionsButton.innerText = 'Custom';
    minesweeperOptions.append(optionsButton);

    const optionsTimerCounter = document.createElement('div');
    optionsTimerCounter.classList.add('options__counter', 'counter', 'counter_timer');
    minesweeperOptions.append(optionsTimerCounter);

    const counterTimerIcon = document.createElement('img');
    counterTimerIcon.classList.add('counter__icon');
    counterTimerIcon.setAttribute('src', './img/timer.svg');
    counterTimerIcon.setAttribute('alt', 'timer');
    optionsTimerCounter.append(counterTimerIcon);

    const counterTimerText = document.createElement('span');
    counterTimerText.classList.add('counter__text');
    counterTimerText.innerText = `${this.timer}`;
    optionsTimerCounter.append(counterTimerText);

    const minesweeperStats = document.createElement('div');
    minesweeperStats.classList.add('minesweeper__stats', 'options');
    minesweeper.append(minesweeperStats);

    const optionsMinesCounter = document.createElement('div');
    optionsMinesCounter.classList.add('options__counter', 'counter', 'counter_mines');
    minesweeperStats.append(optionsMinesCounter);

    const counterMinesText = document.createElement('span');
    counterMinesText.classList.add('counter__text');
    counterMinesText.innerText = `${mines}`;
    optionsMinesCounter.append(counterMinesText);

    const counterMinesIcon = document.createElement('img');
    counterMinesIcon.classList.add('counter__icon');
    counterMinesIcon.setAttribute('src', './img/mine.svg');
    counterMinesIcon.setAttribute('alt', 'mines');
    optionsMinesCounter.append(counterMinesIcon);

    const optionsFlagsCounter = document.createElement('div');
    optionsFlagsCounter.classList.add('options__counter', 'counter', 'counter_flags');
    minesweeperStats.append(optionsFlagsCounter);

    const counterFlagsIcon = document.createElement('img');
    counterFlagsIcon.classList.add('counter__icon');
    counterFlagsIcon.setAttribute('src', './img/flag.svg');
    counterFlagsIcon.setAttribute('alt', 'flags');
    optionsFlagsCounter.append(counterFlagsIcon);

    const counterFlagsText = document.createElement('span');
    counterFlagsText.classList.add('counter__text');
    counterFlagsText.innerText = `${flags}`;
    optionsFlagsCounter.append(counterFlagsText);

    const minesweeperBoard = document.createElement('div');
    minesweeperBoard.classList.add('minesweeper__board', 'board');
    minesweeper.append(minesweeperBoard);

    const minesweeperButton = document.createElement('button');
    minesweeperButton.classList.add('minesweeper__button', 'btn');
    minesweeperButton.innerText = 'New game';
    minesweeper.append(minesweeperButton);

    const footer = document.createElement('footer');
    footer.classList.add('footer', 'container');
    page.append(footer);

    const footerCopy = document.createElement('span');
    footerCopy.classList.add('footer__copy');
    footerCopy.innerText = '© SadMearise';
    footer.append(footerCopy);

    structure.append(page);

    return structure;
  }

  static getPopup(
    id = 1,
    title = false,
    text = false,
    field = false,
    saveButton = false,
    leaderboard = {},
  ) {
    const structure = document.createDocumentFragment();

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.setAttribute('id', `popup${id}`);

    const popupBody = document.createElement('div');
    popupBody.classList.add('popup__body');
    popup.append(popupBody);

    const popupWrapper = document.createElement('div');
    popupWrapper.classList.add('popup__wrapper');
    popupBody.append(popupWrapper);

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup__content');
    popupWrapper.append(popupContent);

    if (title) {
      const popupTitle = document.createElement('h3');
      popupTitle.classList.add('popup__title');
      popupTitle.innerText = `${title}`;
      popupContent.append(popupTitle);
    }

    if (leaderboard.length > 0) {
      console.log(leaderboard);
      const keys = Object.keys(leaderboard);
      const keysLength = keys.length;

      const leaderboardList = document.createElement('div');
      leaderboardList.classList.add('leaderboard-list');
      popupContent.append(leaderboardList);

      for (let i = 0; i < keysLength; i += 1) {
        const leaderboardItem = document.createElement('div');
        leaderboardItem.classList.add('leaderboard-list__item');
        leaderboardList.prepend(leaderboardItem);

        for (let j = 0; j < 3; j += 1) {
          const leaderboardText = document.createElement('span');
          leaderboardText.classList.add('leaderboard-list__text');
          leaderboardText.innerText = `${leaderboard[i][`item${j}`]}`;
          leaderboardItem.append(leaderboardText);
        }
      }
    }

    if (text) {
      const popupText = document.createElement('p');
      popupText.classList.add('popup__text');
      popupText.innerText = `${text}`;
      popupContent.append(popupText);
    }

    if (field) {
      const popupField = document.createElement('div');
      popupField.classList.add('field');
      popupContent.append(popupField);

      const fieldLabel = document.createElement('label');
      fieldLabel.classList.add('field__label');
      fieldLabel.innerText = 'Mines:';
      popupField.append(fieldLabel);

      const fieldInput = document.createElement('input');
      fieldInput.classList.add('field__input');
      fieldInput.setAttribute('type', 'number');
      fieldInput.setAttribute('max', '99');
      fieldInput.setAttribute('min', '1');
      fieldInput.setAttribute('maxlength', '2');
      fieldInput.setAttribute('value', '1');
      popupField.append(fieldInput);
    }

    const popupRow = document.createElement('div');
    popupRow.classList.add('popup__row');
    popupContent.append(popupRow);

    if (saveButton) {
      const popupSaveButton = document.createElement('button');
      popupSaveButton.classList.add('popup__button', 'btn', 'btn_save');
      popupSaveButton.innerText = 'Save';
      popupRow.append(popupSaveButton);
    }

    const popupCloseButton = document.createElement('button');
    popupCloseButton.classList.add('popup__button', 'btn', 'btn_close', 'close-popup');
    popupCloseButton.innerText = 'Close';
    popupRow.append(popupCloseButton);

    structure.append(popup);

    return structure;
  }
}
