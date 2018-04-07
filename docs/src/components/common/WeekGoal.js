import React, {PropTypes} from 'react';
import * as WeekGoalActions from '../../actions/WeekGoalActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class WeekGoal extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.state = {
            value:""
        };
    }
    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.changeWeekGoal(this.state.value);
        this.setState({
            value:""
        });
      }
    
    render() {
        const { isClient } = this.props;
        if (isClient) {
            return (
                <div id="week_goal">
                    <div className="signage">
                        <h1> Client Goals </h1>
                    </div>
                    <label>Create Goal</label><br />
                    <h4 id="week_goal_h2">{this.props.weekGoal.goal}</h4>
                </div>
            );
        }
        else {

            return (
                <div id="week_goal">
                    <div className="signage">
                        <h1> Client Goals </h1>
                    </div>
                    <label>Create Goal</label><br />
                    <h4 id="week_goal_h2">{this.props.weekGoal.goal}</h4>
                    <input id="mon_input" type="text" onChange={this.handleChange} value={this.state.value} placeholder="Enter Goal" />
                    <input type="button" onClick={this.handleSubmit} value="submit" /><br />
                </div>
            );
        }
    }
}

WeekGoal.PropTypes = {
    weekGoal:PropTypes.object.isRequired,
    isClient: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
      weekGoal: state.weekGoal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WeekGoalActions, dispatch)
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(WeekGoal);