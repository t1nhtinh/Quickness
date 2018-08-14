import React from 'react';

const ResourceListRow = (props) => {
        //console.log(props.provider.name);
        return(
            <option value={props.provider.name}>{props.provider.name}</option>                           
        );

};


ResourceListRow.propTypes = {
    //props: PropTypes.array.isRequired
  };
export default ResourceListRow;