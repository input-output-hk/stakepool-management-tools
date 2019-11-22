import React from 'react';
import { Table, Typography } from 'antd';
import PropTypes from 'prop-types';
import { getMessage } from '../../../../utils/messages';
import './_style.scss';

const { Paragraph } = Typography;

const TableFragments = ({ fragments }) => {
  const columns = [
    {
      title: getMessage('report.fragments.columns.fragment'),
      dataIndex: 'fragmentId',
      width: '25%',
      key: 'fragmentId',
      render: text => (
        <Paragraph copyable>
          <p>{text}</p>
        </Paragraph>
      )
    },
    {
      title: getMessage('report.fragments.columns.received'),
      dataIndex: 'receivedAt',
      width: '25%',
      key: 'receivedAt'
    },
    {
      title: getMessage('report.fragments.columns.updated'),
      dataIndex: 'updatedAt',
      width: '25%',
      key: 'updatedAt'
    },
    {
      title: getMessage('report.fragments.columns.status'),
      dataIndex: 'status',
      width: '25%',
      key: 'status'
    }
  ];

  return (
    <div className="tabla">
      <Table
        columns={columns}
        dataSource={fragments}
        pagination={false}
        size="middle"
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
