import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import LiveChatInput from './LiveChat/LiveChatInput';

function setup() {
  const props = {
    enteredText:() =>{},
    send: () => {}
  };

  return shallow(<LiveChatInput {...props} />);
}

describe('LiveChatInput via Enzyme', () => {
  it('renders form ', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
  });

  it('Renders 2 inputs and check key information', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('input').last().props().onChange).toBe(wrapper.props.enteredText);
    expect(wrapper.find('input').last().props().value).toBe("Send");
  });

});
