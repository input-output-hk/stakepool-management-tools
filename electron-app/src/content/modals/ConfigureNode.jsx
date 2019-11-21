import React from 'react';
import './_style.scss';

const ConfigureNode = () => (
  <div className="contentModal">
    <p>
      <strong>**Download**</strong> the node-config.yaml file from this{' '}
      <a href="https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest">
        link
      </a>{' '}
      and save it to the same location that jormungandr and jcli.
    </p>

    <p>Use a plain text editor to open the node-config.yaml and add</p>

    <ul>
      <li>Public ip address and,</li>
      <li>Listen address</li>
      <li>Blocks and messages update priority</li>
    </ul>

    <p>
      ```
      <p>
        &quot;p2p&quot;: {'{'}
        listen_address: &apos;/ip4/0.0.0.0/tcp/3100&apos;,
        <br />
        public_address: &apos;/ip4/0.0.0.0/tcp/3100&apos;,
        <br />
        topics_of_interest: {'{'}
        <br />
        blocks: &apos;high&apos;,
        <br />
        messages: &apos;high&apos;
        <br />
        {'}'}
        <br />
        {'}'}
        <br />
      </p>
      ```
    </p>

    <p>
      <strong>**Start the node**</strong> by executing the below command in the
      same location where all 3 files were saved.{' '}
    </p>
    <p>
      <strong>
        `./jormungandr --config node-config.yaml --genesis-block-hash
        adbdd5ede31637f6c9bad5c271eec0bc3d0cb9efb86a5b913bb55cba549d0770`
      </strong>
    </p>
  </div>
);

export default ConfigureNode;
