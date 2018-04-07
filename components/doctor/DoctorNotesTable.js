import React from 'react';
import '../../styles/doctor.css';
import DoctorNote from './DoctorNote';



const DoctorNotesTable = (props) => {
    //console.log(props);
    const show = props.display;

    if(show){


    return (
    
         <div className="card">
            <h2>Notes</h2>
            <div className="notes">
                <table id="notesTable" style={{color: "black"}}>
                    <thead style={{color: "black"}}>
                        <tr style={{color: "black"}}>
                            <th style={{color: "black"}}>Date</th>
                            <th style={{color: "black"}}>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.notes.map((note, i) => <DoctorNote key={i} note={note} />)}
                    </tbody>
                </table>
            </div>
            Date: <input type="date" id="commentDate" onChange={props.getDate} />
            <textarea id="comment" placeholder="Type message here..." onChange={props.onChange} value={props.input}></textarea>
            <button type="submit" onClick={props.onClick}>Add Note</button> 

        </div>
    );

}
else{
    return (
        <div className="card">
        <h2>Notes</h2>
        <div className="notes">
            <table id="notesTable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {props.notes.map((note, i) => <DoctorNote key={i} note={note} />)}
                </tbody>
            </table>
        </div>
        </div>
    );
}
};

DoctorNotesTable.propTypes = {
   // props: PropTypes.array.isRequired
  };

export default DoctorNotesTable;