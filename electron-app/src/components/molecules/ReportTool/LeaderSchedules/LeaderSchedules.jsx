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
  const PAGE_SIZE = 8;
  const TABLE_SIZE = 200;
  const [leaderSchedules, setLeaderSchedules] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    if (nodeAddress && nodeAddress !== '') {
      const schedules = await getLeaderSchedules(nodeAddress);
      const formattedSchedules = formatSchedules(schedules);
      setLeaderSchedules(formattedSchedules);
    } else {
      setLeaderSchedules(undefined);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const formatSchedules = schedules => {
    const slicedSchedules = schedules.slice(
      0,
      schedules.length < TABLE_SIZE ? schedules.length : TABLE_SIZE
    );

    const sortedSchedules = slicedSchedules.sort(
      (a, b) =>
        moment(b.scheduled_at_time).format('YYYYMMDDHHmmss') -
        moment(a.scheduled_at_time).format('YYYYMMDDHHmmss')
    );

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

  useEffect(() => {
    if (leaderSchedules && leaderSchedules.length > 0) {
      setTotalPages(Math.ceil(leaderSchedules.length / PAGE_SIZE));
    } else {
      setTotalPages(1);
    }
  }, [leaderSchedules]);

  const beginningArray = (currentPage - 1) * PAGE_SIZE;

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
        <TableSchedules
          schedules={leaderSchedules.slice(
            beginningArray,
            leaderSchedules.length - beginningArray < PAGE_SIZE
              ? leaderSchedules.length
              : beginningArray + PAGE_SIZE
          )}
        />
      ) : (
        <div className="data5">
          <Icon type="exclamation-circle" />
          <p>{getMessage('report.leader.missing')}</p>
        </div>
      )}
      <div className="bottomBar">
        <ButtonPrimary
          text={getMessage('report.leader.pagination.back')}
          onClick={goToPreviousPage}
        />
        <p>
          {getMessage('report.leader.pagination.current')}
          {currentPage}
          {getMessage('report.leader.pagination.total')}
          {totalPages}
        </p>
        <ButtonPrimary
          text={getMessage('report.leader.pagination.next')}
          onClick={goToNextPage}
        />
      </div>
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
