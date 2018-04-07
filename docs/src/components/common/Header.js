import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  return (
    // <nav style={{'textAlign':'center'}}>
    //   <IndexLink to="/" activeClassName="active">Home</IndexLink>
    //   {" | "}
    //   <Link to="/courses" activeClassName="active">Courses</Link>
    //   {" | "}
    //   <Link to="/doctor" activeClassName="active">Doctor</Link>
    //   {" | "}
    //   <Link to="/clientFP" activeClassName="active">Client</Link>
    //   {" | "}
    //   <Link to="/trainerFP" activeClassName="active">Trainer</Link>
    // </nav>
    <div id="head_banner">
    <IndexLink to="/"> LogOut </IndexLink>
  </div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
