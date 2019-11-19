import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { getMessage } from '../../../../utils/messages';

const TableFragments = ({ fragments }) => {
  const renderData = column =>
    fragments.map(fragment => <p>{fragment[column]}</p>);

  return (
    <div>
      <div className="data4">
        <div className="col">
          <h4>{getMessage('report.fragments.columns.fragment')}</h4>
          {fragments && fragments.length > 0 && renderData('fragment_id')}
        </div>
        <div className="col">
          <h4>{getMessage('report.fragments.columns.received')}</h4>
          {fragments && fragments.length > 0 && renderData('received_at')}
        </div>
        <div className="col">
          <h4>{getMessage('report.fragments.columns.updated')}</h4>
          {fragments && fragments.length > 0 && renderData('last_updated_at')}
        </div>
        <div className="col">
          <h4>{getMessage('report.fragments.columns.status')}</h4>
          {fragments && fragments.length > 0 && renderData('status')}
        </div>
      </div>
      {(!fragments || !fragments.length > 0) && (
        <div className="data5">
          <Icon type="exclamation-circle" />
          <p>{getMessage('report.fragments.missing')}</p>
        </div>
      )}
    </div>
  );
};

TableFragments.defaultProps = {
  fragments: []
};

TableFragments.propTypes = {
  fragments: PropTypes.arrayOf(
    PropTypes.shape({
      fragment_id: PropTypes.string.isRequired,
      received_at: PropTypes.string.isRequired,
      last_updated_at: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired // TODO: change to include object
    })
  )
};

export default TableFragments;
