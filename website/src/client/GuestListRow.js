import React from 'react';
import ResourceList from './ResourceList';
import WaitedTime from './WaitedTime';

const GuestListRow = (props) => {
    //console.log(props);
    let status = 0; 
    let color = "";
    //let waitedTime = props.guest.waitedTime; 

    //console.log(props);
    if(props.guest.status === "ready"){
        color = "#4be44b";
        status = 0; 
        //props.updateWaitedTime(props.guest.index);
        
    }else if(props.guest.status === "inProgress"){
        color = "yellow";
        status = 1; 
    }else {
        color = "#ff2300d9";
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
        props.updateNumInLine(); 
    }

    let handleChecked = (event) => {
        props.updateCheckedBox(event.target.name, event.target.checked, props.guest.index); 

    }
    
    let isDone = props.guest.isDone;
    let insolesOnly = props.guest.insolesOnly;

    return(
        <tr>
            {/* <td> {props.guest.index} </td> */}
            <td> <div style={{backgroundColor: color}} className="statusBtn" onClick={setStatus}></div> </td>
            <td> {props.guest.name} </td>
            {/* <td> {props.guest.index} </td> */}
            {/* <td> {props.guest.waitedTime}<small>min </small> </td> */}
            <WaitedTime guest={props.guest} updateWaitedTime={props.updateWaitedTime} index={props.guest.index}/>
            <td> {props.guest.quoted} <small>min</small></td>
            <ResourceList providers={props.providers}  index={props.guest.index} provider={props.guest.provider} setProvider={props.setProvider}/>

            <td> 
                <div className="checkBtn">
                    <input type="checkbox" name="insolesOnly" onChange={handleChecked} checked={insolesOnly}/>               
                </div>
            </td>
            <td> 
                <div className="checkBtn">
                    <input type="checkBox" name="isDone" onChange={handleChecked} checked={isDone}/>               
                </div>
            </td>
            <td style={{textAlign: "center"}}>                                                
                {/* <td> <div className="optBtn" onClick={setStatus}>{props.guest.status}</div> </td> */}
                {/* <div className="optBtn" onClick={this.messageGuest}>M</div>  */}
                <div className="optBtn" onClick={moveUp}> <i className="up"></i> </div>  
                <div className="optBtn" onClick={moveDown}> <i className="down"></i> </div>                                          
            </td>
            {/* <td> <div style={{backgroundColor: color}} className="checkBtn" onClick={setStatus}></div> </td> */}
        </tr>
                        
    );

};

GuestListRow.propTypes = {
    //props: PropTypes.array.isRequired
  };
export default GuestListRow;