import React from 'react';
import '../../css/landing.css';
import wallPaper from '../../images/stars.jpg'
import {Link} from 'react-router-dom';

class LandingPage extends React.Component {
  
    constructor(){
        super();
        this.state = {
            loading: true 
      };
    }
    
    componentDidMount() {
    
        //setTimeout(() => this.setState({ loading: false }), 1000);
    }

    render() {
        // const { loading } = this.state;

        // if(loading) { // if your component doesn't have to wait for an async action, remove this block 
        //     return null; // render null when app is not ready
        // }

        return (
            <div className="grad-land" style={{'width':'100%' ,'height':'100vh', backgroundColor:'black'}}> 
                <div className="header">
                    <div className="main_content">
                    
                        <h1>Quickness</h1>      
                        <h5>Manage Long Lines. Optimize your business. Minimize wait times. </h5> 
                        <br></br>    
                        <Link className="start-button" to="/client">Get Started</Link>

                    </div>
                </div>
                
            </div>
        );
    }
}



export default LandingPage;

