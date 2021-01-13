import dayjs from "dayjs";
import AbstractView from "./abstract.js";

const createTripInfoElement = (tripDestination, tripDuration) => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${tripDestination}</h1>

              <p class="trip-info__dates">${tripDuration}</p>
            </div>
          </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(array) {
    super();
    if (array.length) {
      this._tripDestination = `${dayjs(array[0].dates.start).format(`MMM DD`)}&nbsp;—&nbsp;${dayjs(array[array.length - 1].dates.end).format(`DD`)}`;
      this._tripDuration = `${array[0].destination} &mdash; ... &mdash; ${array[array.length - 1].destination}`;
    }
  }

  getTemplate() {
    return createTripInfoElement(this._tripDestination, this._tripDuration);
  }
}
