import TripInfoView from "./view/trip-info.js";
import CostInfoView from "./view/cost.js";
import MenuView from "./view/menu.js";
import FilterFormView from "./view/filter.js";
import SorterView from "./view/sorter.js";
import TripListView from "./view/trip-list.js";
import TripPointView from "./view/trip-point.js";
import {generateEvent} from "./mocks/event.js";
import PointEditFormView from "./view/edit-form.js";
import {render, RenderPosition, replace} from "./utils/render.js";

const EVENT_COUNT = 20;
const tripMain = document.querySelector(`.trip-main`);
const tripControlsTitle = document.querySelector(`.trip-controls :last-child`);
const tripPointsContainer = document.querySelector(`.trip-events`);
const eventsPoints = new Array(EVENT_COUNT).fill().map(generateEvent);

const events = eventsPoints.slice().sort((a, b) => {
  return +a.dateTime.start - b.dateTime.start;
});

if (EVENT_COUNT) {
  render(tripPointsContainer, new SorterView().getElement(), RenderPosition.BEFOREEND);
  render(tripMain, new TripInfoView(events).getElement(), RenderPosition.AFTERBEGIN);
  const tripInfo = document.querySelector(`.trip-info`);
  render(tripInfo, new CostInfoView(events).getElement(), RenderPosition.BEFOREEND);
}

render(tripControlsTitle, new MenuView().getElement(), RenderPosition.BEFOREBEGIN);
render(tripControlsTitle, new FilterFormView().getElement(), RenderPosition.AFTEREND);
render(tripPointsContainer, new TripListView(events).getElement(), RenderPosition.BEFOREEND);

const tripPointsList = document.querySelector(`.trip-events__list`);
const renderTripPoint = (tripListElement, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const tripPointEditComponent = new PointEditFormView(tripPoint);

  const replaceTripPointToEditForm = () => {
    replace(tripPointEditComponent, tripPointComponent);
  };

  const replaceEditFormToTripPoint = () => {
    replace(tripPointComponent, tripPointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditFormToTripPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripPointComponent.setEditClickHandler(() => {
    replaceTripPointToEditForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripPointEditComponent.setCloseClickHandler(() => {
    replaceEditFormToTripPoint();
  });

  tripPointEditComponent.setSubmitHandler(() => {
    replaceEditFormToTripPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripListElement, tripPointComponent, RenderPosition.BEFOREEND);
};

for (let i = 0; i < Math.min(events.length, EVENT_COUNT); i++) {
  renderTripPoint(tripPointsList, events[i]);
}
