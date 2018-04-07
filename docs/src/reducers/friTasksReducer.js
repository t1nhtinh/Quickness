import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function friTasksReducer(state = initialState.friTasks, action) {
  switch (action.type) {
    case types.LOAD_FRIDAY_TASKS_SUCCESS:
      return action.tasks;

    case types.DELETE_FRIDAY_TASKS_SUCCESS:
    return state.filter(task => 
       task.id != action.taskId
    );

      case types.ADD_FRIDAY_TASKS_SUCCESS:
          return [
              ...state,
              Object.assign({}, action.task)
          ];

    default:
      return state;
  }
}