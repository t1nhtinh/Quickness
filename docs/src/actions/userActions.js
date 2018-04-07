import * as types from './actionTypes'; //import all strings corresponding to action types
import userApi from '../api/mockUserApi'; //import hard-coded courses
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions'; //import AJAX functions


//exported and create course functions 
export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users};
}

export function createUserSuccess(user) {
  return {type: types.CREATE_USER_SUCCESS, user};
}

export function updateUserSuccess(user) {
  return {type: types.UPDATE_USER_SUCCESS, user};
}

export function updateUserCommentsSuccess(user){
  return {type: types.UPDATE_COMMENTS_SUCCESS, user};
}

export function loadUsers() {
  return function(dispatch) {
    dispatch(beginAjaxCall()); 
    //thunk happening here 
    return userApi.getAllUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveUser(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userApi.saveUser(user).then(user => {
      course.id ? dispatch(updateUserSuccess(user)) :
        dispatch(createUserSuccess(user));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function addComment(user, comment){
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userApi.addComment(user, comment).then(user => {
       dispatch(updateUserCommentsSuccess(user));
      // console.log(user);
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
