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

const calculateTotalValue = (stakeInfo, noUnassigned) => {
  if (!stakeInfo || !stakeInfo.stake) return 0;

  const dangling = stakeInfo.stake.dangling ? stakeInfo.stake.dangling : 0;
  const unassigned =
    !noUnassigned && stakeInfo.stake.unassigned
      ? stakeInfo.stake.unassigned
      : 0;

  let totalPools = 0;

  if (stakeInfo.stake.pools) {
    stakeInfo.stake.pools.forEach(pool => {
      totalPools += pool[1];
    });
  }

  const total = totalPools + dangling + unassigned;
  return total;
};

const calculateTotalStake = stakeInfo => calculateTotalValue(stakeInfo, true);

const formatSchedules = (schedules, size) =>
  schedules
    .slice(0, schedules.length < size ? schedules.length : size)
    .sort(
      (a, b) =>
        moment(b.scheduled_at_time).format('YYYYMMDDHHmmss') -
        moment(a.scheduled_at_time).format('YYYYMMDDHHmmss')
    )
    .map(schedule => {
      const scheduleDate = `${formatDateTimeWithComma(
        schedule.scheduled_at_time
      )} (${schedule.scheduled_at_date})`;

      const startedAt = schedule.wake_at_time
        ? formatTime(schedule.wake_at_time)
        : 'TBD';

      const finishedAt = schedule.finished_at_time
        ? formatTime(schedule.finished_at_time)
        : 'TBD';

      return {
        schedule: scheduleDate,
        startedAt,
        finishedAt
      };
    });

const findFragments = (fragments, inputFragmentId, size) =>
  fragments
    .filter(fragment =>
      inputFragmentId ? fragment.fragment_id === inputFragmentId : fragment
    )
    .slice(0, fragments.length < size ? fragments.length : size)
    .sort(
      (a, b) =>
        moment(b.last_updated_at).format('YYYYMMDDHHmmss') -
        moment(a.last_updated_at).format('YYYYMMDDHHmmss')
    )
    .map(fragment => {
      const fragmentId = fragment.fragment_id;
      const receivedAt = formatDateTimeWithComma(fragment.received_at);
      const updatedAt = formatDateTimeWithComma(fragment.last_updated_at);
      let { status } = fragment;

      if (status && status.Rejected) {
        status = `Rejected: ${status.Rejected.reason}`;
      } else if (status && status.InABlock) {
        status = `In a block: ${status.InABlock.date}`;
      }

      return {
        fragmentId,
        receivedAt,
        updatedAt,
        status
      };
    });

module.exports = {
  formatDateTime,
  formatDateTimeWithComma,
  formatTime,
  calculateTimeDifference,
  calculateTotalStake,
  calculateTotalValue,
  findFragments,
  formatSchedules
};
