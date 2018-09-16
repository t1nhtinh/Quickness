import React from 'react';
import ResourceListRow from './ResourceListRow'

const ResourceList = (props) => {
        //console.log(props);
        
        let updateProvider = (event) => {
            props.setProvider(event.target.value, props.index);
        }

        let selected = props.provider; 

        return(
            <form>
                <select style={{width: "100%", overflow: "hidden"}} value={selected} onChange={updateProvider}>
                    <option value="default"> Select...</option>
                    {props.providers.map((provider, i) => <ResourceListRow key={i} provider={provider}/>) }
                </select>
            </form>
                          
        );

};


ResourceList.propTypes = {
    //props: PropTypes.array.isRequired
};

export default ResourceList;