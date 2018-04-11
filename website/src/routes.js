import React from 'react';
import {Route} from 'react-router-dom';
import App from './App';
import LandingPage from './home/LandingPage';
import ClientPage from './client/ClientPage';

export default (
  <div>
    <Route path="/" exact component={App} />
    <Route path="/landing" exact component={LandingPage} />
    <Route path="/client" component={ClientPage} />
  </div>
);