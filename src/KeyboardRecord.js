/**
 * Represents an individual keyboard event dispatched while focusing an Element.
 */
export default class KeyboardRecord {
  constructor({ event, target }) {
    this.event = event;
    this.target = target;
  }
}
