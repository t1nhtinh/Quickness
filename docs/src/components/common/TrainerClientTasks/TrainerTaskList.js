import React, {PropTypes} from 'react';
import Task from "./Task";
import TaskCreator from "./TaskCreator";
import * as TaskManagerActions from'../../../actions/TaskManagerActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class TrainerTaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskMessage:""
        }
        this.enteredMessage = this.enteredMessage.bind(this);
        this.createTask= this.createTask.bind(this);
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
    createTask(event) {
        switch (event.target.name) {
            case "Monday":
                this.props.actions.addMondayTask(this.state.taskMessage);
                break;
            case "Tuesday":
                this.props.actions.addTuesdayTask(this.state.taskMessage);
                break;
            case "Wednesday":
                this.props.actions.addWednesdayTask(this.state.taskMessage);
                break;
            case "Thursday":
                this.props.actions.addThursdayTask(this.state.taskMessage);
                break;
            case "Friday":
                this.props.actions.addFridayTask(this.state.taskMessage);
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
                    <TaskCreator enteredText={this.enteredMessage}
                     create={this.createTask} day={"Monday"}/>
                <tr>
                    <th> Tuesday </th>
                </tr>
                    {tueTasks.map((taskObj, index) =>
                        <Task key={index} task={taskObj} deleteTask={this.deleteTask} day={"Tuesday"} />
                    )}
                    <TaskCreator enteredText={this.enteredMessage}
                     create={this.createTask} day={"Tuesday"}/>
                <tr>
                    <th> Wednesday</th>
                </tr>
                    {wedTasks.map((taskObj, index) =>
                        <Task key={index} task={taskObj} deleteTask={this.deleteTask} day={"Wednesday"} />
                    )}
                    <TaskCreator enteredText={this.enteredMessage}
                     create={this.createTask} day={"Wednesday"}/>
                <tr>
                    <th> Thursday </th>
                </tr>
                    {thuTasks.map((taskObj, index) =>
                        <Task key={index} task={taskObj} deleteTask={this.deleteTask} day={"Thursday"} />
                    )}
                    <TaskCreator enteredText={this.enteredMessage}
                     create={this.createTask} day={"Thursday"}/>
                <tr>
                    <th> Friday </th>
                </tr>
                    {friTasks.map((taskObj, index) =>
                        <Task key={index} task={taskObj} deleteTask={this.deleteTask} day={"Friday"} />
                    )}
                    <TaskCreator enteredText={this.enteredMessage}
                     create={this.createTask} day={"Friday"}/>
            </table>
        );
    }
}

TrainerTaskList.PropTypes = {
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
export default connect(mapStateToProps,mapDispatchToProps)(TrainerTaskList);