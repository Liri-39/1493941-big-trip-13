import TripPresenter from "./presenter/trip.js";
import {generateEvent} from "./mocks/event.js";
import PointsModel from "./model/points.js";

const EVENT_COUNT = 2;

const tripMain = document.querySelector(`.trip-main`);
const tripControlsTitle = document.querySelector(`.trip-controls :last-child`);
const tripPointsContainer = document.querySelector(`.trip-events`);

const eventsPoints = new Array(EVENT_COUNT).fill().map(generateEvent);

const pointsModel = new PointsModel();
pointsModel.setPoints(eventsPoints);

const tripPresenter = new TripPresenter(tripMain, tripControlsTitle, tripPointsContainer, pointsModel);
tripPresenter.init();
