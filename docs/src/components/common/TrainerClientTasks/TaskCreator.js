import React, { PropTypes } from 'react';
const TaskCreator = ({ day,enteredText, create }) => {
    return (
        <tr>
            <td>
                <input id="mon_input" type="text" onChange={enteredText} placeholder="Enter task" />
                <input type="button" onClick={create} name={day} value="Create" />
            </td>
        </tr>
    );
};

TaskCreator.propTypes = {
  day:PropTypes.string.isRequired,
  enteredText: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired
};

export default TaskCreator;