import moment from 'moment-timezone';

export const formatDateTime = date =>
  date ? moment.tz(date, 'UTC').format('HH:mm:ss z [on] MM/DD/YYYY') : '';

export const formatDateTimeWithComma = date =>
  date ? moment.tz(date, 'UTC').format('MM/DD/YYYY[,] HH:mm:ss z') : '';

export const formatTime = date =>
  date ? moment.tz(date, 'UTC').format('HH:mm:ss z') : '';
