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

      this.observedElements.forEach(({ target, options }) => {
        const { penetrateShadowRoots = true } = options;
        let el = document.activeElement;

        if (penetrateShadowRoots) {
          // Iterate through shadow roots to find the active element.
          while (el !== target && !target.contains(el) && el.shadowRoot) {
            el = el.shadowRoot.activeElement;
          }
        }

        if (el === target || target.contains(el)) {
          records.push(new KeyboardRecord({
            event,
            target,
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
   * @param {Object} options
   */
  observe(target, options = {}) {
    this.observedElements.push({
      target,
      options,
    });

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
    this.observedElements.splice(this.observedElements.findIndex(item => item.target === target));
    this._cleanUpEventListener();
  }

  _cleanUpEventListener() {
    if (this.observedElements.length < 1) {
      window.removeEventListener('keydown', this._handleKeydown);
    }
  }
}
