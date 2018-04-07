import * as types from './actionTypes';
import liveChatApi from '../api/mockLiveChatApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadClient2TrainerChatSuccess(chat) {
  return { type: types.LOAD_CLIENT_2_TRAINER_CHAT_SUCCESS, chat};
}
export function loadClient2DoctorChatSuccess(chat) {
  return { type: types.LOAD_CLIENT_2_DOCTOR_CHAT_SUCCESS, chat};
}
export function loadTrainer2DoctorChatSuccess(chat) {
  return { type: types.LOAD_TRAINER_2_DOCTOR_CHAT_SUCCESS, chat};
}

export function sendClient2TrainerChatMessageSuccess(message) {
  return {type: types.SEND_CLIENT_2_TRAINER_CHAT_MESSAGE_SUCCESS, message};
}

export function sendClient2DoctorChatMessageSuccess(message) {
  return {type: types.SEND_CLIENT_2_DOCTOR_CHAT_MESSAGE_SUCCESS, message};
}

export function sendTrainer2DoctorChatMessageSuccess(message) {
  return {type: types.SEND_TRAINER_2_DOCTOR_CHAT_MESSAGE_SUCCESS, message};
}


export function loadClient2TrainerChat() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return liveChatApi.getClient2TrainerChat().then(chat=> {
      dispatch(loadClient2TrainerChatSuccess(chat));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadClient2DoctorChat() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return liveChatApi.getClient2DoctorChat().then(chat=> {
      dispatch(loadClient2DoctorChatSuccess(chat));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadTrainer2DoctorChat() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return liveChatApi.getTrainer2DoctorChat().then(chat=> {
      dispatch(loadTrainer2DoctorChatSuccess(chat));
    }).catch(error => {
      throw(error);
    });
  };
}

export function sendClient2TrainerChatMessage(message) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return liveChatApi.sendMessage("client","trainer",message).then(message=> {
       dispatch(sendClient2TrainerChatMessageSuccess(message));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function sendTrainer2ClientChatMessage(message) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return liveChatApi.sendMessage("trainer","client",message).then(message=> {
       dispatch(sendClient2TrainerChatMessageSuccess(message));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function sendClient2DoctorChatMessage(message) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return liveChatApi.sendMessage("client","doctor",message).then(message=> {
       dispatch(sendClient2DoctorChatMessageSuccess(message));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function sendDoctor2ClientChatMessage(message) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return liveChatApi.sendMessage("doctor","client",message).then(message=> {
       dispatch(sendClient2DoctorChatMessageSuccess(message));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function sendDoctor2TrainerChatMessage(message) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return liveChatApi.sendMessage("doctor","trainer",message).then(message=> {
       dispatch(sendClient2DoctorChatMessageSuccess(message));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function sendTrainer2DoctorChatMessage(message) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return liveChatApi.sendMessage("trainer","doctor",message).then(message=> {
       dispatch(sendTrainer2DoctorChatMessageSuccess(message));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}