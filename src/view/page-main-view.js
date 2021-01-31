import AbstractView from "./abstract-view.js";

const createPageMainElement = () => {
  return `<div class="page-body__container">
  <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section>
</div>`;
};

export default class PageMain extends AbstractView {
  getTemplate() {
    return createPageMainElement();
  }

  getTripEventsElement() {
    return this.getElement().querySelector(`.trip-events`);
  }
}
