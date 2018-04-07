import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const client2Trainer= [
  {
    name:"name",
    message: "client 2 trainer"
  }
];

const client2Doctor = [
  {
    name:"name",
    message: "client 2 doctor "
  }
];

const trainer2Doctor = [
  {
    name:"name",
    message: "trainer 2 doctor"
  }
];

class LiveChatApi {
  static getClient2TrainerChat() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(Object.assign([], client2Trainer));
      }, delay);
    });
  }

  static getClient2DoctorChat() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(Object.assign([], client2Doctor));
      }, delay);
    });
  }

  static getTrainer2DoctorChat() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(Object.assign([], trainer2Doctor));
      }, delay);
    });
  }

  static sendMessage(from,to,m) {
    let messageObj = {
      name:from,
      message : m
    };
    messageObj = Object.assign({}, messageObj); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        if (from == "client") {
          if (to == "trainer") {
            client2Trainer.push(messageObj);
          }
          else {
            client2Doctor.push(messageObj);
          }
        }
        else if (from == "trainer") {
          if (to == "doctor") {
            trainer2Doctor.push(messageObj);
          }
          else {
            client2Trainer.push(messageObj);
          }
        }
        else if(from == "doctor"){
          if (to == "trainer") {
            trainer2Doctor.push(messageObj);
          }
          else {
            client2Doctor.push(messageObj);
          }
      }
        resolve(messageObj);
      }, delay);
    });
  }
}

export default LiveChatApi;