import React from 'react';
import PropTypes from 'prop-types';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';
import TableSchedules from './TableSchedules';

// TODO: REMOVE. only for UI work
const dummySchedules = [
  {
    schedule: '10/29/2019, 18:10:17',
    startedAt: 'Pending...',
    finishedAt: '18:06:17'
  },
  {
    schedule: '10/29/2019, 18:10:17',
    startedAt: 'Pending...',
    finishedAt: '18:06:17'
  },
  {
    schedule: '10/29/2019, 18:10:17',
    startedAt: 'Pending...',
    finishedAt: '18:06:17'
  },
  {
    schedule: '10/29/2019, 18:10:17',
    startedAt: 'Pending...',
    finishedAt: '18:06:17'
  },
  {
    schedule: '10/29/2019, 18:10:17',
    startedAt: 'Pending...',
    finishedAt: '18:06:17'
  },
  {
    schedule: '10/29/2019, 18:10:17',
    startedAt: 'Pending...',
    finishedAt: '18:06:17'
  }
];

const LeaderSchedules = ({ schedules }) => (
  <div className="card">
    <div className="titleCard3">
      <h4>{getMessage('report.leader.title')}</h4>
      <ButtonPrimary text="UPDATE" />
    </div>
    <TableSchedules schedules={dummySchedules} />
  </div>
);

LeaderSchedules.defaultProps = {
  schedules: []
};

LeaderSchedules.propTypes = {
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      schedule: PropTypes.string.isRequired,
      startedAt: PropTypes.string.isRequired,
      finishedAt: PropTypes.string.isRequired
    })
  )
};

export default LeaderSchedules;
