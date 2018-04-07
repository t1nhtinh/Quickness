import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tueTasksReducer(state = initialState.tueTasks, action) {
  switch (action.type) {
    case types.LOAD_TUESDAY_TASKS_SUCCESS:
      return action.tasks;

    case types.DELETE_TUESDAY_TASKS_SUCCESS:
    return state.filter(task => 
       task.id != action.taskId
    );

      case types.ADD_TUESDAY_TASKS_SUCCESS:
          return [
              ...state,
              Object.assign({}, action.task)
          ];

    default:
      return state;
  }
}