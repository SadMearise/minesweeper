export default class LocalStorage {
  static setLocalStorage(title, object) {
    localStorage.setItem(title, JSON.stringify(object));
  }

  static getLocalStorage(title) {
    return JSON.parse(localStorage.getItem(title));
  }

  static checkLocalStorage(title) {
    return localStorage.getItem(title);
  }
}
