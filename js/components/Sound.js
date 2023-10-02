export default class Sound {
  constructor() {
    this.audio = new Audio();
    this.path = null;
  }

  set musicPath(value) {
    this.path = value;
  }

  on() {
    this.audio.src = this.path;
    this.audio.play();
  }

  off() {
    this.audio.pause();
  }
}
