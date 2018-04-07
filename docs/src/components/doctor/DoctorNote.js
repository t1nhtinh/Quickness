import React from 'react';



const DoctorNote = (props) => {
        //console.log(props);
        return(
            <tr style={{color: "black"}}>
                <td style={{color: "black"}}> {props.note.date} </td>
                <td style={{color: "black"}}> {props.note.comment} </td>
            </tr>
        );

};


DoctorNote.propTypes = {
    //props: PropTypes.array.isRequired
  };
export default DoctorNote;