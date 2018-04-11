import React from 'react';
import GuestList from './GuestList';
import '../css/client.css';
import {Link} from 'react-router-dom';
class ClientPage extends React.Component { 
     constructor(props,context) {
        super(props,context);
        this.state = {
          guests: {},
          empty: true
        }

        this.addGuest = this.addGuest.bind(this);
        this.getName = this.getName.bind(this);
        this.getNumber = this.getNumber.bind(this);
        this.getEmployee = this.getEmployee.bind(this);
    }

  addGuest(){
    let newGuests = this.state.guests;
    let empty = this.state.empty; 
    //update JSON for user
    if(this.state.name){
       //add comment to user notes with most recent notes at the top
       newGuests = [ ...this.state.guests, {name: this.state.name, number: this.state.number, employee: this.state.employee}];
       empty = false; 
    }

    this.setState({
        guests: newGuests,
        name: '', 
        number: '',
        employee: '',
        empty: empty
    });
  }

  getName(event){
    this.setState({
        name: event.target.value
    });
  }

  getNumber(event){
    this.setState({
        number: event.target.value
    });
  }

  getEmployee(event){
    this.setState({
        employee: event.target.value
    });
  }

  // updateName(){

  // }

  // updateNumber(){

  // }

  // updateEmployee(){

  // }


  render() {
    return (
      <div>
        <div className="upperRow">
          <div className="topNav">
            <Link to="/">Home</Link>
            <a href="#">Settings</a>
    
            <div>
            </div>
          </div>
        </div>
        <div className="middleRow">
            <div className="newRow">
            <table className="newRow">
            <tr>
              <th><input type="text" placeHolder="type name..." onChange={this.getName} value={this.state.name}/></th>
              <th><input type="tel" placeHolder="type number..." onChange={this.getNumber} value={this.state.number}/></th>
              <th><input type="text" placeHolder="type name..." onChange={this.getEmployee} value={this.state.employee}/></th>
              <th><div className="addBtn" onClick={this.addGuest}>+</div></th>
              </tr>
              </table>
            </div>
        </div>
        <div className="bottomRow">
          <GuestList guests={this.state.guests} isEmpty={this.state.empty}/>
        </div>
      </div>
    );
  }
}


export default ClientPage;
