import KeyboardRecord from './KeyboardRecord.js';

export default class KeyboardObserver {
  constructor(callback) {
    this.callback = callback;
    this.observedElements = [];
    this.observing = false;

    this._handleKeydown = event => {
      if (!this.callback) {
        return;
      }

      const records = [];

      this.observedElements.forEach(el => {
        if (document.activeElement === el || el.contains(document.activeElement)) {
          records.push(new KeyboardRecord({
            event,
            target: el,
          }));
        }
      });

      if (records.length > 0) {
        this.callback(records, this);
      }
    };
  }

  /**
   * Unobserves all observed Element targets.
   */
  disconnect() {
    this.observedElements = [];
    this._cleanUpEventListener();
  }

  /**
   * Initiates observing of a specified Element.
   *
   * @param {Element} target
   */
  observe(target) {
    this.observedElements.push(target);

    if (!this.observing) {
      window.addEventListener('keydown', this._handleKeydown);
    }

    this.observing = true;
  }

  /**
   * Ends the observing of a specified Element.
   *
   * @param {Element} target
   */
  unobserve(target) {
    this.observedElements.splice(this.observedElements.indexOf(target));
    this._cleanUpEventListener();
  }

  _cleanUpEventListener() {
    if (this.observedElements.length < 1) {
      window.removeEventListener('keydown', this._handleKeydown);
    }
  }
}
