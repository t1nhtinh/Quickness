import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function thuTasksReducer(state = initialState.thuTasks, action) {
  switch (action.type) {
    case types.LOAD_THURSDAY_TASKS_SUCCESS:
      return action.tasks;

    case types.DELETE_THURSDAY_TASKS_SUCCESS:
    return state.filter(task => 
       task.id != action.taskId
    );

      case types.ADD_THURSDAY_TASKS_SUCCESS:
          return [
              ...state,
              Object.assign({}, action.task)
          ];

    default:
      return state;
  }
}