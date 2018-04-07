import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {

  switch (action.type) {
      
    case types.LOAD_USERS_SUCCESS:
      return action.users;

    case types.CREATE_USER_SUCCESS:
        return [
            ...state, 
            Object.assign({}, action.user)
        ];

    case types.UPDATE_USER_SUCCESS:
        return [
            ...state.filter(user => user.num !== action.user.num),
            Object.assign({}, action.user)
        ];

    case types.UPDATE_COMMENTS_SUCCESS:
      //console.log(state);
      //console.log(action.user);
      const user = Object.assign({}, action.user);
      const stateArray = Object.assign([], state);
      stateArray[user.num] = user; 
      //console.log(stateArray);
      return stateArray;

    default:
      return state;
  }
}