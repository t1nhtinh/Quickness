import expect from 'expect';
import trainer2DoctorReducer from './trainer2DoctorReducer';
import * as actions from '../actions/LiveChatActions';

describe('trainer2DoctorReducer', () => {
  it('should add message when passed SEND action', () => {
    // arrange
      const initialState = [
          {
              name: "name",
              message: "trainer 2 doctor"
          }
      ];

    const newMessage= 'hello';

    const action = actions.sendTrainer2DoctorChatMessage(newMessage);

    //act
    const newState = trainer2DoctorReducer(initialState, action);

    //assert
    expect(newState.length).toEqual(1);
  });
});
