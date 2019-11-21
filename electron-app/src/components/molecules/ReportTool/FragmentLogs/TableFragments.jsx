import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { getMessage } from '../../../../utils/messages';
import './_style.scss';

const TableFragments = ({ fragments }) => {
  const columns = [
    {
      title: getMessage('report.fragments.columns.fragment'),
      dataIndex: 'fragmentId',
      key: 'fragmentId'
    },
    {
      title: getMessage('report.fragments.columns.received'),
      dataIndex: 'receivedAt',
      key: 'receivedAt'
    },
    {
      title: getMessage('report.fragments.columns.updated'),
      dataIndex: 'updatedAt',
      key: 'updatedAt'
    },
    {
      title: getMessage('report.fragments.columns.status'),
      dataIndex: 'status',
      key: 'status'
    }
  ];

  return (
    <div className="tabla">
      <Table
        columns={columns}
        dataSource={fragments}
        pagination={false}
        size="small"
      />
    </div>
  );
};

TableFragments.defaultProps = {
  fragments: []
};

TableFragments.propTypes = {
  fragments: PropTypes.arrayOf(
    PropTypes.shape({
      fragmentId: PropTypes.string.isRequired,
      receivedAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    })
  )
};

export default TableFragments;
