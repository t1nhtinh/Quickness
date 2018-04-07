/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import {loadUsers} from './actions/userActions';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';


import {loadClient2TrainerChat,loadClient2DoctorChat,loadTrainer2DoctorChat} from './actions/LiveChatActions';
import { loadMondayTasks,loadTuesdayTasks,loadWednesdayTasks,
  loadThursdayTasks,loadFridayTasks } from './actions/TaskManagerActions';
import {loadWeekGoal} from './actions/WeekGoalActions'; 


const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());
store.dispatch(loadUsers());

//Live Chat
store.dispatch(loadClient2TrainerChat());
store.dispatch(loadClient2DoctorChat());
store.dispatch(loadTrainer2DoctorChat());

//Task Manager
store.dispatch(loadMondayTasks());
store.dispatch(loadTuesdayTasks());
store.dispatch(loadWednesdayTasks());
store.dispatch(loadThursdayTasks());
store.dispatch(loadFridayTasks());

//WeekGoal
store.dispatch(loadWeekGoal());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
