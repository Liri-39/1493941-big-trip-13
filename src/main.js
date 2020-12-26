import TripPresenter from "./presenter/trip.js";
import {generateEvent} from "./mocks/event.js";
import {sortByDate} from "./utils/util.js";

const EVENT_COUNT = 20;

const tripMain = document.querySelector(`.trip-main`);
const tripControlsTitle = document.querySelector(`.trip-controls :last-child`);
const tripPointsContainer = document.querySelector(`.trip-events`);

const eventsPoints = new Array(EVENT_COUNT).fill().map(generateEvent);
const events = eventsPoints.slice().sort(sortByDate);

const tripPresenter = new TripPresenter(tripMain, tripControlsTitle, tripPointsContainer);
tripPresenter.init(events);
