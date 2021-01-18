import AbstractView from "./abstract.js";

const createCostInfoElement = (cost) => {
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
            </p>`;
};

const getTripCost = (array) => {
  let cost = 0;
  for (const item of array) {
    const offerPrice = (item.offers.length > 0) ? item.offers.map((offer) => offer.price).reduce((a, b) => a + b) : 0;
    cost += item.price + offerPrice;
  }

  return cost;
};

export default class CostInfo extends AbstractView {
  constructor(array, offers) {
    super();
    this._cost = getTripCost(array, offers);
  }

  getTemplate() {
    return createCostInfoElement(this._cost);
  }
}
