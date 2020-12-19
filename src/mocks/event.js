import {getRandomInteger} from "../utils/common.js";
import dayjs from "dayjs";

const PHOTO_PATH = `http://picsum.photos/248/152?r=`;
const pointTypeEnum = {
  TAXI: `Taxi`,
  BUS: `Bus`,
  TRAIN: `Train`,
  SHIP: `Ship`,
  TRANSPORT: `Transport`,
  DRIVE: `Drive`,
  FLIGHT: `Flight`,
  CHECKIN: `Check-in`,
  SIGHTSEEING: `Sightseeing`,
  RESTARAURANT: `Restaurant`,
};
const pointTypes = [
  pointTypeEnum.TAXI,
  pointTypeEnum.BUS,
  pointTypeEnum.TRAIN,
  pointTypeEnum.SHIP,
  pointTypeEnum.TRANSPORT,
  pointTypeEnum.DRIVE,
  pointTypeEnum.FLIGHT,
  pointTypeEnum.CHECKIN,
  pointTypeEnum.SIGHTSEEING,
  pointTypeEnum.RESTARAURANT,
];
const pointDestinations = [
  `Chamonix`,
  `Geneva`,
  `Amsterdam`,
  `Nice`,
  `Monaco`,
  `Menton`,
];

const offerOptions = {
  [pointTypeEnum.FLIGHT]: {
    luggage: {
      name: `Add luggage`,
      price: 30,
    },
    comfort: {
      name: `Switch to comfort class`,
      price: 100,
    },
    meal: {
      name: `Add meal`,
      price: 15,
    },
    seats: {
      name: `Choose seats`,
      price: 5,
    },
    train: {
      name:
        `Travel by train`,
      price: 40,
    },
  },
  [pointTypeEnum.TAXI]: {
    taxi: {
      name: `Order Uber`,
      price: 20,
    },
  },
  [pointTypeEnum.SIGHTSEEING]: {
    tickets: {
      name: `Book tickets`,
      price: 40,
    },
    lunch: {
      name: `Lunch in city`,
      price: 30,
    },
    breakfast: {
      name: `Add breakfast`,
      price: 50,
    },
  },
  [pointTypeEnum.DRIVE]: {
    car: {
      name: `Rent a car`,
      price: 200,
    },
  },
};

const pointDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. `,
  `Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
  `Sed sed nisi sed augue convallis suscipit in sed felis. `,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. `,
  `In rutrum ac purus sit amet tempus.`
];

const generateDate = () => {
  const hourGap = getRandomInteger(0, 48);
  const minutesGap = getRandomInteger(0, 60);
  const startDate = dayjs().add(getRandomInteger(0, minutesGap), `minute`).add(getRandomInteger(-hourGap, 0), `hour`).valueOf();
  const endDate = dayjs().add(getRandomInteger(0, minutesGap), `minute`).add(getRandomInteger(0, hourGap), `hour`).valueOf();

  return {
    startDate,
    endDate,
  };
};

const generateOfferOptions = (type) => {
  const ret = [];
  for (let key in offerOptions[type]) {
    if (getRandomInteger(0, 1)) {
      // noinspection JSUnfilteredForInLoop
      ret.push(key);
    }
  }
  return ret;
};

const generateDescription = () => {

  return pointDescription.slice(getRandomInteger(1, pointDescription.length - 1)).join(``);
};

const generatePhotos = () => {
  return Array(getRandomInteger(0, 5)).fill().map(() => `${PHOTO_PATH}${getRandomInteger(1, 15)}`);
};

const generateEvent = () => {
  const type = pointTypes[getRandomInteger(0, pointTypes.length - 1)];
  return {
    type,
    destination: pointDestinations [getRandomInteger(0, pointDestinations.length - 1)],
    offers: generateOfferOptions(type),
    description: generateDescription(),
    photo: generatePhotos(),
    dateTime: {
      start: generateDate().startDate,
      end: generateDate().endDate,
    },
    price: getRandomInteger(0, 200),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

export {
  generateEvent,
  offerOptions,
  pointDestinations,
  pointTypes,
};
