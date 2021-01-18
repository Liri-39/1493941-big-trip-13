import SmartView from "../presenter/smart.js";
import dayjs from "dayjs";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_EVENT = {
  type: ``,
  destination: ``,
  offers: [],
  description: ``,
  photo: [],
  dates: {
    start: dayjs().format(`DD/MM/YY HH:mm`),
    end: dayjs().format(`DD/MM/YY HH:mm`),
  },
  price: 0,
  isFavorite: false,
};

const createOffersListElement = (pointOffers, offers) => {
  return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                      <div class="event__available-offers">
    ${pointOffers.map((value) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" data-name="${value.name}" id="event-offer-${value.name}-1" type="checkbox" name="event-offer-${value.name}" ${offers.findIndex((item) => item.name === value.name) >= 0 ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-${value.name}-1">
                <span class="event__offer-title">${value.name}</span>
                   &plus;&euro;&nbsp;
                <span class="event__offer-price">${value.price}</span>
            </label>
    </div>`).join(``)}</div></section>`;
};

const createDestinationListElement = (description) => {
  return `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                  </section>`;
};

const createPhotoListElement = (photo) => {
  return `<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photo.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join(``)}
                      </div>
                    </div>`;
};

const createEditPointElement = (data, isSubmitDisabled, offers, pointOffer, pointTypes, destinations) => {
  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${data.type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${pointTypes.map((pointType) => `<div class="event__type-item">
                          <input id="event-type-${pointType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === data.type ? `checked` : ``}>
                          <label class="event__type-label  event__type-label--${pointType.toLowerCase()}" for="event-type-${pointType.toLowerCase()}-1">${pointType}</label>
                        </div>`).join(``)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">${data.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${data.destination}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${destinations.map((item) => `<option value="${item.name}"></option>`).join(``)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(data.dates.start).format(`DD/MM/YY HH:mm`)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(data.dates.end).format(`DD/MM/YY HH:mm`)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${data.price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}>Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${pointOffer.length > 0 ? createOffersListElement(pointOffer, data.offers) : ``}
                ${data.isDestinationDescription ? createDestinationListElement(data.description) : ``}
                ${data.isPhoto ? createPhotoListElement(data.photo) : ``}
                </section>
              </form>
            </li>`;
};

export default class EditForm extends SmartView {
  constructor(event = BLANK_EVENT, offers, destinations) {
    super();
    this._data = EditForm.adaptEventToData(event);
    this._offers = offers;
    this._pointOffer = offers.find((item) => item.type === this._data.type).offers;
    this._destinations = destinations;
    this._pointTypes = offers.map((item) => item.type);
    this._isSubmitDisabled = false;
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._changeTypeHandler = this._changeTypeHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._changeOffersHandler = this._changeOffersHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
  }

  reset(event) {
    this.updateData(EditForm.adaptEventToData(event));
  }

  getTemplate() {
    return createEditPointElement(this._data, this._isSubmitDisabled, this._offers, this._pointOffer, this._pointTypes, this._destinations);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSubmitHandler(this._callback.submitClick);
    this.setCloseClickHandler(this._callback.submitClick);
    this._setDatepicker();
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._startDatepicker = flatpickr(this.getElement().querySelector(`#event-start-time-1`),
        {
          dateFormat: `d/m/Y H:i`,
          enableTime: true,
          time_24hr: true,
          defaultDate: this._data.dates.start,
          onClose: this._startDateChangeHandler,
        });

    this._endDatepicker = flatpickr(this.getElement().querySelector(`#event-end-time-1`),
        {
          dateFormat: `d/m/Y H:i`,
          enableTime: true,
          time_24hr: true,
          minDate: this._data.dates.start,
          defaultDate: this._data.dates.end,
          onClose: this._endDateChangeHandler,
        });
  }

  _changeTypeHandler(evt) {
    evt.preventDefault();

    this.updateData({
      type: evt.target.value,
      offers: [],
    });
  }

  _changeOffersHandler(evt) {
    evt.preventDefault();
    if (evt.target.checked) {
      this._data.offers.push({name: evt.target.dataset.name, price: 0});
      this.updateData({
        offers: this._data.offers
      });
    }
    if (!evt.target.checked) {
      const indexOffersOption = this._data.offers.indexOf(evt.target.dataset.name);
      this._data.offers.splice(indexOffersOption, 1);
      this.updateData({
        offers: this._data.offers,
      });
    }
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();
    if (this._destinations.map((item) => item.name).includes(evt.target.value)) {
      const destination = this._destinations.filter((item) => item.name === evt.target.value)[0];
      this._isSubmitDisabled = false;
      this.updateData({
        destination: evt.target.value,
        description: destination.description,
        photo: destination.photo,
        isDestinationDescription: destination.description !== ``,
        isDestinationPhoto: destination.photo !== [],
      });
    } else {
      this._isSubmitDisabled = true;
      this.getElement().querySelector(`.event__save-btn`).disabled = true;
    }
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._changeTypeHandler);
    this.getElement()
      .querySelector(`.event__field-group--destination`)
      .addEventListener(`change`, this._changeDestinationHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);
    if (this._pointOffer.length > 0) {
      this.getElement()
        .querySelector(`.event__available-offers`)
        .addEventListener(`change`, this._changeOffersHandler);
    }
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      dates: {
        start: dayjs([userDate]).toDate(),
        end: this._data.dates.end,
      },
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      dates: {
        start: this._data.dates.start,
        end: dayjs([userDate]).toDate(),
      },
    });
  }


  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeClickHandler);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submitClick(EditForm.adaptDataToEvent(this._data));
  }

  setSubmitHandler(callback) {
    this._callback.submitClick = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._submitHandler);
  }

  static adaptEventToData(event) {

    return Object.assign({}, event, {
      isDestinationDescription: event.description !== ``,
      isPhoto: event.photo !== []
    });
  }

  static adaptDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDestinationDescription;
    delete data.isPhoto;

    return data;
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditForm.adaptDataToEvent(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

}
