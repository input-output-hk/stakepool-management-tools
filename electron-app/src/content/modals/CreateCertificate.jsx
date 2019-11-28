import React from 'react';
import './_style.scss';

const CreateCertificate = () => (
  <div className="contentModal">
    <h2 className="TitleModal">Create stake pool certificate</h2>

    <h2 className="SubTitleModal">Linux/macOS</h2>

    <p>
      <strong>
        1. Download the <code className="inline-code">createStakePool.sh</code>{' '}
        and<code className="inline-code">send-certificate.sh</code> scripts and
        save them to the directory where you stored the rest of the files (jcli,
        jormungandr, config.yaml, etc):
      </strong>
    </p>
    <code className="code">
      curl -sLOJ
      https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/createStakePool.sh
    </code>
    <br />
    <code className="code">
      curl - sLOJ
      https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/send-certificate.sh
    </code>
    <br />
    <ul>
      <li>
        Check that the scripts were downloaded into the current location by
        executing <code className="inline-code">ls</code> command into the
        terminal
      </li>
      <li>
        <p>
          Change the scripts permissions in order to be able to execute them
        </p>
        <li className="code">chmod +x createStakePool.sh</li>
        <li className="code">chmod +x send-certificate.sh</li>
      </li>
      <br />
      <li>
        <p>Check the parameters required by the script</p>
        <p className="code">./createStakePool.sh --help</p>
        <p>Output:</p>
        <p className="code">
          usage: ./createStakePool.sh &lt;REST-LISTEN-PORT&gt; <br />
          &lt;ACCOUNT_SK&gt; <br />
          &lt;REST-PORT&gt; The REST Listen Port set in node-config.yaml file
          (EX: 3101) <br />
          &lt;SOURCE-SK&gt; The Secret key of the Source address`
        </p>
      </li>
    </ul>
    <br />

    <p>
      <strong>2. Execute the createStakePool script</strong>
    </p>
    <ul>
      <li>
        For the --host parameter, use the same value you used in node
        configuration (config.yaml) for the <strong>rest/listen</strong>{' '}
        parameter.
      </li>
      <li>
        <p>
          For the second parameter use the <strong>Private Key</strong> of your
          recently funded stake pool account address.
        </p>
      </li>
      <code className="code">
        ./createStakePool.sh 3100
        ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk{' '}
      </code>

      <li>
        <p>Check the results</p>
        <p>
          If everything is fine and you did not receive any error, the last line
          of the script output is your <strong>Stake Pool ID</strong>. Now you
          can check if your stake pool id appears in the list of available stake
          pools by executing the below command.
        </p>
        <code className="code">
          ./jcli rest v0 stake-pools get --host
          &quot;http://127.0.0.1:3100/api&quot;
        </code>
      </li>
      <li>
        Now you can start the node as a <strong>leader candidate</strong>, using
        the
        <code className="inline-code">--secret node-config.yaml</code>{' '}
        parameter. The <code className="inline-code">node-config.yaml</code>{' '}
        file was automatically created in the same location as
        <code className="inline-code">createStakePool.sh</code>.
      </li>
    </ul>

    <p>
      <strong>3. Send your Stake Pool certificate</strong>
    </p>
    <ul>
      <li>
        <p>Check the parameters required by the script</p>

        <p className="code">$ ./send-certificate.sh --help</p>
        <p>Output</p>
        <code className="code">
          <p>
            usage: send-certificate.sh &lt;CERTIFICATE-PATH&gt;
            &lt;REST-LISTEN-PORT&gt; &lt;ACCOUNT-SOURCE-SK&gt;
          </p>
          <p>&lt;CERT-PATH&gt; Path to a readable certificate file</p>
          <p>
            &lt;REST-PORT&gt; The REST Listen Port set in node-config.yaml file
            (EX: 3101)
          </p>
          <p>&lt;SOURCE-SK&gt; The Secret key of the Source address</p>
        </code>
      </li>
    </ul>

    <br />
    <p>
      <strong>4. Execute the send-certificate.sh script</strong>
    </p>
    <ul>
      <li>
        Make sure that the signed certificate{' '}
        <strong>(stake_pool.signcert)</strong> is in the{' '}
        <strong>same location</strong> of the{' '}
        <code className="inline-code">send-certificate.sh</code> script
      </li>
      <li>
        For the <code className="inline-code">REST-PORT</code> parameter, use
        the same value you used in node configuration (config.yaml) for the
        rest/listen parameter
      </li>

      <li>
        For the <code className="inline-code">SOURCE-SK</code> parameter, use
        the <strong>private key</strong> of your stake pool account address.
      </li>
      <p className="code">
        ./send-certificate.sh stake_pool.signcert 3100
        ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk{' '}
      </p>
    </ul>
  </div>
);

export default CreateCertificate;
