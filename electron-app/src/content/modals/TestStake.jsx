import React from 'react';
import './_style.scss';

const TestStake = () => (
  <div className="contentModal">
    <h2 className="TitleModal">Check that your stake pool is visible</h2>
    <p>
      Check that your Stake Pool appears in the list of available stake pools.
    </p>
    <code className="code">
      `$ jcli rest v0 stake get --host &quot;http://127.0.0.1:3100/api&quot;`
    </code>
  </div>
);

export default TestStake;
