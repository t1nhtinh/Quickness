import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './common/Header'
import {Route} from 'react-router-dom';
import LandingPage from './home/LandingPage';
import ClientPage from './client/ClientPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        <div>
        <Route path="/" exact component={LandingPage} />
        <Route path="/client" component={ClientPage} />
        </div>
      </div>
    );
  }
}

export default App;
