import React from 'react';
import Calorie_corner from './calorie_corner';
import WeekGoal from '../common/WeekGoal';
import TabNav from '../common/Tab_Nav';
import GenerateTaskList from '../common/TrainerClientTasks/GenerateTaskList';
import '../../styles/ClientPage.css';
import LiveChat from '../common/LiveChat/LiveChat';
import Header from '../common/Header';
import DoctorNotesTable from '../doctor/DoctorNotesTable';
import {connect} from 'react-redux'; //renders component and injects props into the component without messing with layout
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';

class ClientPage extends React.Component { 
     constructor(props,context) {
        super(props,context);
        this.state = {
           toChat:"trainer",
           fromChat:"client" 
        }
        this.talkto = this.talkto.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getDate = this.getDate.bind(this);
       
        this.loadInfo = this.loadInfo.bind(this);
    }

    talkto(event){
      this.setState({
        toChat:event.target.alt
      });
    }

    loadInfo(index){
      var user = this.props.users[index];
      this.setState({
         user: user,
         userID: index, 
         display: true
      });
      //console.log(this.state);
  }
    getDate(event){
      this.setState({
          date: event.target.value
      });
    }
  
    handleChange(event){
        this.setState({
            input: event.target.value
        });
    }

  render() {
    return (
      <div className="main_page">
        <Header
          loading={this.props.loading}
        />
        <div className="left_categories">
          <Calorie_corner />
          <WeekGoal isClient={true}/>
          
        </div>
        <div className="middle_categories">
          <TabNav TabName={"Task List"}/>
          <div className="calendar">
          <GenerateTaskList who={"client"}/>
          </div>
        </div>
        <div className="right_categories">
          <div id="doctor_comments">
            <div className="signage">
              <h1>Doctor's Comments</h1>
            </div>
            
            <DoctorNotesTable notes={this.props.users[0].notes} onClick={this.addComment} 
                onChange={this.handleChange} input={this.state.input} getDate={this.getDate} display={false}/>
            
            <div className="contact_photos">
              <img src="https://a.wattpad.com/useravatar/-Rick-SanchezC137-.128.143650.jpg" alt="doctor" />
            </div>
            <div className="quote">
              <i> Don't Die!</i>
            </div>
          </div>
          <LiveChat to={this.state.toChat} from={this.state.fromChat}/>
          <div className="contacts">
            <div className="contact_photos">
              <img onClick={this.talkto} src="https://78.media.tumblr.com/avatar_c6de95fae8db_128.pnj" alt="trainer" />
              <img onClick={this.talkto} src="https://a.wattpad.com/useravatar/-Rick-SanchezC137-.128.143650.jpg" alt="doctor" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {  
        
  return {
      users: state.users          
  };
}

function mapDispatchToProps(dispatch) {
return {
  actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
