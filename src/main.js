import AppPresenter from "./presenter/app-presenter.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic hS2sn3dfSwSl1sa2j`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const api = new Api(END_POINT, AUTHORIZATION);

const pageHeaderContainer = document.querySelector(`.page-header`);
const pageMainContainer = document.querySelector(`.page-main`);

const appPresenter = new AppPresenter(pageHeaderContainer, pageMainContainer, api);

appPresenter.init();
