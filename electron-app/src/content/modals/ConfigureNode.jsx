import React from 'react';
import './_style.scss';

const ConfigureNode = () => (
  <div className="contentModal">
    <p>
      <strong>Download</strong> the node-config.yaml{' '}
      <a
        href="https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest"
        target="_blank"
        rel="noopener noreferrer"
      >
        file
      </a>{' '}
      and save it to the same location that jormungandr and jcli.
    </p>

    <p>Use a plain text editor to open the node-config.yaml and add</p>

    <ul>
      <li>Public ip address</li>
      <li>Listen address</li>
      <li>Blocks and messages update priority</li>
    </ul>

    <code className="code">
      <p>
        &quot;p2p&quot;: {'{'}
        <br />
        &emsp;listen_address: &apos;/ip4/0.0.0.0/tcp/3100&apos;,
        <br />
        &emsp;public_address: &apos;/ip4/0.0.0.0/tcp/3100&apos;,
        <br />
        &emsp;topics_of_interest: {'{'}
        <br />
        &emsp;&emsp;blocks: &apos;high&apos;,
        <br />
        &emsp;&emsp;messages: &apos;high&apos;
        <br />
        &emsp;{'}'}
        <br />
        {'}'}
      </p>
    </code>
    <br />

    <p>
      <strong>Start the node</strong> by executing the below command in the same
      location where all 3 files were saved.{' '}
    </p>
    <p>
      <code className="code">
        ./jormungandr --config node-config.yaml --genesis-block-hash
        adbdd5ede31637f6c9bad5c271eec0bc3d0cb9efb86a5b913bb55cba549d0770
      </code>
    </p>
  </div>
);

export default ConfigureNode;
