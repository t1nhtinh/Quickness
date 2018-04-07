import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ClientFrontPage from './components/client/ClientPage';
import TrainerFrontPage from './components/trainer/TrainerPage';
import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default
import LandingPage from './components/landing/LandingPage'; 
import DoctorPage from './components/doctor/DoctorPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="courses" component={CoursesPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />
    <Route path="about" component={AboutPage} />
    <Route path="clientFP" component={ClientFrontPage} />
    <Route path="trainerFP" component={TrainerFrontPage} />
    <Route path="landing" component= {LandingPage}/>
    <Route path="doctor" component= {DoctorPage}/>
  </Route>
);
