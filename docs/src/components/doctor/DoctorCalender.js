import React from 'react';
import '../../styles/doctor.css';



const DoctorCalender = (props) => {
    //console.log(props);
    return (
         <div className="card">
                <h2>Calender</h2>
                    <div className="topnav">
                        <a href="#">Daily</a>
                        <a className="active" href="#">Weekly</a>
                        <a href="#">Monthly</a>
                        <div className="search-container">
                            <a className="btn active" >+</a>
                        </div>
                    </div> <br />
            <div className="cal_table">
                <div className="column_doc">
                <h5><span>Sun</span></h5>

                    <ul>
                    <li>  <p> Task1 </p> </li>
                    <li><p> Task2 </p></li>
                    </ul>
                </div>
                <div className="column_doc">
                <h5><span> Mon</span></h5>
               
                    <ul>
                    <li>  <p> THIS IS SOMETHING </p> </li>
                    <li><p> Task2 </p></li>
                    </ul>
                </div>
                <div className="column_doc">
                <h5><span>Tue</span></h5>
                </div>
                <div className="column_doc">
                <h5><span>Wed</span></h5>
                </div>
                <div className="column_doc">
                <h5><span>Thur</span></h5>
                </div>
                <div className="column_doc">
                <h5><span>Fri</span></h5>
                </div>
                <div className="column_doc">
                <h5><span>Sat</span></h5>
            </div>


        
        </div>

        </div>
    );
};


export default DoctorCalender;