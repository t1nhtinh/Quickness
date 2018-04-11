import React from 'react';
import GuestListRow from './GuestListRow';



const GuestList = (props) => {
    console.log(props);
   
    let empty = props.isEmpty; 

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
                    <tr> 
                        <td> Tinh Dang </td>
                        <td> (850) 368- 7052 </td>
                        <td> Isaac Chu </td>
                        <td>
                            <tr> 
                                 <td> <div className="optBtn" onClick={this.addGuest}>x</div> </td>
                                 <td> <div className="optBtn" onClick={this.addGuest}>-</div> </td>
                                 <td> <div className="optBtn" onClick={this.addGuest}>+</div> </td>
                            </tr>
                        </td>
                    </tr>
                    
                
                   
                    <tr> 
                        <td> De Tran</td>
                        <td> (850) 368- 7052 </td>
                        <td> JT </td>
                        <td> 
                            <tr> 
                                 <td> <div className="optBtn" onClick={this.addGuest}>x</div> </td>
                                 <td> <div className="optBtn" onClick={this.addGuest}>-</div> </td>
                                 <td> <div className="optBtn" onClick={this.addGuest}>+</div> </td>
                            </tr>
                        </td>
                    </tr>
                    
                      {empty ? null : props.guests.map((guest, i) => <GuestListRow key={i} guest={guest} />)}

                 
                </tbody>
            </table>
            </div>
  
    );
};

GuestList.propTypes = {
   // props: PropTypes.array.isRequired
  };

export default GuestList;