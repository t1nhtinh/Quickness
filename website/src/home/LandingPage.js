import React from 'react';
import '../css/landing.css';
import wallPaper from '../images/woodCoffeeCup.jpg';
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
                <img src={wallPaper} alt="wood desk" style={{'width':'100%' ,'height':'100%'}}/>             

                <div className="main_content">
                    <h4>Manage long lines. Optimize your business. Minimize wait times. </h4>
                    <h3>with a</h3>
                    <h2>Quickness</h2>                 
                    <Link to="/client">Get Started</Link>
                </div>
            </div>
        </div>
    );
  }
}



export default LandingPage;

