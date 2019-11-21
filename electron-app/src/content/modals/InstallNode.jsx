import React from 'react';
import './_style.scss';

const InstallNode = () => (
  <div className="contentModal">
    <p>
      NOTE: If you have any issues while installing Jormungandr and JCLI, please
      refer to our zendesk{' '}
      <a href="https://iohk.zendesk.com/hc/en-us/articles/360036898153">
        macOS/Linux instructions
      </a>{' '}
      or{' '}
      <a href="https://iohk.zendesk.com/hc/en-us/articles/360036898353-How-to-Install-Jormungandr-Networking-Windows-">
        Windos instructions
      </a>{' '}
      to make sure you are following the most up to date procedure.
    </p>

    <h2 className="TitleModal">
      How to install Jormungandr Networking (Linux/macOS)
    </h2>

    <p>
      1. Download the latest version jormungandr from{' '}
      <a href="https://github.com/input-output-hk/jormungandr/releases/">
        GitHub
      </a>
    </p>

    <h2 className="TitleModal">Linux</h2>

    <p>
      Under Assets select the{' '}
      <strong>
        jormungandr-v[the latest version number]-x86_64-unknown-linux-gnu.tar.gz
      </strong>{' '}
      for example{' '}
      <strong>jormungandr-v0.5.6-x86_64-unknown-linux-gnu.tar.gz</strong> and
      double click to download this archive.
    </p>

    <h2 className="TitleModal">macOS</h2>

    <p>
      Under Assets select the{' '}
      <strong>
        jormungandr-v[the latest version number]-x86_64-apple-darwin.tar.gz
      </strong>{' '}
      for example <strong>jormungandr-v0.5.6-x86_64-apple-darwin.tar.gz</strong>{' '}
      and double click to download this archive.
    </p>

    <p>2. Extract the files, either use Terminal or Finder</p>

    <p>
      Using the command line in terminal navigate to the directory where you
      downloaded the archive:{' '}
      <strong>
        tar -xvzf jormungandr-vx.x.x-x86_64-unknown-linux-gnu.tar.gz
      </strong>{' '}
      OR
    </p>

    <p>
      In Finder, navigate to the folder where you saved the archive (the default
      is the Downloads folder), Double click the archive to extract it. This
      will create a folder with the same name as the archive and the folder will
      have two files in it.{' '}
    </p>

    <p>
      3. Using the command line in Terminal you can list the files: ls -lrt,
    </p>

    <p>You shoud see jormungandr and jcli in your directory. </p>
  </div>
);

export default InstallNode;
