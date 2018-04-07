import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TrainerTaskList from './TrainerClientTasks/TrainerTaskList';
import TaskCreator from './TrainerClientTasks/TaskCreator';
import Task from './TrainerClientTasks/Task';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../../reducers';
import initialState from '../../reducers/initialState';

const store = createStore(rootReducer, initialState);
describe('TrainerTaskList Enzyme', () => {
  it('Did not render correct amount of Task Creators', () => {
    const props = {
      monTasks: [], 
      tueTasks: [],
      wedTasks: [],
      thuTasks: [],
      friTasks: []
    };
    const wrapper = mount(<Provider store={store}><TrainerTaskList {...props}/></Provider>);
    //5 task creators for 5 days
    expect(wrapper.find('TaskCreator').length).toBe(5);
  });
});