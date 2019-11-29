import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import PieChart from 'react-minimal-pie-chart';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';
import { getStakeInfo } from '../../../../utils/api';
import { formatNumberToLocale } from '../../../../utils/formatters';
import './_style.scss';

const StakeInfo = ({ nodeAddress }) => {
  const [stakeInfo, setStakeInfo] = useState();
  const [totalStake, setTotalStake] = useState();
  const [totalValue, setTotalValue] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (nodeAddress && nodeAddress !== '') {
      try {
        setLoading(true);
        const stake = await getStakeInfo(nodeAddress);
        setStakeInfo(stake);
      } catch (error) {
        message.error(getMessage('errors.api.generic'));
        setStakeInfo(undefined);
      }
    } else {
      setStakeInfo(undefined);
    }
    setLoading(false);
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
      {loading && <div>{getMessage('api.status.loading')}</div>}
      {!loading && !stakeInfo && <div>{getMessage('api.status.noInfo')}</div>}
      {!loading && stakeInfo && (
        <div className="data2">
          <div className="Info">
            <p className="TitleResult">
              {getMessage('report.stake.totalValue')}
            </p>
            <p>
              <span className="color">
                {' '}
                {formatNumberToLocale(totalValue) || 0}
              </span>
            </p>
            <br />
            <p className="TitleResult">
              {getMessage('report.stake.totalStake')}
            </p>
            <p className="color2">{formatNumberToLocale(totalStake) || 0}</p>
          </div>
          <div className="PieChart">
            <PieChart
              data={getStakePieData()}
              radius={40}
              label={({ data, dataIndex }) =>
                `${Math.round(data[dataIndex].percentage)}%`
              }
              labelStyle={{
                fontSize: '50%',
                fontFamily: 'sans-serif',
                fill: '#121212'
              }}
            />
          </div>

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
