import React from 'react';
import ResourceList from './ResourceList';


const GuestListCard = (props) => {
    // console.log(props);
    let guests = props.guests;
    let guest = props.guest;
    let providers = props.providers;

    let processTime = () => {
        let processStartTime = new Date(guest.processStartTime);
        let finishTime = new Date(guest.finishTime); 
        let diff = Math.abs(new Date(processStartTime - finishTime));
        diff = Math.round((diff/1000)/60);
        return diff;
    }

    return (
        <div className="popup-detail">
            <div className="detail-form">
                <button className="closeBtn " onClick={props.toggleDetailPopup}> &#215; </button>               
                <div className="detail-row">                       
                    <div className="detail-column">
                        <label htmlFor="guestName" > Name</label>
                        <div>
                            <input id="guestName" value={guest.name} onChange={props.getGuestName}/> 
                        </div>
                        
                        <div>
                            <label> ShoeDog Pro</label>
                            <ResourceList providers={providers}  index={guest.index} provider={guests[guest.index].provider} setProvider={props.setProvider}/>
                        </div>   
                        <br></br>
                        {/* <div className="detail-row">                                                  
                            <label className="scanner-box">Scanner<input type="checkbox" />  </label>   
                        </div> */}

                            <label htmlFor="guestNotes"> Notes</label>
                            <div>
                                <textarea className="form-control" id="guestNotes"value={guest.notes} onChange={props.getGuestNotes}> </textarea> 
                            </div>
                    </div>                             
                 

                    <div className="detail-column">
                        <div className="">
                            <label htmlFor="guestNumber"> Number</label>
                            <div>
                                <input id="guestNumber" type="number " value={guest.number} onChange={props.getGuestNumber}/> 
                            </div>
                        </div>
                        {/* <div>
                            <label> Fit Expert</label>
                            <ResourceList providers={providers}  index={guest.index} provider={guests[guest.index].provider} setProvider={props.setProvider}/>
                        </div>    */}
                                          
                        <div className="detail-row">                           
                            <div className="detail-column">
                                Time In: {props.formatTime(guest.startTime)}
                            </div> 
                            <div className="detail-column">
                                Time Out: {guest.finishTime ? props.formatTime(guest.finishTime) : null} 
                            </div> 
                             
                        </div>
                        <div className="detail-row">    
                            <div className="detail-column">
                                Waited: {guest.waitedTime} <small>min</small>
                            </div>                      
                            <div className="detail-column">
                                Process Time: {guest.processStartTime && guest.finishTime ? processTime() : 0} <small>min</small>
                            </div> 
                            
                        </div>
                    </div>
                </div>                  
                <div className="detail-row" >   
                    <div style={{margin: "auto"}}>            
                        <button onClick={props.saveGuestDetail}> Save </button> 
                    </div>
                </div>
            </div>
        </div>
  
    );
};

GuestListCard.propTypes = {
   // props: PropTypes.array.isRequired
  };

export default GuestListCard;