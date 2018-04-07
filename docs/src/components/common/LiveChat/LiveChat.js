import React, {PropTypes} from 'react';
import ChatMessage from './ChatMessage';
import LiveChatTable from './LiveChatTable';
import * as LiveChatActions from'../../../actions/LiveChatActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LiveChatInput from './LiveChatInput';

class LiveChat extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            message:""
        }
        this.enteredMessage = this.enteredMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    enteredMessage(event) {
        this.setState({
            message:event.target.value
        });
    }
    sendMessage(event) {
        event.preventDefault();
        if (this.props.from == "client") {
            if (this.props.to == "trainer") {
                this.props.actions.sendClient2TrainerChatMessage(this.state.message);
            }
            else {
                this.props.actions.sendClient2DoctorChatMessage(this.state.message);
            }
        }
        else if (this.props.from == "trainer") {
            if (this.props.to == "doctor") {
                this.props.actions.sendTrainer2DoctorChatMessage(this.state.message);
            }
            else {
                this.props.actions.sendTrainer2ClientChatMessage(this.state.message);
            }
        }
        else if(this.props.from == "doctor"){
            if (this.props.to == "trainer") {
                this.props.actions.sendDoctor2TrainerChatMessage(this.state.message);
            }
            else {
                this.props.actions.sendDoctor2ClientChatMessage(this.state.message);
            }
        }
    }
    render() {
        let liveChat = [];
        if (this.props.from == "client"){
            if(this.props.to == "trainer"){
                liveChat = this.props.client2Trainer;
            }
            else {
                liveChat = this.props.client2Doctor;
            }
        }
        else if(this.props.from == "trainer") {
            if (this.props.to == "doctor") {
                liveChat = this.props.trainer2Doctor;
            }
            else {
                liveChat = this.props.client2Trainer;
            }
        }
        else if(this.props.from == "doctor"){
            if (this.props.to == "trainer") {
                liveChat = this.props.trainer2Doctor;
            }
            else {
                liveChat = this.props.client2Doctor;
            }
        }
        return (
            <div className="live_chat">
                <div className="signage">
                    <h1>Live Chat</h1>
                </div>
                <div className="table-wrapper">
                <LiveChatTable chat={liveChat}/>
                </div>
                <div className="live_text_enter">
                    <LiveChatInput enteredText={this.enteredMessage} send={this.sendMessage}/>
                </div>
            </div>
        );
    }
}
LiveChat.PropTypes = {
    from:PropTypes.string.isRequired,
    to:PropTypes.string.isRequired,
    client2Trainer:PropTypes.array.isRequired,
    client2Doctor:PropTypes.array.isRequired,
    trainer2Doctor:PropTypes.array.isRequired,
    actions:PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
      client2Trainer: state.client2Trainer,
      client2Doctor: state.client2Doctor,
      trainer2Doctor: state.trainer2Doctor
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LiveChatActions, dispatch)
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(LiveChat);
