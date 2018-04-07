import React from 'react';
import '../../styles/doctor.css';
import CalenderListRow from './CalenderListRow';



const CalenderList = (props) => {
    //console.log(props);
    return (
        <div>
          {props.tasks.map((task, i) => <CalenderListRow key={i} task={task}/>) }
        </div>
    );
};

CalenderList.propTypes = {
   // props: PropTypes.array.isRequired
  };

export default CalenderList;