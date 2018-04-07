import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function monTasksReducer(state = initialState.monTasks, action) {
  switch (action.type) {
    case types.LOAD_MONDAY_TASKS_SUCCESS:
      return action.tasks;

    case types.DELETE_MONDAY_TASKS_SUCCESS:
    return state.filter(task => 
       task.id != action.taskId
    );

      case types.ADD_MONDAY_TASKS_SUCCESS:
          return [
              ...state,
              Object.assign({}, action.task)
          ];

    default:
      return state;
  }
}