import React from 'react';
import './_style.scss';

const CreateCertificate = () => (
  <div className="contentModal">
    <h2 className="TitleModal">Create certificate</h2>

    <h2 className="SubTitleModal">Linux/macOS</h2>

    <p>
      <strong>
        1. Download the createStakePool.sh and send-certificate.sh scripts.
      </strong>
    </p>
    <code className="code">
      wget
      https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/createStakePool.sh
    </code>
    <br />
    <code className="code">
      wget
      https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/send-certificate.sh
    </code>
    <br />
    <ul>
      <li>
        Check that the scripts were downloaded into the current location by
        executing ls command into the terminal
      </li>
      <li>
        Change the scripts permissions in order to be able to execute them
        <li className="code">chmod +x createStakePool.sh</li>
        <li className="code">chmod +x send-certificate.sh</li>
      </li>
      <br />
      <li>
        Check the parameters required by the script
        <code className="code">
          <p>./createStakePool.sh --help</p>
          <p>
            usage: ./createStakePool.sh &lt;REST-LISTEN-PORT&gt;
            &lt;ACCOUNT_SK&gt;
          </p>
          <p>
            &lt;REST-PORT&gt; The REST Listen Port set in node-config.yaml file
            (EX: 3101)
          </p>
          <p>&lt;SOURCE-SK&gt; The Secret key of the Source address`</p>
        </code>
      </li>
    </ul>
    <br />

    <p>
      <strong>2. Execute the createStakePool script</strong>
    </p>

    <p>
      <strong>Note:</strong> In the below command, for the --host parameter,
      make sure to use the same value you used in node configuration
      (node-config.yaml) for the rest/listen parameter.
    </p>

    <ul>
      <li>
        <p>
          Update the value of the second parameter with the Private Key of your
          own Account address
        </p>
        <code className="code">
          ./createStakePool.sh 3101
          ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk
        </code>
      </li>

      <li>
        <p>Check the results</p>
        <p>
          If everything is fine and you did not receive any error, the last line
          of the script output is your <strong>`Stake Pool ID`</strong>. Now you
          can check if your stake pool id appears in the list of available stake
          pools by executing the below command.
        </p>
        <code className="code">
          `./jcli rest v0 stake-pools get --host
          &quot;http://127.0.0.1:3101/api&quot;`
        </code>
      </li>
    </ul>

    <ul>
      <li>
        Now you can start the node as a &apos;leader candidate&apos;, using the
        `--secret node-config.yaml` parameter. The `node-config.yaml` file was
        automatically created in the same location as `createStakePool.sh`.
      </li>
    </ul>

    <h2 className="SubTitleModal">3. Send your Stake Pool certificate</h2>

    <p>
      <strong>Prerequisites</strong>
    </p>

    <ul>
      <li>You already started the node (it is up and synced to the testnet)</li>
      <li>
        You already have a signed certificate (Stake Pool creation or Account
        delegation);
      </li>
      <li>
        You already have an account with some **funds **in order to pay for the
        transaction fee;
      </li>
      <li>
        For all the below commands, for `--host` parameter you need to use the
        port/address you configured under the node configuration file for
        `rest/listen` parameter.
      </li>
    </ul>

    <p>
      <strong>Check the parameters required by the script</strong>
    </p>

    <code className="code">
      <p>$ ./send-certificate.sh --help</p>
      <p>
        usage: send-certificate.sh &lt;CERTIFICATE-PATH&gt;
        &lt;REST-LISTEN-PORT&gt; &lt;ACCOUNT-SOURCE-SK&gt;
      </p>
      <p>&lt;CERT-PATH&gt; Path to a readable certificate file</p>
      <p>
        &lt;REST-PORT&gt; The REST Listen Port set in node-config.yaml file (EX:
        3101)
      </p>
      <p>&lt;SOURCE-SK&gt; The Secret key of the Source address</p>
    </code>
    <br />
    <h2 className="SubTitleModal">4. Execute the send-certificate.sh script</h2>

    <p>
      <strong>Notes:</strong> In the below command, for the{' '}
      <code className="code">&lt;REST-PORT&gt;</code>
      parameter, make sure to use the same value you used in node configuration
      (node-config.yaml) for the rest/listen parameter.
    </p>

    <p>
      In the below command, we suppose that the signed certificate (the file
      named stake_pool.signcert) is in the same location with the
      send-certificate.sh script.
    </p>

    <p>
      In the below command, for the `SOURCE-SK` parameter, you need to use the
      private key of an account with enough funds for the transaction fees.{' '}
    </p>

    <code className="code">
      ./send-certificate.sh stake_pool.signcert 3101
      ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk
    </code>
  </div>
);

export default CreateCertificate;
