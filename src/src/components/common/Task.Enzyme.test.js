import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import Task from './TrainerClientTasks/Task';

function setup() {
  const props = {
    day:"", 
    deleteTask:() =>{},
    task: {
        id:0,
        task:"wow"
    }
  };

  return shallow(<Task {...props} />);
}

describe('Task via Enzyme', () => {
  it('renders row with right class name', () => {
    const wrapper = setup();
    expect(wrapper.find('tr').length).toBe(1);
    expect(wrapper.find('td').props().className).toBe("input_values");
  });

  it('renders Correct task', () => {
    const wrapper = setup();
    expect(wrapper.find('td').props().children[1]).toBe("wow");
  });

});
