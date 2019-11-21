import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart';
import { Tooltip } from 'antd';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';
import { getStakeInfo } from '../../../../utils/api';

const StakeInfo = ({ nodeAddress }) => {
  const [stakeInfo, setStakeInfo] = useState();
  const [totalStake, setTotalStake] = useState();
  const [totalValue, setTotalValue] = useState();

  const fetchData = async () => {
    if (nodeAddress && nodeAddress !== '') {
      const stake = await getStakeInfo(nodeAddress);
      setStakeInfo(stake);
    } else {
      setStakeInfo(undefined);
    }
  };

  useEffect(() => {
    setTotalStake(calculateTotalStake());
    setTotalValue(calculateTotalValue());
  }, [stakeInfo]);

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

  const getStakePieData = () => [
    {
      title: getMessage('report.stake.totalValue'),
      value: totalValue || 0,
      color: '#5b7eeb'
    },
    {
      title: getMessage('report.stake.totalStake'),
      value: totalStake || 0,
      color: '#d4d4d4'
    }
  ];

  // TODO: change values by state when it's done
  const getRewardsPieData = () => [
    {
      title: getMessage('report.stake.rewardsPending'),
      value: calculateRewardsPending() || 0,
      color: '#5b7eeb'
    },
    {
      title: getMessage('report.stake.rewardsEarned'),
      value: calculateRewardsEarned() || 0,
      color: '#d4d4d4'
    }
  ];

  // TODO: figure out where to get this information
  const calculateRewardsPending = () => 0;
  const calculateRewardsEarned = () => 0;

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
            {getMessage('report.stake.totalValue')} <br /> {totalValue || 0}
            <br />
            {getMessage('report.stake.totalStake')} <br /> {totalStake || 0}
          </h2>
          <PieChart
            data={getStakePieData()}
            radius={25}
            label={({ data, dataIndex }) =>
              `${Math.round(data[dataIndex].percentage)}%`
            }
            labelStyle={{
              fontSize: '50%',
              fontFamily: 'sans-serif',
              fill: '#121212'
            }}
          />
          {/* <h2>
            {getMessage('report.stake.rewardsPending')} <br />{' '}
            {calculateRewardsPending()} <br />
            {getMessage('report.stake.rewardsEarned')} <br />{' '}
            {calculateRewardsEarned()}
          </h2>
          <PieChart
            data={getRewardsPieData()}
            radius={25}
            label={({ data, dataIndex }) =>
              `${Math.round(data[dataIndex].percentage)}%`
            }
            labelStyle={{
              fontSize: '50%',
              fontFamily: 'sans-serif',
              fill: '#121212'
            }}
          /> */}
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
