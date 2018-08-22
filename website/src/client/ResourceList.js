import React from 'react';
import ResourceListRow from './ResourceListRow'

const ResourceList = (props) => {
        //console.log(props);
        
        let updateProvider = (event) => {
            props.setProvider(event.target.value, props.index);
        }

        let selected = props.provider; 

        return(
            <td>
                <form style={{widht: "auto"}}>
                    <select style={{widht: "10%", overflow: "hidden"}} value={selected} onChange={updateProvider}>
                        <option value="default"> Select...</option>
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