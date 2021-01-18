import {getRandomInteger} from "../utils/common.js";
import dayjs from "dayjs";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
  RESTAURANT: `Restaurant`,
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
  pointTypeEnum.RESTAURANT,
];

const offerOptions = [
  {
    type: pointTypeEnum.FLIGHT,
    offers: [
      {
        name: `Add luggage`,
        price: 30,
      },
      {
        name: `Switch to comfort class`,
        price: 100,
      },
      {
        name: `Add meal`,
        price: 15,
      },
      {
        name: `Choose seats`,
        price: 5,
      },
      {
        name:
          `Travel by train`,
        price: 40,
      },
    ],
  },
  {
    type: pointTypeEnum.TAXI,
    offers: [
      {
        name: `Order Uber`,
        price: 20,
      },
    ]
  },
  {
    type: pointTypeEnum.SIGHTSEEING,
    offers: [
      {
        name: `Book tickets`,
        price: 40,
      },
      {
        name: `Lunch in city`,
        price: 30,
      },
      {
        name: `Add breakfast`,
        price: 50,
      },
    ]
  },
  {
    type: pointTypeEnum.DRIVE,
    offers: [
      {
        name: `Rent a car`,
        price: 200,
      },
    ]
  },
  {
    type: pointTypeEnum.BUS,
    offers: []
  },
  {
    type: pointTypeEnum.RESTAURANT,
    offers: []
  },
  {
    type: pointTypeEnum.TRAIN,
    offers: []
  },
  {
    type: pointTypeEnum.SHIP,
    offers: []
  },
  {
    type: pointTypeEnum.TRANSPORT,
    offers: []
  },
  {
    type: pointTypeEnum.CHECKIN,
    offers: []
  }
];

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
  `In rutrum ac purus sit amet tempus.`,
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
  const ret = offerOptions.filter((item) => item.type === type).map((item) => item.offers)[0].slice();
  if (Array.isArray(ret)) {
    return ret.splice(getRandomInteger(0, ret.length - 1), getRandomInteger(0, ret.length - 1));
  } else {
    return [];
  }
};

const generateDescription = () => {
  return pointDescription.slice(getRandomInteger(1, pointDescription.length - 1)).join(``);
};

const generatePhotos = () => {
  return Array(getRandomInteger(0, 5)).fill().map(() => ({
    "src": `${PHOTO_PATH}${getRandomInteger(1, 15)}`,
    "description": `PHOTO`,
  }));
};

const destinations = [
  {
    name: `Chamonix`,
    description: generateDescription(),
    photo: generatePhotos(),
  },
  {
    name: `Geneva`,
    description: generateDescription(),
    photo: generatePhotos(),
  },
  {
    name: `Amsterdam`,
    description: generateDescription(),
    photo: generatePhotos(),
  },
  {
    name: `Nice`,
    description: generateDescription(),
    photo: generatePhotos(),
  },
  {
    name: `Monaco`,
    description: generateDescription(),
    photo: generatePhotos(),
  },
  {
    name: `Menton`,
    description: generateDescription(),
    photo: generatePhotos(),
  },
];

const generateEvent = () => {
  const eventDates = generateDate();
  const type = pointTypes[getRandomInteger(0, pointTypes.length - 1)];
  const destination = destinations[getRandomInteger(0, destinations.length - 1)];
  return {
    id: generateId(),
    type,
    destination: destination.name,
    offers: generateOfferOptions(type),
    description: destination.description,
    photo: destination.photo,
    dates: {
      start: eventDates.startDate,
      end: eventDates.endDate,
      duration: dayjs(eventDates.endDate).diff(dayjs(eventDates.startDate)),
    },
    price: getRandomInteger(0, 200),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export {
  generateEvent,
  offerOptions,
  pointTypes,
  destinations,
};
