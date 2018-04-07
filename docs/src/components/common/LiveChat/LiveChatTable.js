import React, {PropTypes} from 'react';
import ChatMessage from './ChatMessage';

const LiveChatTable = ({chat}) => {
  return (
      <table id="live_table" className="component_table">
          {chat.map((chatElement,index) =>
              <ChatMessage key={index} chatMessage={chatElement} />
          )}
      </table>
  );
};

LiveChatTable.propTypes = {
  chat: PropTypes.array.isRequired
};

export default LiveChatTable;