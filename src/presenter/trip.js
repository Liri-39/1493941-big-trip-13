import TripInfoView from "../view/trip-info.js";
import CostInfoView from "../view/cost.js";
import MenuView from "../view/menu.js";
import FilterFormView from "../view/filter.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import TripListView from "../view/trip-list.js";
import SorterView from "../view/sorter.js";
import NoPointsView from "../view/no-points.js";
import PointPresenter from "./point.js";
import {sortByDate, sortByDuration, sortByPrice} from "../utils/util.js";
import {SortType, UpdateType, UserAction} from "../const";

export default class Trip {
  constructor(tripInfoContainer, tripMenuContainer, tripPointsContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripInfoContainer = tripInfoContainer;
    this._tripMenuContainer = tripMenuContainer;
    this._tripPointsContainer = tripPointsContainer;
    this._tripPointsPresenter = {};
    this._currentSortType = SortType.DAY;

    this._tripListComponent = null;
    this._sortComponent = null;
    this._noPointsComponent = null;
    this._tripInfoComponent = null;
    this._costInfoComponent = null;
    this._menuComponent = null;
    this._filterFormComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this.points = this._getPoints();
    this._tripInfoComponent = new TripInfoView(this.points);
    this._costInfoComponent = new CostInfoView(this.points);
    this._menuComponent = new MenuView();
    this._filterFormComponent = new FilterFormView();
    this._tripListComponent = new TripListView(this.points);
    this._noPointsComponent = new NoPointsView();

    this._renderMenu();
    this._renderFilter();
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.DURATION:
        return this._pointsModel.getPoints().slice().sort(sortByDuration);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortByPrice);
      case SortType.DAY:
        return this._pointsModel.getPoints().slice().sort(sortByDate);
    }
    return this._pointsModel.getPoints();
  }

  destroy() {
    this._clearTripPointList(true);
    remove(this._sortComponent);
    remove(this._tripListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTripPointList(false);
    this._renderSort();
    this._renderTripList();
  }

  _handleModeChange() {
    Object
      .values(this._tripPointsPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SorterView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripPointsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoints() {
    render(this._tripPointsContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderTripList() {
    render(this._tripPointsContainer, this._tripListComponent, RenderPosition.BEFOREEND);
    this._renderTripPoints();
  }

  _renderTripInfo() {
    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    const tripInfo = this._tripInfoContainer.querySelector(`.trip-info`);
    render(tripInfo, this._costInfoComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderMenu() {
    render(this._tripMenuContainer, this._menuComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderFilter() {
    render(this._tripMenuContainer, this._filterFormComponent, RenderPosition.AFTEREND);
  }

  _renderPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(tripPoint);
    this._tripPointsPresenter[tripPoint.id] = pointPresenter;
  }

  _renderTripPoints() {
    this._getPoints()
      .forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _handleViewAction(actionType, updateType, update) {

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._tripPointsPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearTripPointList(false);
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearTripPointList(true);
        this._renderTrip();
        break;
    }
  }

  _clearTripPointList(resetSortType = false) {
    Object
      .values(this._tripPointsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPointsPresenter = {};

    remove(this._sortComponent);
    remove(this._tripListComponent);
    remove(this._noPointsComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    const points = this._getPoints();
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderTripList(points);
    this._renderTripInfo();
  }
}
