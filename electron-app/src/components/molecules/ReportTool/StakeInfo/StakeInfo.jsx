import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';
import { getStakeInfo } from '../../../../utils/api';

const StakeInfo = ({ nodeAddress }) => {
  const [stakeInfo, setStakeInfo] = useState();

  const fetchData = async () => {
    if (nodeAddress && nodeAddress !== '') {
      const stake = await getStakeInfo(nodeAddress);
      setStakeInfo(stake);
    } else {
      setStakeInfo(undefined);
    }
  };

  const calculateTotalValue = noUnassigned => {
    if (!stakeInfo || !stakeInfo.stake) return 0;

    const dangling = stakeInfo.stake.dangling ? stakeInfo.stake.dangling : 0;
    const unassigned =
      !noUnassigned && stakeInfo.stake.unassigned
        ? stakeInfo.stake.unassigned
        : 0;

    let totalPools = 0;

    if (stakeInfo.stake.pools) {
      stakeInfo.stake.pools.forEach(pool => {
        totalPools += pool[1];
      });
    }

    const total = totalPools + dangling + unassigned;
    return total;
  };

  const calculateTotalStake = () => calculateTotalValue(true);

  // TODO: figure out where to get this information
  const calculateRewardsPending = () => 2000;
  const calculateRewardsEarned = () => 2000;

  useEffect(() => {
    fetchData();
  }, [nodeAddress]);

  // TODO: Replace by functional pie charts
  return (
    <div className="card">
      <div className="titleCard3">
        <h4>{getMessage('report.stake.title')}</h4>
        <ButtonPrimary
          text={getMessage('report.stake.update')}
          onClick={fetchData}
        />
      </div>
      {stakeInfo ? (
        <div className="data2">
          <h2>
            {getMessage('report.stake.totalValue')} <br />{' '}
            {calculateTotalValue()} <br />
            {getMessage('report.stake.totalStake')} <br />{' '}
            {calculateTotalStake()}
          </h2>
          <div className="circle" />
          <h2>
            {getMessage('report.stake.rewardsPending')} <br />{' '}
            {calculateRewardsPending()} <br />
            {getMessage('report.stake.rewardsEarned')} <br />{' '}
            {calculateRewardsEarned()}
          </h2>
          <div className="circle" />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

StakeInfo.defaultProps = {
  nodeAddress: undefined
};

StakeInfo.propTypes = {
  nodeAddress: PropTypes.string
};

export default StakeInfo;
