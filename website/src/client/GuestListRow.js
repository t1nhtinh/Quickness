import React from 'react';
import ResourceList from './ResourceList';
const GuestListRow = (props) => {
//    console.log(props);
    let status = 0; 
    let color = "";

    if(props.guest.status == "ready"){
        color = "green";
        status = 0; 
    }else if(props.guest.status == "inProgress"){
        color = "yellow";
        status = 1; 
    }else {
        color = "red";
        status = 2; 
    }



    let moveUp = () => {
        props.onMove(1, props.guest.index);
    }

    let moveDown = () => {
        props.onMove(0, props.guest.index);
    }

    let setStatus = () => {
        status = (status + 1)%3; 
        props.setStatus(status, props.guest.index);  
    }

    
    return(
        <tr style={{backgroundColor: color}}>
            <td> {props.guest.name} </td>
            <td> {props.guest.index} </td>
            <ResourceList providers={props.providers}/>
            <td> 
                <table>
                    <tbody>
                        <tr>                          
                            <td> <div className="optBtn" onClick={setStatus}>{props.guest.status}</div> </td>
                            <td> <div className="optBtn" onClick={this.messageGuest}>M</div> </td>
                            <td> <div className="optBtn" onClick={moveUp}>UP</div> </td>  
                            <td> <div className="optBtn" onClick={moveDown}>DN</div> </td>                    
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