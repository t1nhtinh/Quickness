import React from 'react';
import GuestListRow from './GuestListRow';



const GuestList = (props) => {
    // console.log(props);
   
    let empty = props.isEmpty; //check if table is empty

    let prevPage = () => {
        props.turnPage(0);
    }

    let nextPage = () => {
        props.turnPage(1);
    }

    //1. Need to fix column with for each section 
    //2. Need to make the column headers open to modifcation depending on type of store
    //3. CSS update colors based on customer status 
    return (
        <div className="guestList">
            <table id="guestTable">
                <thead>
                    <tr>
                        <th style={{width: "8%", textAlign: "center"}}>Status</th>
                        <th style={{width: "18%"}}>Name</th>
                        {/* <th>Number</th> */}
                        <th className="mobile-col" >Waiting</th>
                        <th className="mobile-col" >Quoted</th>
                        <th style={{width: "10%"}}>ShoeDog Pro</th>
                        
                        <th className="mobile-col" style={{ textAlign: "center"}}> Insoles Only </th>
                        <th style={{width: "5%", textAlign: "center"}}> Done </th>
                        <th style={{width: "7%", textAlign: "center" }}>
                            <div className="optBtn" onClick={prevPage}>&#10094;</div>
                            <small>{props.page}</small>
                            <div className="optBtn" onClick={nextPage} >&#10095;</div>   
                            {/* <i className="left" onClick={prevPage}></i>   
                         <i className="right" onClick={nextPage}></i> */}
                        </th>
                    </tr>
                </thead>               
                <tbody>                   
                      {empty ? null : props.guests.map((guest, i) => 
                        <GuestListRow key={i} guest={guest} providers={props.providers} 
                            onMove={props.onMove} setStatus={props.setStatus} setProvider={props.setProvider} 
                            updateNumInLine={props.updateNumInLine} updateWaitedTime={props.updateWaitedTime} 
                            updateCheckedBox={props.updateCheckedBox} page={props.page} 
                            maxRows={props.maxRows} showDetail={props.showDetail}/>)}                
                </tbody>
            </table>
            
        </div>
  
    );
};

GuestList.propTypes = {
   // props: PropTypes.array.isRequired
  };

export default GuestList;