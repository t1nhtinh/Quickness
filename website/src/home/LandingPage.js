import React from 'react';
import '../css/landing.css';
import wallPaper from '../images/woodCoffee.jpg';
import {Link} from 'react-router-dom';

class LandingPage extends React.Component {
  
    constructor(){
        super();
        this.state = {
           
      };
    }
    

 render() {
    return (
        <div> 
            <div className="header">
                <img src={wallPaper} alt="wood desk" style={{'width':'100%' ,'height':'100vh'}}/>             

                <div className="main_content">
                    <h2>Quickness</h2>      
                    <p>Manage Long Lines. Optimize your business. Minimize wait times. </p>     
                    <Link className="start-button" to="/client">Get Started</Link>
                </div>
            </div>
        </div>
    );
  }
}



export default LandingPage;

