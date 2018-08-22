import React from 'react';


const ProviderListRow = (props) => {


    return(
        <tr>
            <td> s </td>
            <td> {props.provider.name} </td>
            <td> {props.provider.id} </td>
            <td> active </td>

        </tr>
                        
    );

};

ProviderListRow.propTypes = {
    //props: PropTypes.array.isRequired
  };
export default ProviderListRow;