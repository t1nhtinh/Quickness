import * as types from '../actions/actionTypes';
import initialState from './initialState';

//When the store is first initialized
//  1. the value of action.type : "@@reducx/INIT"
//  2. your reducers will be declared along with the store 

// When a reducer is called, there is a preloadedState passed into 
//your reducer function as the first parameter. If the preloadedState 
//is undefined, then your initialState will replace it as a default value. 
//Meanwhile, the action will be passed as the second parameter into reducer 
//from store.dispatch({action_object}) function call. It is same as the 
//action_object in dispatch function.

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    //Spread operator turns the courses into individual objects, 
    //then append the changed object, then return the entire objects in an array
    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ];

    //filters on the one that doesn’t match the updating course-id,
    //then spread operator kicks in, then append the updating course, then return the entire objects in an array.
    //filters out the ones that dont match 
    case types.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
