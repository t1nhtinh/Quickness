import * as types from './actionTypes';
import weekGoalApi from '../api/mockWeekGoalApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadWeekGoalSuccess(goal) {
  return { type: types.LOAD_WEEK_GOAL_SUCCESS, goal};
}

export function changeWeekGoalSuccess(goal) {
  return { type: types.CHANGE_WEEK_GOAL_SUCCESS, goal};
}

export function loadWeekGoal() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return weekGoalApi.getGoal().then(goal=> {
      dispatch(loadWeekGoalSuccess(goal));
    }).catch(error => {
      throw(error);
    });
  };
}

export function changeWeekGoal(goalMessage) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return weekGoalApi.changeGoal(goalMessage).then(goal=> {
      dispatch(changeWeekGoalSuccess(goal));
    }).catch(error => {
      throw(error);
    });
  };
}