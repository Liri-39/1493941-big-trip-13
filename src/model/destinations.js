import Observer from "../utils/observer.js";

export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getDestination() {
    return this._destinations;
  }
}
