import TestUtils from 'react-addons-test-utils';
import ClientTaskList from './TrainerClientTasks/ClientTaskList'
import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import Task from './TrainerClientTasks/Task';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../../reducers';
import initialState from '../../reducers/initialState';

const store = createStore(rootReducer, initialState);
describe('ClientTaskList Enzyme', () => {
  it('renders tr and td elements', () => {
    const props = {
      monTasks: [], 
      tueTasks: [],
      wedTasks: [],
      thuTasks: [],
      friTasks: []
    };
    const wrapper = mount(<Provider store={store}><ClientTaskList {...props}/></Provider>);
    //5 things
    expect(wrapper.find('tr').length).toBe(5);
  });
});