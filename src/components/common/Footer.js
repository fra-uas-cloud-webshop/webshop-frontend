import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div>
      <footer className="bg-body-tertiary text-center text-lg-start">
  
  <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
    © 2025 Copyright:
    <Link className="text-body text-decoration-none" to={' '}> saiful </Link>
  </div>

</footer>
    </div>
  );
};

export default Footer;