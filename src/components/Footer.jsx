import React from 'react';

const Footer = props => (
  <div style={{
    position: 'fixed', right: 0, bottom: 0, left: 0, zIndex: 100,
    padding: 6,
    backgroundColor: '#efefef',
    textAlign: 'center',
  }}>
    (c) raphiniert.com
  </div>
);

export default Footer;