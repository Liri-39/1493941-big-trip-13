import TripPresenter from "./presenter/trip.js";
import {generateEvent, offerOptions, destinations} from "./mocks/event.js";
import PointsModel from "./model/points.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";

const EVENT_COUNT = 3;

const tripMain = document.querySelector(`.trip-main`);
const tripControlsTitle = document.querySelector(`.trip-controls :last-child`);
const tripPointsContainer = document.querySelector(`.trip-events`);

const eventsPoints = new Array(EVENT_COUNT).fill().map(generateEvent);
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel();
pointsModel.setPoints(eventsPoints);
destinationsModel.setDestinations(destinations);
offersModel.setOffers(offerOptions);

const tripPresenter = new TripPresenter(tripMain, tripControlsTitle, tripPointsContainer, pointsModel, offersModel, destinationsModel);
tripPresenter.init();
