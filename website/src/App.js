import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header'
import {Route} from 'react-router-dom';
import LandingPage from './components/home/LandingPage';
import ClientPage from './components/client/ClientPage';
import fire from './config/fire';
import Login from './components/login/Login'
class App extends Component {

  constructor() {
    super();
    this.state = ({
      user: null,
      loading: true,
      verified: false,
      userId: ''
    });

    this.authListener = this.authListener.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
  }

  componentDidMount() {
    this.authListener();

    setTimeout(() => this.setState({ loading: false }), 1500);
  }


  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        
        this.setState({ 
          user,
          userId: user.uid
        });
        
        this.verifyUser();
      } else {
        this.setState({ user: null });
      }
    });
  }

  verifyUser(){
    
    let userRef = fire.database().ref('users/' + this.state.userId);
    let verified = false; 
    let storeNumber; 
    
    userRef.on('value', snapshot => { 
       if(snapshot.val()){
        verified = snapshot.val().companyVerified;
        storeNumber = snapshot.val().store;
        this.setState({ 
          verified: verified,
          storeNumber: storeNumber
        }); 
      }
    })
  }


  render() {

    const { loading } = this.state;
    // console.log(this.state);
    // console.log(this.state.userId);
    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return null; // render null when app is not ready
    }
    
    return (
      <div className="App">
        {/* <Header /> */}              
          {this.state.user && this.state.verified && this.state.storeNumber ?
            <div className="loader">
              <Route path="/" exact component={LandingPage} />
              <Route path="/client" render={(props) => <ClientPage {...props} storeNumber={this.state.storeNumber}/>} />
            </div>
          : <Login /> }
  
      </div>
    );
  }
}

export default App;
