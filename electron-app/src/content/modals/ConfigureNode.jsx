import React from 'react';
import './_style.scss';

const ConfigureNode = () => (
  <div className="contentModal">
    <p className="SubTitleModal">1. Download the config.yaml file</p>
    <p>
      <strong>Download</strong> the <code className="inline-code">config.yaml</code>{' '}
      <a
        href="https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest"
        target="_blank"
        rel="noopener noreferrer"
      >
        file
      </a>{' '}
      and save it to the same location that jormungandr and jcli. <br />
      The <code className="inline-code">config.yaml</code> file has the list of trusted peers. From this
      list the node is going to download its copy of the blockchain.</p>
    <p className="SubTitleModal">2. Download the genesis-hash.txt file</p>
    <p>
      From the same location you can also download the genesis-hash.txt file.
      <br />
      The genesis-hash contains the initial configuration of the testnet. <br />
      <br />
      <p className="code">
        <code>curl -sLOJ
        https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest/download/2/genesis-hash.txt
        </code></p>
    </p>
    <p className="SubTitleModal">3. Edit config.yaml file</p>
    <p>
      By the defaul the config file comes setup for passive node, but since we
      want to creat a stake pool we need to edit the file.
    </p>
    <p>Use a plain text editor to open the config.yaml and add</p>
    <ul>
      <li>Public ip address</li>
      <li>Listen address</li>
      <li>Blocks and messages update priority</li>
    </ul>
    <code className="code">
      <p>
        &quot;p2p&quot;: {'{'}
        <br />
        &emsp;listen_address: &apos;/ip4/0.0.0.0/tcp/3000&apos;,
        <br />
        &emsp;public_address: &apos;/ip4/0.0.0.0/tcp/3000&apos;, # Replace
        0.0.0.0 with your public IP
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
    <p className="SubTitleModal">4. Start the node</p>
    <p>
      <strong>Start the node</strong> by executing the below command in the same
      location where all 3 files were saved.{' '}
    </p>
    <p>
      <p className="code">
        ./jormungandr --genesis-block-hash $(cat genesis-hash.txt) --config
        config.yaml
      </p>
    </p>
    <p className="SubTitleModal">5. Check that the node syncing</p>
    <p>
      Execute the following command in your command-line interface to check if
      your node is syncing.
    </p>
    <p className="code">
      ./jcli rest v0 node stats get --host "http://127.0.0.1:3100/api"
    </p>
    <p>It will output something like this:</p>{' '}
    <p className="code">
      blockRecvCnt: 351
      <br />
      lastBlockDate: "220.1821"
      <br />
      lastBlockFees: 0<br />
      lastBlockHash:
      13966f0025b46667f2a0ce8c13409025d10237e21b5d3f7083d3d795a9b39f2d
      <br />
      lastBlockHeight: "28663"
      <br />
      lastBlockSum: 0<br />
      lastBlockTime: "2019-09-30T08:54:17+00:00"
      <br />
      lastBlockTx: 0<br />
      txRecvCnt: 0<br />
      uptime: 1057
    </p>
    <p>
      Your node is synced with the blockchain when it receives all the blocks
      that are created in the network/blockchain in real-time.{' '}
    </p>
    <p>You can check that by following the below 2 rules:</p>
      <ol>
        <li>Execute the <code className="inline-code">node stats</code> command from above multiple times and check that the value of the
      <code className="inline-code">lastBlockHash</code>lastBlockHash field is updated (with the actual blockchain values, there
      should bea new block created every 2-5 minutes);</li>
      <li>Compare the value of the <code className="inline-code">lastBlockTime</code> field (that is in UTC) with the local time of the node. If the difference if more than 10 minutes, the node might not be synced even the node received blocks in the past <code className="inline-code">(blockRecvCnt > 0);</code></li>
      </ol> 
  </div>
);

export default ConfigureNode;
