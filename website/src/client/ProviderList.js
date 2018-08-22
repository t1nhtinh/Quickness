import React from 'react';
import ProviderListRow from './ProviderListRow';



const ProviderList = (props) => {
    // console.log(props);
   
    let empty = props.isEmpty; //check if table is empty


    //1. Need to fix column with for each section 
    //2. Need to make the column headers open to modifcation depending on type of store
    //3. CSS update colors based on customer status 
    return (
        <div className="guestList" style={{maxHeight: "65%"}}>
            <table id="guestTable">
                <thead>
                    <tr>
                        <th style={{width: "10%", textAlign: "center"}}>Status</th>
                        <th style={{width: "20%"}}>Name</th>
                        <th style={{width: "20%"}}>ID</th>
                        <th style={{width: "10%"}}>Active</th>
                        <th style={{width: "10%"}}>Sold</th>
                    </tr>
                </thead>               
                <tbody>                   
                      {empty ? null : props.providers.map((provider, i) => <ProviderListRow key={i} provider={provider} />)}                
                </tbody>
            </table>
            
        </div>
  
    );
};

ProviderList.propTypes = {
   // props: PropTypes.array.isRequired
  };

export default ProviderList;