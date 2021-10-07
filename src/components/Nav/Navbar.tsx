import React from 'react';

import styles from './navbar.module.css';

const Navbar: React.FC = () => (
  <div className={styles.navbar}>
    <button type="button">Login</button>
  </div>
);

export default Navbar;
