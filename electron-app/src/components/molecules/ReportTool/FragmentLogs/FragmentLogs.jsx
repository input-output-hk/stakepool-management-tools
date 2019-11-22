import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import moment from 'moment';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';
import TableFragments from './TableFragments';
import { getFragmentLogs } from '../../../../utils/api';
import { formatDateTimeWithComma } from '../../../../utils/formatters';

const FragmentLogs = ({ nodeAddress }) => {
  const PAGE_SIZE = 8;

  const [fragmentLogs, setFragmentLogs] = useState();
  const [inputFragmentId, setInputFragmentId] = useState();
  const [errorMessage, setErrorMessage] = useState(
    getMessage('report.fragments.missing')
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    if (nodeAddress && nodeAddress !== '') {
      const fragments = await getFragmentLogs(nodeAddress);
      const foundFragments = findFragments(fragments);
      setFragmentLogs(foundFragments);
    } else {
      setFragmentLogs(undefined);
    }
  };

  const findFragments = fragments => {
    if (!inputFragmentId || inputFragmentId === '') {
      setErrorMessage(getMessage('report.fragments.missing'));
      return;
    }

    const filteredFragments = fragments.filter(
      fragment => fragment.fragment_id === inputFragmentId
    );
    const sortedFragments = filteredFragments.sort(
      (a, b) =>
        moment(b.last_updated_at).format('YYYYMMDDHHmmss') -
        moment(a.last_updated_at).format('YYYYMMDDHHmmss')
    );

    const formattedFragments = sortedFragments.map(fragment => {
      const fragmentId = fragment.fragment_id;
      const receivedAt = formatDateTimeWithComma(fragment.received_at);
      const updatedAt = formatDateTimeWithComma(fragment.last_updated_at);
      let { status } = fragment;

      if (status && status.Rejected) {
        status = status.Rejected.reason;
      } else if (status && status.InABlock) {
        status = status.InABlock.date;
      }

      return {
        fragmentId,
        receivedAt,
        updatedAt,
        status
      };
    });

    if (formattedFragments && formattedFragments.length <= 0)
      setErrorMessage(getMessage('report.fragments.notfound'));
    return formattedFragments;
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    fetchData(nodeAddress);
  }, [nodeAddress]);

  useEffect(() => {
    if (fragmentLogs && fragmentLogs.length > 0) {
      setTotalPages(Math.ceil(fragmentLogs.length / PAGE_SIZE));
    } else {
      setTotalPages(1);
    }
  }, [fragmentLogs]);

  const beginningArray = (currentPage - 1) * PAGE_SIZE;

  return (
    <div className="card">
      <div className="titleCard4">
        <h4>{getMessage('report.fragments.title')}</h4>
        <Input
          placeholder={getMessage('report.fragments.search.placeholder')}
          onChange={({ target: { value } }) => setInputFragmentId(value)}
        />
        <ButtonPrimary
          text={getMessage('report.fragments.search.update')}
          onClick={fetchData}
        />
      </div>
      {fragmentLogs && fragmentLogs.length > 0 ? (
        <TableFragments
          fragments={fragmentLogs.slice(
            beginningArray,
            fragmentLogs.length - beginningArray < PAGE_SIZE
              ? fragmentLogs.length
              : beginningArray + PAGE_SIZE
          )}
        />
      ) : (
        <div className="data5">
          <Icon type="exclamation-circle" />
          <p>{errorMessage}</p>
        </div>
      )}
      <div className="bottomBar">
        <ButtonPrimary
          text={getMessage('report.fragments.pagination.back')}
          onClick={goToPreviousPage}
        />
        <p>
          {getMessage('report.fragments.pagination.current')}
          {currentPage}
          {getMessage('report.fragments.pagination.total')}
          {totalPages}
        </p>
        <ButtonPrimary
          text={getMessage('report.fragments.pagination.next')}
          onClick={goToNextPage}
        />
      </div>
    </div>
  );
};

FragmentLogs.propTypes = {
  nodeAddress: PropTypes.string.isRequired
};

export default FragmentLogs;
