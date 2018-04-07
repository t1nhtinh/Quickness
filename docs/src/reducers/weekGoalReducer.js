import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function weekGoalReducer(state = initialState.weekGoal, action) {
  switch (action.type) {
    case types.LOAD_WEEK_GOAL_SUCCESS:
      return action.goal;

    case types.CHANGE_WEEK_GOAL_SUCCESS:
      return action.goal;

    default:
      return state;
  }
}