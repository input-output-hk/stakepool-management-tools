import React from 'react';
import './_style.scss';

const InstallNode = () => (
  <div className="contentModal">
    <h2 className="TitleModal">Linux/macOS</h2>
    <p>
      <strong>
        1. Download{' '}
        <a
          href="https://github.com/input-output-hk/jormungandr/releases/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jormungandr
        </a>{' '}
        latest version
      </strong>
    </p>
    <h2 className="SubTitleModal">Linux</h2>

    <p>See the Assest Section in Github</p>
    <br />
    <p className="code">
      <code>
        jormungandr-v[the latest version number]-x86_64-unknown-linux-gnu.tar.gz
      </code>
    </p>

    <h2 className="SubTitleModal">macOS</h2>

    <p>See the Assets Section in GitHub </p>
    <p>
      <code className="code">
        jormungandr-v[the latest version number]-x86_64-apple-darwin.tar.gz
      </code>
    </p>

    <h2 className="TitleModal">
      2. Extract the files, either use Terminal or Finder
    </h2>

    <h2 className="SubTitleModal">Terminal</h2>
    <p>
      Using the command line navigate to the directory where you downloaded the
      archive and execute:
    </p>
    <p>
      <code className="code">
        tar -xvzf jormungandr-vx.x.x-x86_64-unknown-linux-gnu.tar.gz
      </code>
    </p>
    <p>OR</p>
    <h2 className="SubTitleModal">Finder</h2>
    <p>
      Navigate to the folder where you saved the archive and double click it to
      extract it (the default is the Downloads folder).
    </p>

    <h2 className="TitleModal">3. Verify the files were installed correctly</h2>
    <p>In Terminal just type:</p>

    <p>
      <code className="code">./jcli -V</code>
    </p>
    <p>It should return something like:</p>
    <p>
      <code className="code">jcli 0.7.2</code>
    </p>
    <p className="code">
      <strong>Note:</strong> If you have any issues while installing Jormungandr
      and JCLI, please refer to our support portal{' '}
      <a
        href="https://iohk.zendesk.com/hc/en-us/articles/360036898153"
        target="_blank"
        rel="noopener noreferrer"
      >
        macOS/Linux instructions
      </a>{' '}
      to make sure you are following the most up to date procedure.
    </p>
  </div>
);

export default InstallNode;
