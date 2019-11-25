const moment = require('moment-timezone');

const formatDateTime = date =>
  date ? moment.tz(date, 'UTC').format('HH:mm:ss z [on] MM/DD/YYYY') : '';

const formatDateTimeWithComma = date =>
  date ? moment.tz(date, 'UTC').format('MM/DD/YYYY[,] HH:mm:ss z') : '';

const formatTime = date =>
  date ? moment.tz(date, 'UTC').format('HH:mm:ss z') : '';

const calculateTimeDifference = seconds =>
  seconds
    ? moment()
        .subtract(seconds, 'seconds')
        .toDate()
    : new Date();

module.exports = {
  formatDateTime,
  formatDateTimeWithComma,
  formatTime,
  calculateTimeDifference
};
