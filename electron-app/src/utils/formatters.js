import moment from 'moment-timezone';

export const formatDateTime = date =>
  date ? moment.tz(date, 'UTC').format('HH:mm:ss z [on] MM/DD/YYYY') : '';
