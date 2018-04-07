import React from 'react';
import '../../styles/doctor.css';
import DoctorUser from './DoctorUser';

const DoctorPolaroids = (props) => {
   // console.log(props);
    /* <div className="polaroid patient" id="patient1" onClick={props.onClick} userID="0">
                            <img src={require("../../images/jt4.jpg")} onClick={props.onClick} userID="0" alt="patient" />
                            <div className="polaroid_info">
                                Justin Timberlake
                            </div>
                        </div>
                        <div className="polaroid trainer" onClick={props.onClick} userID="1" >
                            <img src={require("../../images/jackie-chan.jpg")} alt="trainer" onClick={props.onClick} userID="1"/>
                            <div className="polaroid_info"> Jackie Chan </div>
                        </div>
                        <div className="polaroid trainer" onClick={props.onClick} userID="2" >
                            <img src={require("../../images/swim.jpg")} alt="trainer" onClick={props.onClick} userID="2"/>
                            <div className="polaroid_info"> Michael Phelps </div>
                        </div>
                        <div className="polaroid patient" onClick={props.onClick}  userID="3" >
                            <img src={require("../../images/jt4.jpg")} alt="patient" onClick={props.onClick} userID="3" />
                            <div className="polaroid_info" > JT </div>
                        </div>
                        <div className="polaroid therapist" onClick={props.onClick} userID="4">
                            <img src={require("../../images/Personal-Trainer.jpg")} alt="therapist" onClick={props.onClick} userID="4" />
                            <div className="polaroid_info"> Therapist </div>
                        </div> */ 
    return (
        <div>
                   
            {props.users.map((user,i) => <DoctorUser  key ={i} user={user} onClick={props.onClick}/> )}
            
        </div>
    );
};

DoctorPolaroids.propTypes = {
    //props: PropTypes.array.isRequired
    
  };

export default DoctorPolaroids;
