import React from 'react';
import SignOutButton from '../SignOut';
import GoToStatsButton from '../Navigation/GoToStats';

const Footer = () => (
    <footer className="footer navbar-expand-lg">  
      <ul className="navbar-nav ">
        <SignOutButton />
        <GoToStatsButton />
      </ul>
    </footer>
  )

  export default Footer;

