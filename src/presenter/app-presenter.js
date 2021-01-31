import {remove, render, RenderPosition} from "../utils/render";
import {FilterType, UpdateType} from "../const";

import PointsModel from "../model/points-model";
import OffersModel from "../model/offers-model";
import DestinationsModel from "../model/destinations-model";
import FilterModel from "../model/filter-model";

import MenuView from "../view/menu-view";
import PageMainView from "../view/page-main-view";
import StatsView from "../view/trip-stat-view";

import TripPresenter from "./trip-presenter";
import FilterPresenter from "./filter-presenter";

export default class AppPresenter {
  constructor(pageHeaderContainer, pageMainContainer, api) {
    this.pageHeaderContainer = pageHeaderContainer;
    this.pageMainContainer = pageMainContainer;

    this.api = api;

    this.pointsModel = null;
    this.offersModel = null;
    this.destinationsModel = null;
    this.filterModel = null;

    this.tripPresenter = null;
    this.filterPresenter = null;

    this.menuComponent = null;
    this.pageMainComponent = null;
    this.statisticComponent = null;

    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handlePointNewFormClose = this.handlePointNewFormClose.bind(this);
  }

  init() {
    this.pointsModel = new PointsModel();
    this.offersModel = new OffersModel();
    this.destinationsModel = new DestinationsModel();
    this.filterModel = new FilterModel();

    this.renderMenu();
    this.renderPageMain();

    this.tripPresenter = new TripPresenter(
        this.menuComponent.getTripMainElement(),
        this.pageMainComponent.getTripEventsElement(),
        this.pointsModel,
        this.offersModel,
        this.destinationsModel,
        this.filterModel,
        this.api
    );

    this.filterPresenter = new FilterPresenter(
        this.menuComponent.getTripMainControlsElement(),
        this.filterModel,
        this.pointsModel
    );

    this.tripPresenter.init();
    this.filterPresenter.init();

    Promise.all([
      this.api.getOffers(),
      this.api.getDestinations(),
      this.api.getPoints(),
    ])
      .then(([offers, destinations, points]) => {
        this.offersModel.setOffers(offers);
        this.destinationsModel.setDestinations(destinations);
        this.pointsModel.setPoints(UpdateType.INIT, points);
      })
      .catch(() => {
        this.pointsModel.setPoints(UpdateType.INIT, []);
      });
  }

  renderMenu() {
    const menuComponent = new MenuView();
    menuComponent.setAddButtonClickHandler(this.handleAddButtonClick);
    menuComponent.setTableTabClickHandler(this.handleStatsTabClick);
    menuComponent.setStatsTabClickHandler(this.handleTableTabClick);
    render(this.pageHeaderContainer, menuComponent, RenderPosition.AFTERBEGIN);

    this.menuComponent = menuComponent;
  }

  renderStatistic() {
    const points = this.pointsModel.getPoints();
    this.statisticComponent = new StatsView(points);
    render(this.pageMainComponent.getTripEventsElement(), this.statisticComponent, RenderPosition.AFTEREND);
  }

  renderPageMain() {
    this.pageMainComponent = new PageMainView();
    render(this.pageMainContainer, this.pageMainComponent, RenderPosition.AFTERBEGIN);
  }

  handleAddButtonClick() {
    this.tripPresenter.destroy();
    this.filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.tripPresenter.init();

    remove(this.statisticComponent);

    this.tripPresenter.createPoint(this.handlePointNewFormClose);
  }

  handleTableTabClick() {
    remove(this.statisticComponent);

    this.tripPresenter.destroy();
    this.filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this.tripPresenter.init();
    // this.menuComponent.getElement().querySelector(`[data-name=${MenuItem.ADD_NEW_POINT}]`).disabled = false;
  }

  handleStatsTabClick() {
    this.tripPresenter.destroy();
    this.filterModel.setFilter(UpdateType.MAJOR, FilterType.DISABLED);
    const points = this.pointsModel.getPoints();
    if (points.length !== 0) {
      this.tripPresenter.renderTripInfo();
    }
    this.renderStatistic();
  }

  handlePointNewFormClose() {
    // this.menuComponent.getElement().querySelector(`[data-name=${MenuItem.TABLE}]`).disable = false;
    // this.menuComponent.setMenuItem(MenuItem.TABLE);
  }
}
