import React from 'react';
import PropTypes from 'prop-types';
import { getMessage } from '../../../../utils/messages';

const TableSchedules = ({ schedules }) => {
  const renderData = column =>
    schedules.map(schedule => <p>{schedule[column]}</p>);

  return (
    <div className="data3">
      <div className="col">
        <h4>{getMessage('report.leader.columns.schedule')}</h4>
        {renderData('schedule')}
      </div>
      <div className="col">
        <h4>{getMessage('report.leader.columns.started')}</h4>
        {renderData('startedAt')}
      </div>
      <div className="col">
        <h4>{getMessage('report.leader.columns.finished')}</h4>
        {renderData('finishedAt')}
      </div>
    </div>
  );
};

TableSchedules.defaultProps = {
  schedules: []
};

TableSchedules.propTypes = {
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      schedule: PropTypes.string.isRequired,
      startedAt: PropTypes.string.isRequired,
      finishedAt: PropTypes.string.isRequired
    })
  )
};

export default TableSchedules;
