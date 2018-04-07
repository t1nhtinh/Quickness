import React from 'react';
import WeekGoal from '../common/WeekGoal';
import TabNav from '../common/Tab_Nav';
import GenerateTaskList from '../common/TrainerClientTasks/GenerateTaskList';
import '../../styles/ClientPage.css';
import LiveChat from '../common/LiveChat/LiveChat';
import ClientInfo from '../common/ClientInfo';
import Header from '../common/Header';

class TrainerPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fromChat: "trainer",
      toChat: "client"
    }
    this.talkto = this.talkto.bind(this);
  }
  talkto(event) {
    if (event.target.alt == "doctor") {
      this.setState({
        fromChat:"trainer",
        toChat: event.target.alt
      });
    }
    else if(event.target.alt == "client") {
      this.setState({
        fromChat:"trainer",
        toChat: "client" 
      });
  }
}
  render() {
    return (
      <div className="main_page">
        <Header
          loading={this.props.loading}
        />
        <div className="left_categories">
          <TabNav TabName={"Client Info"}/>
        
          <div className="card_cp">
          
          <ClientInfo />
          <div className="card_cp">
          <WeekGoal isClient={false}/>
          </div>
          </div>
        </div>
        <div className="middle_categories">
          
          <TabNav TabName={"Task List"}/>
          <div className="card_cp">
          <div className="calendar">
          <GenerateTaskList who={"trainer"}/>
          </div>
          </div>
        </div>
        <div className="right_categories">
        <div id="info_content" className="calendar">
            {/* <input type="text" id="client_search" onkeyup="searchTable()" placeholder="Search for names.."/> */}
              <table id="client_list" className="given_calendar">
                <tr>
                  <th> Client List </th>
                </tr>
                <tr>
                  <td onclick="changeCurrentClient('Guy Fieri')"> Guy Fieri </td>
                </tr>
                <tr>
                  <td onclick="changeCurrentClient('Peter Griffin')"> Peter Griffin </td>
                </tr>
                <tr>
                  <td onclick="changeCurrentClient('Brian')"> Brian </td>
                </tr>
              </table>
            </div>
            <div className="card_cp">
              <LiveChat to={this.state.toChat} from={this.state.fromChat} />
              
              <div className="contacts">
                <div className="contact_photos">
                <img onClick={this.talkto} src="https://78.media.tumblr.com/avatar_b5af1279b166_128.pnj" alt="client" />
                <img onClick={this.talkto} src="https://a.wattpad.com/useravatar/-Rick-SanchezC137-.128.143650.jpg" alt="doctor" />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default TrainerPage;
