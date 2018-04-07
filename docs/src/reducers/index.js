import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import users from './userReducer';

import client2Trainer from './client2TrainerReducer';
import client2Doctor from './client2DoctorReducer';
import trainer2Doctor from './trainer2DoctorReducer';
import monTasks from './monTasksReducer'; 
import tueTasks from './tueTasksReducer'; 
import wedTasks from './wedTasksReducer'; 
import thuTasks from './thuTasksReducer';
import friTasks from './friTasksReducer';
import weekGoal from './weekGoalReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  users,
  client2Trainer,
  client2Doctor,
  trainer2Doctor,
  monTasks,
  tueTasks,
  wedTasks,
  thuTasks,
  friTasks,
  weekGoal,
  ajaxCallsInProgress
  
});

export default rootReducer;
