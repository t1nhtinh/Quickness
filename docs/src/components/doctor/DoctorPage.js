import React, {PropTypes} from 'react';
import '../../styles/doctor.css';
import DoctorNotesTable from './DoctorNotesTable';
import DoctorPolaroids from './DoctorPolaroids';
//import Users from './Users';
import DoctorSummary from './DoctorSummary';
import {Link} from 'react-router';
//import Upcoming from './Upcoming';
import DoctorCalender from './DoctorCalender';

import {connect} from 'react-redux'; //renders component and injects props into the component without messing with layout
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import toastr from 'toastr';
import LiveChat from '../common/LiveChat/LiveChat';

class DoctorPage extends React.Component {
  constructor(props, context){
      super(props, context);

      this.state = {
          comment: '',
          input: '',
          date: '',
          userID: '', 
          display: false, 
          from: 'doctor', 
          to: 'client'
    };

    // Using declarations in ES6 will not automatically bind the method to this, so you need to bind it 
    this.addComment = this.addComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDate = this.getDate.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.loadInfo = this.loadInfo.bind(this);
    this.talkto = this.talkto.bind(this);
   // console.log(this.props);
    //console.log(this.state);
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

  addComment(){
      //console.log('The text input: ' + this.state.input);
      //console.log('The Date: ' + this.state.date);
      //console.log(this.state);
      //console.log(this.props.users);
      let newUsers = this.props.users;
      var user = this.state.user;
      let date = this.state.date; 
      //update JSON for user
      if(this.state.input){
        // formatDate(date); //format data
        if(date){
            var dateArray = date.split('-');
            var month = dateArray[1];
            var day = dateArray[2];
            var year = dateArray[0][2] + dateArray[0][3] ;
            date = month + "/" + day + "/" + year;
        }
         //add comment to user notes with most recent notes at the top
         let newComment = {date: date, comment: this.state.input};       
        // newUsers[this.state.userID].notes = newComment;  //update users notes
       // let newComment = [{date: date, comment: this.state.input}, ...this.state.users[this.state.userID].notes];
        this.props.actions.addComment(user, newComment).then(() => this.redirect())
        .catch(error => {
          toastr.error(error);
        });      
      }
    }

  redirect() {
    this.setState({
      //  users: newUsers,
        user: this.props.users[this.state.userID], 
        input : ''
    });
    toastr.success('Comment added');
  }
  
  //For some reason I cant call this in addComment()
  formatDate(date){
      if(date){
        var dateArray = date.split('-');
        var month = dateArray[1];
        var day = dateArray[2];
        var year = dateArray[0][2] + dateArray[0][3] ;
        date = month + "/" + day + "/" + year;
      }
      this.setState({
        date: date
      });
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

  talkto(event){

    this.setState({
      to:event.target.alt
    });

    console.log("to " + this.state.to);
    console.log("from " + this.state.from);
  }

  render() {
    const {users} = this.props; 

    // console.log(this.state.to);
    return (

      <div>
          <ul className="sidenav">
                <li>
                    <h2>Tailored Health Services</h2>
                    <div>
                        <img src={require("../../images/stethescope.jpg")} alt="stethoscope" />
                    </div>
                </li>
                <li className="active"><Link to="doctor">Home</Link></li>
                <li><Link to="doctor">Schedule</Link></li>
                <li><Link to="doctor">Accout Settings</Link></li>
                <li><Link to="landing">Log Out</Link></li>

         </ul>
        <div className="row_doctor">
            <div className="left_column_doc">
                <div className="card">
                    <div className="topnav">
                        <a className="btn" onClick={this.addComment}>Patients</a> 
                        <a className="btn" onClick={this.addComment}>Trainers</a> 
                        <a className="btn" onClick={this.addComment}>Therapists</a> 
                        <a className="btn active" onClick={this.addComment}>New Clients</a>
                                             
                        <div className="search-container">
                            <form action="#">
                                {/* <input type="text" placeholder="Search.." name="search"/> */}
                            
                            </form>
                           
                        </div>
                    </div>
                        <DoctorPolaroids users ={users} onClick={this.loadInfo} />
                        
                        <div className="search-container">
                            <form action="#">
                                {/* <input type="text" placeholder="Search.." name="search"/> */}
                            
                            </form>
                            <a className="btn active" onClick={this.addComment}>+</a>
                        </div>
                </div>

               {/* <Upcoming />  */}
               <DoctorCalender />
             </div>
             </div>

            {this.state.display ?
            <div className="right_column_doc">
                <div id="profile_info">
                    <DoctorSummary stats={this.state.user} src={this.state.user.img}/>
                   
                </div>
    
                <DoctorNotesTable notes={this.state.user.notes} onClick={this.addComment} 
                onChange={this.handleChange} input={this.state.input} getDate={this.getDate} display={true}/>
        
                
                <div className="card">
                <LiveChat to={this.state.to} from={this.state.from}/>
                <div className="contacts">
                    <div className="contact_photos">
                    <img onClick={this.talkto} src="https://78.media.tumblr.com/avatar_c6de95fae8db_128.pnj" alt="trainer" />
                    <img onClick={this.talkto} src="https://a.wattpad.com/useravatar/-Rick-SanchezC137-.128.143650.jpg" alt="client" />
                    </div>
                </div>

            </div>

            </div> : null}
        </div>
    );
  }
}

    DoctorPage.propTypes = {
        //courses: PropTypes.array.isRequired,
        //actions: PropTypes.object.isRequired
    };
    
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
  
export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage);


