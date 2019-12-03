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

    <p>
      <code className="code">
        curl -sLOJ
        https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/createStakePool.sh
      </code>
    </p>
    <br />
    <p>
      <code className="code">
        curl - sLOJ
        https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/send-certificate.sh
      </code>
    </p>
    <ul>
      <li>
        Check that the scripts were downloaded into the current location by
        executing <code className="inline-code">ls</code> command into the
        terminal
      </li>
      <li>
        {' '}
        Change the scripts permissions in order to be able to execute them
      </li>
      <br />
      <li className="listStyle">
        <ul>
          <li className="listStyle">
            <ul>
              <li className="code">chmod +x createStakePool.sh</li>
              <li className="code">chmod +x send-certificate.sh</li>
            </ul>
          </li>
        </ul>
      </li>
      <br />
      <li>Check the parameters required by the script</li>
      <br />
      <li className="listStyle">
        <ul>
          <li className="listStyle code">./createStakePool.sh --help</li>
          <br />
          <li className="listStyle">Output:</li>
          <br />
          <li className="listStyle code">
            usage: ./createStakePool.sh &lt;REST-LISTEN-PORT&gt; <br />
            &lt;ACCOUNT_SK&gt; <br />
            &lt;REST-PORT&gt; The REST Listen Port set in node-config.yaml file
            (EX: 3101) <br />
            &lt;SOURCE-SK&gt; The Secret key of the Source address`
          </li>
        </ul>
      </li>
    </ul>

    <p>
      <strong>2. Execute the createStakePool script</strong>
    </p>
    <ul>
      <li>
        {' '}
        For the --host parameter, use the same value you used in node
        configuration (config.yaml) for the <strong>rest/listen</strong>{' '}
        parameter.
      </li>
      <li>
        For the second parameter use the <strong>Private Key</strong> of your
        recently funded stake pool account address.
      </li>
      <br />
      <li className="listStyle code">
        {' '}
        ./createStakePool.sh 3100
        ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk{' '}
      </li>
      <br />
      <li>Check the results</li>
      <li className="listStyle">
        <br />
        <ul>
          <li>
            If everything is fine and you did not receive any error, the last
            line of the script output is your <strong>Stake Pool ID</strong>.
            Now you can check if your stake pool id appears in the list of
            available stake pools by executing the below command.
          </li>
          <br />
          <li className="listStyle code">
            <code className="code">
              ./jcli rest v0 stake-pools get --host
              &quot;http://127.0.0.1:3100/api&quot;
            </code>
          </li>
        </ul>
      </li>
      <br />
      <li>
        Now you can start the node as a <strong>leader candidate</strong>, using
        the <code className="inline-code">--secret node-config.yaml</code>{' '}
        parameter. The <code className="inline-code">node-config.yaml</code>{' '}
        file was automatically created in the same location as
        <code className="inline-code">createStakePool.sh</code>.
      </li>
    </ul>

    <p>
      <strong>3. Send your Stake Pool certificate</strong>
    </p>
    <ul>
      <li className="listStyle">Check the parameters required by the script</li>
      <br />
      <li className="listStyle code">$ ./send-certificate.sh --help</li>
      <br />
      <li className="listStyle">Output</li>
      <br />
      <li className="listStyle" code>
        usage: send-certificate.sh &lt;CERTIFICATE-PATH&gt;
        &lt;REST-LISTEN-PORT&gt; &lt;ACCOUNT-SOURCE-SK&gt;
      </li>
      <br />
      <li className="listStyle code">
        &lt;CERT-PATH&gt; Path to a readable certificate file
      </li>
      <li className="listStyle code">
        &lt;REST-PORT&gt; The REST Listen Port set in node-config.yaml file (EX:
        3101)
      </li>
      <li className="listStyle code">
        &lt;SOURCE-SK&gt; The Secret key of the Source address
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
      <br />
      <li className="styleType code">
        ./send-certificate.sh stake_pool.signcert 3100
        ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk{' '}
      </li>
    </ul>
  </div>
);

export default CreateCertificate;
