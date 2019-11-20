import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import moment from 'moment';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';
import TableSchedules from './TableSchedules';
import {
  formatDateTimeWithComma,
  formatTime
} from '../../../../utils/formatters';
import { getLeaderSchedules } from '../../../../utils/api';

const LeaderSchedules = ({ nodeAddress }) => {
  const [leaderSchedules, setLeaderSchedules] = useState();

  const fetchData = async () => {
    if (nodeAddress && nodeAddress !== '') {
      const schedules = await getLeaderSchedules(nodeAddress);
      const formattedSchedules = formatSchedules(schedules);
      setLeaderSchedules(formattedSchedules);
    } else {
      setLeaderSchedules(undefined);
    }
  };

  const formatSchedules = schedules => {
    const size = 8; // how many schedules should show
    const sortedSchedules = schedules
      .sort(
        (a, b) =>
          moment(b.scheduled_at_time).format('YYYYMMDDHHmmss') -
          moment(a.scheduled_at_time).format('YYYYMMDDHHmmss')
      )
      .slice(0, size);

    const formattedSchedules = sortedSchedules.map(schedule => {
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

    return formattedSchedules;
  };

  useEffect(() => {
    fetchData(nodeAddress);
  }, [nodeAddress]);

  return (
    <div className="card">
      <div className="titleCard3">
        <h4>{getMessage('report.leader.title')}</h4>
        <ButtonPrimary
          text={getMessage('report.leader.update')}
          onClick={fetchData}
        />
      </div>
      {leaderSchedules && leaderSchedules.length > 0 ? (
        <TableSchedules schedules={leaderSchedules} />
      ) : (
        <div className="data5">
          <Icon type="exclamation-circle" />
          <p>{getMessage('report.leader.missing')}</p>
        </div>
      )}
    </div>
  );
};

LeaderSchedules.defaultProps = {
  nodeAddress: undefined
};

LeaderSchedules.propTypes = {
  nodeAddress: PropTypes.string
};

export default LeaderSchedules;
