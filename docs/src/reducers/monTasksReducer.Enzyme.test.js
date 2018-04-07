import expect from 'expect';
import monTasksReducer from './monTasksReducer';
import * as actions from '../actions/TaskManagerActions';

describe('monTasksReducer ', () => {
  it('should add task when passed CREATE action', () => {
    // arrange
    const initialState = [
      {id: 0},
      {task: "test"}
    ];

    const newTask= {id:0,task: 'C'};

    const action = actions.addMondayTask(newTask);

    //act
    const newState = monTasksReducer(initialState, action);

    //assert
    expect(newState.length).toEqual(2);
  });
});
