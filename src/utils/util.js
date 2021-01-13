import dayjs from "dayjs";

const addLeadingZero = (val) => {
  return val.toString().padStart(2, `0`);
};

const getDatesDuration = (startDate, endDate) => {
  const ONE_DAY_HOURS = 24;
  const ONE_HOURS_MINUTES = 60;

  startDate = dayjs(startDate);
  endDate = dayjs(endDate);
  const durationHour = endDate.diff(startDate, `hour`);
  const durationMinutes = endDate.diff(startDate, `m`);
  const durationDay = endDate.diff(startDate, `day`);

  if (durationMinutes >= ONE_HOURS_MINUTES && durationHour < ONE_DAY_HOURS) {
    return `${addLeadingZero(durationHour)}H ${addLeadingZero(durationMinutes % ONE_HOURS_MINUTES)}M`;
  }
  if (durationHour > ONE_DAY_HOURS) {
    return `${addLeadingZero(durationDay)}D ${addLeadingZero(durationHour % ONE_DAY_HOURS)}H ${addLeadingZero(durationMinutes % ONE_HOURS_MINUTES)}M`;
  }

  return `${addLeadingZero(durationMinutes % ONE_HOURS_MINUTES)}M`;
};

const sortByDate = (A, B) => A.dates.start - B.dates.start;

const sortByDuration = (A, B) => B.dates.duration - A.dates.duration;

const sortByPrice = (A, B) => B.price - A.price;

export {
  getDatesDuration,
  sortByDate,
  sortByPrice,
  sortByDuration
};
