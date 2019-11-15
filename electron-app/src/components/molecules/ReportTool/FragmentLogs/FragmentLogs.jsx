import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';

const FragmentLogs = ({
  fragments,
  currentPage,
  totalPages,
  onSearch,
  onBackPage,
  onNextPage
}) => (
  <div className="card">
    <div className="titleCard4">
      <h4>{getMessage('report.fragments.title')}</h4>
      <Input placeholder={getMessage('report.fragments.search.placeholder')} />
      <ButtonPrimary
        text={getMessage('report.fragments.search.update')}
        onClick={onSearch}
      />
    </div>
    <div className="data4">
      <div className="col">
        <h4>{getMessage('report.fragments.columns.fragment')}</h4>
      </div>
      <div className="col">
        <h4>{getMessage('report.fragments.columns.received')}</h4>
      </div>
      <div className="col">
        <h4>{getMessage('report.fragments.columns.updated')}</h4>
      </div>
      <div className="col">
        <h4>{getMessage('report.fragments.columns.status')}</h4>
      </div>
    </div>
    {(!fragments || !fragments.length) && (
      <div className="data5">
        <Icon type="exclamation-circle" />
        <p>{getMessage('report.fragments.missing')}</p>
      </div>
    )}
    <div className="bottomBar">
      <ButtonPrimary
        text={getMessage('report.fragments.pagination.back')}
        onClick={onBackPage}
      />
      <p>
        {getMessage('report.fragments.pagination.current')}
        {currentPage}
        {getMessage('report.fragments.pagination.total')}
        {totalPages}
      </p>
      <ButtonPrimary
        text={getMessage('report.fragments.pagination.next')}
        onClick={onNextPage}
      />
    </div>
  </div>
);

FragmentLogs.defaultProps = {
  fragments: []
};

FragmentLogs.propTypes = {
  fragments: PropTypes.arrayOf(
    PropTypes.shape({
      fragment_id: PropTypes.string.isRequired,
      received_at: PropTypes.string.isRequired,
      last_updated_at: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired // TODO: change to include object
    })
  ),
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
  onBackPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
};

export default FragmentLogs;
