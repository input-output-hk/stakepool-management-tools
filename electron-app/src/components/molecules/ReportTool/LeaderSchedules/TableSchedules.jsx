import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { getMessage } from '../../../../utils/messages';
import './_style.scss';

const TableSchedules = ({ schedules }) => {
  const columns = [
    {
      title: getMessage('report.leader.columns.schedule'),
      dataIndex: 'schedule',
      key: 'schedule'
    },
    {
      title: getMessage('report.leader.columns.started'),
      dataIndex: 'startedAt',
      key: 'startedAt'
    },
    {
      title: getMessage('report.leader.columns.finished'),
      dataIndex: 'finishedAt',
      key: 'finishedAt'
    }
  ];

  const renderData = column =>
    schedules.map(schedule => <p>{schedule[column]}</p>);

  return (
    <div className="tabla">
      <Table columns={columns} dataSource={schedules} pagination={false} size="small" />
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
