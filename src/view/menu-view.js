import AbstractView from "./abstract-view.js";

const createMenuElement = () => {
  return `<div class="page-body__container  page-header__container">
        <img class="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo">

        <div class="trip-main">
          <div class="trip-main__trip-controls  trip-controls">
            <h2 class="visually-hidden">Switch trip view</h2>
            <nav class="trip-controls__trip-tabs trip-tabs">
              <a class="trip-tabs__btn trip-tabs__table trip-tabs__btn--active" href="#">Table</a>
              <a class="trip-tabs__btn trip-tabs__stats" href="#">Stats</a>
            </nav>
            <h2 class="visually-hidden">Filter events</h2>
          </div>

          <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
        </div>
        </div>`;
};

export default class MenuView extends AbstractView {
  constructor() {
    super();

    this._tableTabClickHandler = this._tableTabClickHandler.bind(this);
    this._statsTabClickHandler = this._statsTabClickHandler.bind(this);
    this._addButtonClickHandler = this._addButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuElement();
  }

  getTripMainElement() {
    return this.getElement().querySelector(`.trip-main`);
  }

  getTripMainControlsElement() {
    return this.getElement().querySelector(`.trip-main__trip-controls`);
  }

  _addButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.addButtonClick();
  }

  setAddButtonClickHandler(callback) {
    this._callback.addButtonClick = callback;
    this.getElement().querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, this._addButtonClickHandler);
  }

  _tableTabClickHandler(evt) {
    evt.preventDefault();
    this.removeActiveTab();
    evt.target.classList.add(`trip-tabs__btn--active`);
    this._callback.tableTabClick();
  }

  setTableTabClickHandler(callback) {
    this._callback.tableTabClick = callback;
    this.getElement().querySelector(`.trip-tabs__table`).addEventListener(`click`, this._tableTabClickHandler);
  }

  _statsTabClickHandler(evt) {
    evt.preventDefault();
    this.removeActiveTab();
    evt.target.classList.add(`trip-tabs__btn--active`);
    this._callback.statsTabClick();
  }

  setStatsTabClickHandler(callback) {
    this._callback.statsTabClick = callback;
    this.getElement().querySelector(`.trip-tabs__stats`).addEventListener(`click`, this._statsTabClickHandler);
  }

  removeActiveTab() {
    this.getElement().querySelector(`.trip-tabs__btn--active`).classList.remove(`trip-tabs__btn--active`);

    return this.getElement().querySelector(`.trip-tabs`);
  }

  /* setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-name=${menuItem}]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  } */
}
