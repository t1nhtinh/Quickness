import React, {PropTypes} from 'react';
const LiveChatInput = ({ enteredText,send }) => {
    return (
        <form>
            <input id="chat_input" type="text" onChange={enteredText} placeholder="Enter message" />
            <input type="button" onClick={send} name="send_but" value="Send" />
        </form>
    );
};

LiveChatInput.propTypes = {
  enteredText: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired
};
export default LiveChatInput;