import delay from './delay';

const weekgoal ={
    goal: "One Punch Man Workout Complete"
};

class WeekGoalApi {
  static getGoal() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(Object.assign({}, weekgoal));
      }, delay);
    });
  }

  static changeGoal(goalMessage) {
      let newGoal = {
          goal :goalMessage
      };
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          this.weekgoal = Object.assign({}, newGoal);
          resolve(newGoal);
      }, delay);
    });
  }
}
export default WeekGoalApi;