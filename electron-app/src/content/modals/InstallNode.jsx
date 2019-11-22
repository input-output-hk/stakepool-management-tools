import React from 'react';
import './_style.scss';

const InstallNode = () => (
  <div className="contentModal">
    <h2 className="TitleModal">Linux/macOS</h2>
    <p>
      <strong>
        1. Download the latest{' '}
        <a
          href="https://github.com/input-output-hk/jormungandr/releases/"
          target="_blank"
          rel="noopener noreferrer"
        >
          version
        </a>
      </strong>
    </p>
    <h2 className="SubTitleModal">Linux</h2>

    <p>
      See the Assest Section in Github <br />→ jormungandr-v[the latest version
      number]-x86_64-unknown-linux-gnu.tar.gz
    </p>

    <h2 className="SubTitleModal">macOS</h2>

    <p>
      See the Assets Section in GitHub <br />→ jormungandr-v[the latest version
      number]-x86_64-apple-darwin.tar.gz
    </p>

    <h2 className="TitleModal">
      2. Extract the files, either use Terminal or Finder
    </h2>

    <h2 className="SubTitleModal">Terminal</h2>
    <p>
      Using the command line navigate to the directory where you downloaded the
      archive:
      <br />
      <code className="code">
        tar -xvzf jormungandr-vx.x.x-x86_64-unknown-linux-gnu.tar.gz
      </code>
    </p>
    <p>OR</p>
    <h2 className="SubTitleModal">Finder</h2>
    <p>
      Double click the archive to extract it (the default is the Downloads
      folder).
    </p>

    <h2 className="TitleModal">
      3. Using the command line in Terminal you can list the files: ls -lrt,
    </h2>

    <p>
      You should see jormungandr and jcli successfully installed in your
      directory.{' '}
    </p>
  </div>
);

export default InstallNode;
