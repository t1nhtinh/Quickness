import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const monTasks = [
  {
    id: 0,
    task:"Monday0 task"
  },
  {
    id: 1,
    task:"Monday1 task"
  },
  {
    id: 2,
    task:"Monday2 task"
  },
  {
    id: 3,
    task:"Monday3 task"
  }
];

const tueTasks = [
  {
    id: 0,
    task:"Tuesday0 task"
  },
  {
    id: 1,
    task:"Tuesday1 task"
  },
  {
    id: 2,
    task:"Tuesday2 task"
  },
  {
    id: 3,
    task:"Tuesday3 task"
  }
];

const wedTasks = [
  {
    id: 0,
    task:"Wednesday0 task"
  },
  {
    id: 1,
    task:"Wednesday1 task"
  },
  {
    id: 2,
    task:"Wednesday2 task"
  },
  {
    id: 3,
    task:"Wednesday3 task"
  }
];

const thuTasks = [
  {
    id: 0,
    task:"Thursday0 task"
  },
  {
    id: 1,
    task:"Thursday1 task"
  },
  {
    id: 2,
    task:"Thursday2 task"
  },
  {
    id: 3,
    task:"Thursday3 task"
  }
];

const friTasks = [
  {
    id: 0,
    task:"Friday0 task"
  },
  {
    id: 1,
    task:"Friday1 task"
  },
  {
    id: 2,
    task:"Friday2 task"
  },
  {
    id: 3,
    task:"Friday3 task"
  }
];

class TaskManagerApi {
  static getMondayTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(Object.assign([], monTasks));
      }, delay);
    });
  }

  static getTuesdayTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(Object.assign([], tueTasks));
      }, delay);
    });
  }

  static getWednesdayTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(Object.assign([], wedTasks));
      }, delay);
    });
  }

  static getThursdayTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(Object.assign([], thuTasks));
      }, delay);
    });
  }

  static getFridayTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(Object.assign([], friTasks));
      }, delay);
    });
  }

  static addTask(day, taskin) {
    let currentArr = [];
    switch (day) {
      case "Monday":
        currentArr = Object.assign([],monTasks);
        break;
      case "Tuesday":
        currentArr = tueTasks;
        break;
      case "Wednesday":
        currentArr = wedTasks;
        break;
      case "Thursday":
        currentArr = thuTasks;
        break;
      case "Friday":
        currentArr = friTasks;
        break;
    }
    let taskObj = {
      id: currentArr.length,
      task: taskin
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          currentArr.push(taskObj);
          resolve(taskObj);
      }, delay);
    });
  }


  static deleteTask(day, taskId) {
    let currentArr = [];
    switch (day) {
      case "Monday":
        currentArr = Object.assign([], monTasks);
        break;
      case "Tuesday":
        currentArr = tueTasks;
        break;
      case "Wednesday":
        currentArr = wedTasks;
        break;
      case "Thursday":
        currentArr = thuTasks;
        break;
      case "Friday":
        currentArr = friTasks;
        break;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTaskToDelete = currentArr.findIndex(task=> {
          return task.id == taskId;
        });
        currentArr.splice(indexOfTaskToDelete, 1);
        resolve(taskId);
      }, delay);
    });
  }
}

export default TaskManagerApi;