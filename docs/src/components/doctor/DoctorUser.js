import React from 'react';

const DoctorUser = (props) => {

     let sendId = () => {
        props.onClick(props.user.num);
     }
   //console.log(props.user.num);
   //console.log(props);
    
    let imgSrc = (props.user.img).split('/');
    let index = imgSrc.length - 1; 
    return(
        <div className={"polaroid " + props.user.type} id={props.user.id} onClick={sendId} userID={props.user.num} >
        <img src={require("../../images/" + imgSrc[index])} onClick={props.user.onClick} userID={props.user.num} alt={props.user.type} />
        <div className="polaroid_info">
            {props.user.first} {props.user.last}
        </div>
    </div>
    
    );

};

// DoctorUser.propTypes = {
//     props: PropTypes.array.isRequired
//  };
  

export default DoctorUser;