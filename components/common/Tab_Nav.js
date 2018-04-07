import React, {PropTypes} from 'react';

const TabNav= (props) => {
    return (
          <div className="tab_nav">
            <button className="tablinks">{props.TabName}</button>
          </div>
  );
};

TabNav.propTypes = {
  TabName: PropTypes.string.isRequired
};

export default TabNav;