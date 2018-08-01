import React from 'react';
import GuestListRow from './GuestListRow';



const GuestList = (props) => {
    //console.log(props);
   
    let empty = props.isEmpty; //check if table is empty

    //1. Need to fix column with for each section 
    //2. Need to make the column headers open to modifcation depending on type of store
    //3. CSS update colors based on customer status 
    return (
        <div className="guestList">
            <table id="guestTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Employee</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>                   
                      {empty ? null : props.guests.map((guest, i) => <GuestListRow key={i} guest={guest} providers={props.providers} onMove={props.onMove} setStatus={props.setStatus}/>)}                
                </tbody>
            </table>
        </div>
  
    );
};

GuestList.propTypes = {
   // props: PropTypes.array.isRequired
  };

export default GuestList;