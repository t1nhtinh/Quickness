import React from 'react';
import '../../styles/doctor.css';
import UserStats from './UserStats';

const DoctorSummary = (props) => {
    //console.log(props);

    

    //get the image file
    let imgSrc = (props.stats.img).split('/');
    let index = imgSrc.length - 1; 

    return (
        <div className="card">
            <div>
                <h2 id="profile_header">{props.stats.type} Summary</h2> 
                <img className="profile_pic" id="profile_pic" src={require("../../images/" + imgSrc[index])} style={{'width':'100%', 'height':'100%'}}/>
                <UserStats stats={props.stats}/>
               
            </div>
        </div>
    );
};

export default DoctorSummary;

DoctorSummary.propTypes = {
   // props: PropTypes.array.isRequired,
    
  };