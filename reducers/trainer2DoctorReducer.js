import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function trainer2DoctorReducer(state = initialState.trainer2Doctor, action) {
  switch (action.type) {
    case types.LOAD_TRAINER_2_DOCTOR_CHAT_SUCCESS:
      return action.chat;

    case types.SEND_TRAINER_2_DOCTOR_CHAT_MESSAGE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.message)
      ];

    default:
      return state;
  }
}