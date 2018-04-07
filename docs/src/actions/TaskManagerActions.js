import * as types from './actionTypes';
import taskManagerApi from '../api/mockTaskManagerApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadMondayTasksSuccess(tasks) {
  return { type: types.LOAD_MONDAY_TASKS_SUCCESS, tasks};
}

export function addMondayTaskSuccess(task) {
  return { type:types.ADD_MONDAY_TASKS_SUCCESS, task};
}

export function deleteMondayTaskSuccess(taskId) {
  return { type:types.DELETE_MONDAY_TASKS_SUCCESS, taskId};
}

export function loadTuesdayTasksSuccess(tasks) {
  return { type: types.LOAD_TUESDAY_TASKS_SUCCESS, tasks};
}

export function addTuesdayTaskSuccess(task) {
  return { type:types.ADD_TUESDAY_TASKS_SUCCESS, task};
}

export function deleteTuesdayTaskSuccess(taskId) {
  return { type:types.DELETE_TUESDAY_TASKS_SUCCESS, taskId};
}

export function loadWednesdayTasksSuccess(tasks) {
  return { type: types.LOAD_WEDNESDAY_TASKS_SUCCESS, tasks};
}

export function addWednesdayTaskSuccess(task) {
  return { type:types.ADD_WEDNESDAY_TASKS_SUCCESS, task};
}

export function deleteWednesdayTaskSuccess(taskId) {
  return { type:types.DELETE_WEDNESDAY_TASKS_SUCCESS, taskId};
}

export function loadThursdayTasksSuccess(tasks) {
  return { type: types.LOAD_THURSDAY_TASKS_SUCCESS, tasks};
}

export function addThursdayTaskSuccess(task) {
  return { type:types.ADD_THURSDAY_TASKS_SUCCESS, task};
}

export function deleteThursdayTaskSuccess(taskId) {
  return { type:types.DELETE_THURSDAY_TASKS_SUCCESS, taskId};
}

export function loadFridayTasksSuccess(tasks) {
  return { type: types.LOAD_FRIDAY_TASKS_SUCCESS, tasks};
}

export function addFridayTaskSuccess(task) {
  return { type:types.ADD_FRIDAY_TASKS_SUCCESS, task};
}

export function deleteFridayTaskSuccess(taskId) {
  return { type:types.DELETE_FRIDAY_TASKS_SUCCESS, taskId};
}

export function loadMondayTasks() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return taskManagerApi.getMondayTasks().then(tasks=> {
      dispatch(loadMondayTasksSuccess(tasks));
    }).catch(error => {
      throw(error);
    });
  };
}

export function addMondayTask(task) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return taskManagerApi.addTask("Monday",task).then(taskoutput=> {
       dispatch(addMondayTaskSuccess(taskoutput));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteMondayTask(taskid) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
      return taskManagerApi.deleteTask("Monday", taskid).then(taskIdOut => {
          dispatch(deleteMondayTaskSuccess(taskIdOut));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function loadTuesdayTasks() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return taskManagerApi.getTuesdayTasks().then(tasks=> {
      dispatch(loadTuesdayTasksSuccess(tasks));
    }).catch(error => {
      throw(error);
    });
  };
}

export function addTuesdayTask(task) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return taskManagerApi.addTask("Tuesday",task).then(taskoutput=> {
       dispatch(addTuesdayTaskSuccess(taskoutput));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteTuesdayTask(taskid) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
      return taskManagerApi.deleteTask("Tuesday", taskid).then(taskIdOut => {
          dispatch(deleteTuesdayTaskSuccess(taskIdOut));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function loadWednesdayTasks() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return taskManagerApi.getWednesdayTasks().then(tasks=> {
      dispatch(loadWednesdayTasksSuccess(tasks));
    }).catch(error => {
      throw(error);
    });
  };
}

export function addWednesdayTask(task) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return taskManagerApi.addTask("Wednesday",task).then(taskoutput=> {
       dispatch(addWednesdayTaskSuccess(taskoutput));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteWednesdayTask(taskid) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
      return taskManagerApi.deleteTask("Wednesday", taskid).then(taskIdOut => {
          dispatch(deleteWednesdayTaskSuccess(taskIdOut));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function loadThursdayTasks() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return taskManagerApi.getThursdayTasks().then(tasks=> {
      dispatch(loadThursdayTasksSuccess(tasks));
    }).catch(error => {
      throw(error);
    });
  };
}

export function addThursdayTask(task) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return taskManagerApi.addTask("Thursday",task).then(taskoutput=> {
       dispatch(addThursdayTaskSuccess(taskoutput));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteThursdayTask(taskid) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
      return taskManagerApi.deleteTask("Thursday", taskid).then(taskIdOut => {
          dispatch(deleteThursdayTaskSuccess(taskIdOut));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function loadFridayTasks() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return taskManagerApi.getFridayTasks().then(tasks=> {
      dispatch(loadFridayTasksSuccess(tasks));
    }).catch(error => {
      throw(error);
    });
  };
}

export function addFridayTask(task) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return taskManagerApi.addTask("Friday",task).then(taskoutput=> {
       dispatch(addFridayTaskSuccess(taskoutput));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteFridayTask(taskid) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
      return taskManagerApi.deleteTask("Friday", taskid).then(taskIdOut => {
          dispatch(deleteFridayTaskSuccess(taskIdOut));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}