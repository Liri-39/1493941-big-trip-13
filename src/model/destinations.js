import Observer from "../utils/observer.js";

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  setOffers(destinations) {
    this._destinations = destinations.slice();
  }

  getOffers() {
    return this._destinations;
  }
}
