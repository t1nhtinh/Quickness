import React from 'react';
import ResourceListRow from './ResourceListRow'

const ResourceList = (props) => {
        //console.log(props);
        return(
            <td>
                <form>
                    <select>
                        <option> Select...</option>
                        {props.providers.map((provider, i) => <ResourceListRow key={i} provider={provider}/>) }
                    </select>
                </form>
            </td>                            
        );

};


ResourceList.propTypes = {
    //props: PropTypes.array.isRequired
  };
export default ResourceList;