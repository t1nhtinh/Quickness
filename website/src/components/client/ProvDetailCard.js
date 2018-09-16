import React from 'react';


const ProvDetailCard = (props) => {
    let provider = props.provider

    return (
        <div className="popup-detail">
            <div className="detail-form">
                <button className="closeBtn" onClick={props.toggleDetailProv}> &#215; </button>               
                <div className="detail-row">                       
                    <div className="detail-column">
                        <label > Name</label>
                        <div>
                            <input value={provider.name} onChange={props.getProvName}/> 
                        </div>
                        <div className="">
                            <label> EmployeeId</label>
                            <div>
                                <input type="number "value={provider.id} onChange={props.getProvId}/> 
                            </div>
                        </div>
                                       
                    </div>
                </div>                  
                <div className="detail-row" >   
                    <div style={{margin: "auto"}}>            
                        <button onClick={props.saveProvDetail}> Save </button> 
                    </div>
                </div>
            </div>
        </div>
  
    );
};

ProvDetailCard.propTypes = {
   // props: PropTypes.array.isRequired
  };

export default ProvDetailCard;