import React from 'react';



const CalenderListRow = (props) => {
        //console.log(props);
        return(      
               <div className="column_doc">
                <h5><span>{props.day}</span></h5>
           
                <ul> {props} </ul>   
                </div>    
        );

};


CalenderListRow.propTypes = {
    //props: PropTypes.array.isRequired
  };
export default CalenderListRow;