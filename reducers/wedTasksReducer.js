import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function wedTasksReducer(state = initialState.wedTasks, action) {
  switch (action.type) {
    case types.LOAD_WEDNESDAY_TASKS_SUCCESS:
      return action.tasks;

    case types.DELETE_WEDNESDAY_TASKS_SUCCESS:
    return state.filter(task => 
       task.id != action.taskId
    );

      case types.ADD_WEDNESDAY_TASKS_SUCCESS:
          return [
              ...state,
              Object.assign({}, action.task)
          ];

    default:
      return state;
  }
}