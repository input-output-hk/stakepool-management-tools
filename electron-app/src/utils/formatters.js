import moment from 'moment-timezone';

export const formatDateTime = date =>
  date ? moment.tz(date, 'UTC').format('HH:mm:ss z [on] MM/DD/YYYY') : '';

export const formatDateTimeWithComma = date =>
  date ? moment.tz(date, 'UTC').format('MM/DD/YYYY[,] HH:mm:ss z') : '';

export const formatTime = date =>
  date ? moment.tz(date, 'UTC').format('HH:mm:ss z') : '';

export const calculateTimeDifference = seconds =>
  seconds
    ? moment()
        .subtract(seconds, 'seconds')
        .toDate()
    : new Date();

export const formatNumberToLocale = number =>
  number && !Number.isNaN(number)
    ? Number(number).toLocaleString('en-US')
    : number;
