import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, message } from 'antd';
import moment from 'moment';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';
import TableFragments from './TableFragments';
import { getFragmentLogs } from '../../../../utils/api';
import { formatDateTimeWithComma } from '../../../../utils/formatters';

const FragmentLogs = ({ nodeAddress }) => {
  const PAGE_SIZE = 8;
  const TABLE_SIZE = 200;

  const [fragmentLogs, setFragmentLogs] = useState();
  const [inputFragmentId, setInputFragmentId] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    if (nodeAddress && nodeAddress !== '') {
      try {
        setLoading(true);
        const fragments = await getFragmentLogs(nodeAddress);
        const foundFragments = findFragments(fragments);
        setFragmentLogs(foundFragments);
      } catch (error) {
        message.error(getMessage('errors.api.generic'));
        setFragmentLogs(undefined);
      }
    } else {
      setFragmentLogs(undefined);
    }
    setLoading(false);
  };

  const findFragments = fragments => {
    if (!fragments) return;

    const filteredFragments =
      !inputFragmentId || inputFragmentId === ''
        ? fragments
        : fragments.filter(
            fragment => fragment.fragment_id === inputFragmentId
          );

    const slicedFragments = filteredFragments.slice(
      0,
      filteredFragments.length < TABLE_SIZE
        ? filteredFragments.length
        : TABLE_SIZE
    );

    const sortedFragments = slicedFragments.sort(
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
        status = `Rejected: ${status.Rejected.reason}`;
      } else if (status && status.InABlock) {
        status = `In a Block: ${status.InABlock.date}`;
      }

      return {
        fragmentId,
        receivedAt,
        updatedAt,
        status
      };
    });

    return formattedFragments;
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setInputFragmentId();
    setFragmentLogs();
    setCurrentPage(1);
    setTotalPages(1);
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
          value={inputFragmentId}
          placeholder={getMessage('report.fragments.search.placeholder')}
          onChange={({ target: { value } }) => setInputFragmentId(value)}
        />
        <ButtonPrimary
          text={getMessage('report.fragments.search.update')}
          onClick={fetchData}
        />
      </div>
      {loading && (
        <div className="data5">
          <Icon type="loading" spin />
          <p>{getMessage('api.status.loading')}</p>
        </div>
      )}
      {!loading && (!fragmentLogs || fragmentLogs.length <= 0) && (
        <div className="data5">
          <Icon type="exclamation-circle" />
          <p>{getMessage('report.fragments.notfound')}</p>
        </div>
      )}
      {!loading && fragmentLogs && fragmentLogs.length > 0 && (
        <TableFragments
          fragments={fragmentLogs.slice(
            beginningArray,
            fragmentLogs.length - beginningArray < PAGE_SIZE
              ? fragmentLogs.length
              : beginningArray + PAGE_SIZE
          )}
        />
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
