import React from 'react';
import PropTypes from 'prop-types';
import ButtonPrimary from '../../../atoms/ButtonPrimary/ButtonPrimary';
import { getMessage } from '../../../../utils/messages';

const LeaderSchedules = ({}) => (
  <div className="card">
    <div className="titleCard3">
      <h4>Transactions</h4>
      <ButtonPrimary text="UPDATE" />
    </div>
    <div className="data3">
      <div className="col">
        <h4>Schedule</h4>
        <p>10/29/2019, 18:10:17</p>
        <p>10/29/2019, 18:10:17</p>
        <p>10/29/2019, 18:10:17</p>
        <p>10/29/2019, 18:10:17</p>
        <p>10/29/2019, 18:10:17</p>
        <p>10/29/2019, 18:10:17</p>
        <p>10/29/2019, 18:10:17</p>
      </div>
      <div className="col">
        <h4>Started At</h4>
        <p>Pending...</p>
        <p>Pending...</p>
        <p>Pending...</p>
        <p>Pending...</p>
        <p>Pending...</p>
        <p>Pending...</p>
        <p>Pending...</p>
      </div>
      <div className="col">
        <h4>Finished At</h4>
        <p>18:06:17</p>
        <p>18:06:17</p>
        <p>18:06:17</p>
        <p>18:06:17</p>
        <p>18:06:17</p>
        <p>18:06:17</p>
        <p>18:06:17</p>
      </div>
    </div>
  </div>
);

LeaderSchedules.propTypes = {};

export default LeaderSchedules;
