import React from 'react';
import ResourceList from './ResourceList';
import WaitedTime from './WaitedTime';

const GuestListRow = (props) => {
    
    let status = 0; 
    let color = "";
    let isDone = props.guest.isDone; 
    let index = props.guest.index; 
    
    if(props.guest.status === "ready" && isDone != true){
        color = "#4be44b";
        status = 0; 
        //props.updateWaitedTime(props.guest.index);
        
    }else if(props.guest.status === "inProgress" && isDone != true){
        color = "yellow";
        status = 1; 
    }else {
        color = "#ff2300d9";
        status = 2; 
    }



    let moveUp = () => {
        props.onMove(1, index);
    }

    let moveDown = () => {
        props.onMove(0, index);
    }

    let setStatus = () => {
        status = (status + 1)%3; 
        props.setStatus(status, index);  
        props.updateNumInLine(); 
    }

    let handleChecked = (event) => {
        props.updateCheckedBox(event.target.name, event.target.checked, index); 

    }

    let page = props.page; 
    let maxRows = props.maxRows;
    let isShow;
    let minRow = (page-1) * maxRows; //1-1 = 0 * 15 --> 0 
    let maxRow = page * maxRows; //1* 15 --> 15

    if(index < minRow || index >= maxRow){
        isShow = "none"; 
    }
    else{
        isShow = "table-row";
    }


    let showDetail = () => {
        props.showDetail(index); 
    }

    return(
        <tr style={{display: isShow}}>
            {/* <td> {props.guest.index} </td> */}
            <td> <div style={{backgroundColor: color}} className="statusBtn" onClick={ !isDone ? setStatus: null}></div> </td>
            <td> 
                <small>{props.guest.index + 1}.</small> {props.guest.name} 
                <strong className="detailBtn" style={{float: "right"}} onClick={showDetail}>&#8690;</strong>               
            </td>
            <WaitedTime guest={props.guest} updateWaitedTime={props.updateWaitedTime} index={index}/>
            <td> {props.guest.quoted} <small>min</small></td>
            <td>
                <ResourceList providers={props.providers}  index={props.guest.index} provider={props.guest.provider} setProvider={props.setProvider}/>
            </td>
            <td> 
                <div className="checkBtn">
                    <input type="checkbox" name="insolesOnly" onChange={handleChecked} checked={props.guest.insolesOnly}/>               
                </div>
            </td>
            <td> 
                <div className="checkBtn">
                    <input type="checkBox" name="isDone" onChange={handleChecked} checked={props.guest.isDone}/>               
                </div>
            </td>
            <td style={{textAlign: "center"}}>
                                                      
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