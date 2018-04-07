import React, {PropTypes} from 'react';
import Task from "./Task";
import TaskCreator from "./TaskCreator";
import * as TaskManagerActions from'../../../actions/TaskManagerActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ClientTaskList extends React.Component {
    constructor(props) {
        super(props);
        this.enteredMessage = this.enteredMessage.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }
    enteredMessage(event) {
        this.setState({
            taskMessage:event.target.value
        });
    }

    deleteTask(event){
        switch (event.target.title) {
            case "Monday":
                this.props.actions.deleteMondayTask(event.target.dataset.txt);
                break;
            case "Tuesday":
                this.props.actions.deleteTuesdayTask(event.target.dataset.txt);
                break;
            case "Wednesday":
                this.props.actions.deleteWednesdayTask(event.target.dataset.txt);
                break;
            case "Thursday":
                this.props.actions.deleteThursdayTask(event.target.dataset.txt);
                break;
            case "Friday":
                this.props.actions.deleteFridayTask(event.target.dataset.txt);
                break;
        }
    }
    render() {
        const {monTasks} = this.props;
        const {tueTasks} = this.props;
        const {wedTasks} = this.props;
        const {thuTasks} = this.props;
        const {friTasks} = this.props;
        return (
            <table id="main_calendar" className="given_calendar">
                <tr>
                    <th>Monday</th>
                </tr>
                    {monTasks.map((taskObj, index) =>
                        <Task key={index} task={taskObj} deleteTask={this.deleteTask} day={"Monday"} />
                    )}
                <tr>
                    <th> Tuesday </th>
                </tr>
                    {tueTasks.map((taskObj, index) =>
                        <Task key={index} task={taskObj} deleteTask={this.deleteTask} day={"Tuesday"} />
                    )}
                <tr>
                    <th> Wednesday</th>
                </tr>
                    {wedTasks.map((taskObj, index) =>
                        <Task key={index} task={taskObj} deleteTask={this.deleteTask} day={"Wednesday"} />
                    )}
                <tr>
                    <th> Thursday </th>
                </tr>
                    {thuTasks.map((taskObj, index) =>
                        <Task key={index} task={taskObj} deleteTask={this.deleteTask} day={"Thursday"} />
                    )}
                <tr>
                    <th> Friday </th>
                </tr>
                    {friTasks.map((taskObj, index) =>
                        <Task key={index} task={taskObj} deleteTask={this.deleteTask} day={"Friday"} />
                    )}
            </table>
        );
    }
}

ClientTaskList.PropTypes = {
    monTasks:PropTypes.array.isRequired,
    tueTasks:PropTypes.array.isRequired,
    wedTasks:PropTypes.array.isRequired,
    thuTasks:PropTypes.array.isRequired,
    friTasks:PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
      monTasks: state.monTasks,
      tueTasks: state.tueTasks,
      wedTasks: state.wedTasks,
      thuTasks: state.thuTasks,
      friTasks: state.friTasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskManagerActions, dispatch)
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(ClientTaskList);