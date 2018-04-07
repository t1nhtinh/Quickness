import React, {PropTypes} from 'react';

const ChatMessage = ({chatMessage}) => {
    let compundMessage = chatMessage.name + ": " + chatMessage.message;
    return (
        <tr>
            <td>{compundMessage}</td>
        </tr>
    );
};
ChatMessage.propTypes = {
    chatMessage:PropTypes.object.isRequired
};
export default ChatMessage;