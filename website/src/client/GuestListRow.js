import React from 'react';
import ResourceList from './ResourceList';
const GuestListRow = (props) => {
   // console.log(props);
    return(
        <tr>
            <td> {props.guest.name} </td>
            <td> {props.guest.number} </td>
            <ResourceList providers={props.providers}/>
            <td> 
                <table>
                    <tbody>
                        <tr>                          
                            <td> <div className="optBtn" onClick={this.startProcess}>x</div> </td>
                            <td> <div className="optBtn" onClick={this.messageGuest}>IP</div> </td>
                            <td> <div className="optBtn" onClick={this.endProcess}>+</div> </td>                    
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
                        
    );

};

GuestListRow.propTypes = {
    //props: PropTypes.array.isRequired
  };
export default GuestListRow;