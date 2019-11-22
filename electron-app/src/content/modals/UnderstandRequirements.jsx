import React from 'react';
import './_style.scss';

const UnderstandRequirement = () => (
  <div className="contentModal">
    <h2 className="TitleModal">Hardware</h2>
    <ul>
      <li>4 GB of RAM</li>
      <li>Processor speed is not a significant factor</li>
    </ul>
    <h2 className="TitleModal">Network</h2>
    <ul>
      <li>1 GB/hour</li>
      <li>A public ip4 address</li>
    </ul>
    <h2 className="TitleModal">Operating System</h2>
    <ul>
      <li>Linux (2.6.18 or later)</li>
      <li>BSD (NetBSD 8.x and FreeBSD 12.x)</li>
      <li>macOS (10.7 Lion or later)</li>
      <li>Windows 10</li>
    </ul>
    <h2 className="TitleModal">Cardano</h2>
    Install RUST version called{' '}
    <a
      href="https://github.com/input-output-hk/jormungandr"
      target="_blank"
      rel="noopener noreferrer"
    >
      Jormungandr
    </a>
  </div>
);

export default UnderstandRequirement;
