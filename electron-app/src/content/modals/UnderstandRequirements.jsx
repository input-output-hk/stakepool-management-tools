import React from 'react';
import './_style.scss';

const UnderstandRequirement = () => (
  <div className="contentModal">
    <h2 className="TitleModal">Hardware</h2>
    <ul>
      <li>4 GB of RAM</li>
      <li>A Good network connection and about 1 GB of * bandwidth / hour</li>
      <li>A public ip4 address</li>
      <li>Processor speed is not a significant factor</li>
    </ul>
    <h2 className="TitleModal">Operating System</h2>
    <p>Supported stakepool operating systems.</p>
    <p>
      We support Linux, Berkeley Software Distribution (BSD), Mac, and Windows
      platforms. The following versions are required:
    </p>
    <ul>
      <li>Linux (2.6.18 or later)</li>
      <li>BSD (NetBSD 8.x and FreeBSD 12.x)</li>
      <li>macOS (10.7 Lion or later)</li>
      <li>Windows 10</li>
    </ul>
    <h2 className="TitleModal">Jormungandr</h2>
    Latest version of jormungandr and jcli{' '}
  </div>
);

export default UnderstandRequirement;
