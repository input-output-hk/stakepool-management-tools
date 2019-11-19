import React from 'react';
import PropTypes from 'prop-types';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';

const StakeInfo = ({
  totalValue,
  totalStake,
  rewardsPending,
  rewardsEarned,
  onUpdate
}) => (
  <div className="card">
    <div className="titleCard3">
      <h4>{getMessage('report.stake.title')}</h4>
      <ButtonPrimary
        text={getMessage('report.stake.update')}
        onClick={onUpdate}
      />
    </div>
    <div className="data2">
      <h2>
        {getMessage('report.stake.totalValue')} <br /> {totalValue} <br />
        {getMessage('report.stake.totalStake')} <br /> {totalStake}
      </h2>
      <div className="circle" />
      <h2>
        {getMessage('report.stake.rewardsPending')} <br /> {rewardsPending}{' '}
        <br />
        {getMessage('report.stake.rewardsEarned')} <br /> {rewardsEarned}
      </h2>
      <div className="circle" />
    </div>
  </div>
);

StakeInfo.propTypes = {
  totalValue: PropTypes.number.isRequired,
  totalStake: PropTypes.number.isRequired,
  rewardsPending: PropTypes.number.isRequired,
  rewardsEarned: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default StakeInfo;
