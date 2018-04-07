import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function client2TrainerReducer(state = initialState.client2Trainer, action) {
  switch (action.type) {
    case types.LOAD_CLIENT_2_TRAINER_CHAT_SUCCESS:
      return action.chat;

    case types.SEND_CLIENT_2_TRAINER_CHAT_MESSAGE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.message)
      ];

    default:
      return state;
  }
}