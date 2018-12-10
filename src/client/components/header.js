import React from 'react';
import { Link } from 'react-router';

/**
 * Header component
 */
const Header = () => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'header';

  return (
    <div className={baseCls}>
      <a to="/"><h1>MyTodos</h1></a>
    </div>
  )
};

export default Header;
