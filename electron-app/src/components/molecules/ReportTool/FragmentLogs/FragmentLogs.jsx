import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';
import TableFragments from './TableFragments';

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
    <TableFragments fragments={fragments} />
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
