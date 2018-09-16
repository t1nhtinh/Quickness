import React from 'react';
import {Link} from 'react-router-dom';

const Header = ({loading}) => {
  return (
  
    <nav style={{'textAlign':'center'}}>     
      <Link to="/client">Client</Link>
      {" | "}
      <Link to="/landing">Landing</Link>
    </nav>
  );
};


export default Header;
