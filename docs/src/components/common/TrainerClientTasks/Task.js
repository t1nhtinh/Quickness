import React, {PropTypes} from 'react';

const Task = ({ day,deleteTask,task }) => {
    return (
        <tr>
            <td className="input_values" data-txt={task.id} title={day} onClick={deleteTask}> {task.task} </td>
        </tr>
    );
};

Task.propTypes = {
    day: PropTypes.string.isRequired,
    deleteTask: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired
};
export default Task;

