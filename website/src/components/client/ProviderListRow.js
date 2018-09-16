import React from 'react';


const ProviderListRow = (props) => {
    let status = 0; 
    let color; 
    let isDone = props.provider.isDone; 
    let index = props.provider.index;

    if(props.provider.status === "open" && isDone != true){
        color = "#4be44b";
        status = 0; 
        
    }else if(props.provider.status === "busy" && isDone != true){
        color = "yellow";
        status = 1;  
    }else {
        color = "#ff2300d9";
        status = 2; 
    }

    let showDetail = () => {
        props.showDetailProv(index); 
    }

    let setStatus = () => {
        props.setProvStatus( (status + 1) % 3,index);
    }

    let handleSold = (event) => {
        props.handleSold(event, index);
    }
    var avg = Math.floor((props.provider.sold/props.provider.visits) * 100); 


    return(
        <tr>
            <td> <div style={{backgroundColor: color}} onClick={setStatus} className="statusBtn" ></div> </td>
            <td> {props.provider.name} <strong className="detailBtn" onClick={showDetail} style={{float: "right"}} >&#8690;</strong> </td>
            <td> {props.provider.id} </td>
            <td>  {props.provider.visits}</td>
            <td><input type="number" value={props.provider.sold} onChange={handleSold}  style={{width: "100%"}}/></td>
            <td > {avg ? avg: null} </td>

        </tr>
                        
    );

};

ProviderListRow.propTypes = {
    //props: PropTypes.array.isRequired
  };
export default ProviderListRow;