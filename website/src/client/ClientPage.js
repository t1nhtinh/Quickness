import React from 'react';
import GuestList from './GuestList';
import '../css/client.css';
import {Link} from 'react-router-dom';
import WaitTime from './WaitTime'
//TODO: implement breaks when provider is idle
let employees = [
  {
    name: "Tinh Dang", 
    id: 1, 
    status: "open" 
  }, 
  {
    name: "De Tran", 
    id: 2,
    status: "open" 
  }, 
  {
    name: "Quickness", 
    id: 3,
    status: "open" 
  }
];


class ClientPage extends React.Component { 
     constructor(props,context) {
        super(props,context);
        this.state = {
          guests: [], 
          providers: employees, //set dummy employees TODO: sorted by alphabet
          empty: true,
          providerType: "Employees",
          numInLine:0,
          numOfGuests: 0,
          numOfProviders: 0, 
          openProviders: 0, //array of integers
          idleProviders:[], //array of integers
          inProgressProviders:[], //array of integers
          processTime: 0, 
          waitTime: 0, 
          waitTimes: [],
          minStartTime: 0,
          estimatedFinishTimes: [], 
          settingDisplay: "none"
        }

        this.addGuest = this.addGuest.bind(this);
        this.getName = this.getName.bind(this);
        this.getNumber = this.getNumber.bind(this);

        this.addProvider = this.addProvider.bind(this);
        this.getProviderName = this.getProviderName.bind(this);
        this.getProviderId = this.getProviderId.bind(this);
        this.handleNumOfProviders = this.handleNumOfProviders.bind(this);
        this.handleProcessTime = this.handleProcessTime.bind(this);

        this.updateWaitTime = this.updateWaitTime.bind(this);
        this.updateWaitedTime = this.updateWaitedTime.bind(this);
        this.getDate = this.getDate.bind(this); //helper method
        this.updateNumberOfOpenProviders = this.updateNumberOfOpenProviders.bind(this);
        this.calcFinishTime = this.calcFinishTime.bind(this);
        this.calcWaitTime = this.calcWaitTime.bind(this);
        
        this.moveGuest = this.moveGuest.bind(this);
        this.setStatus = this.setStatus.bind(this); 
        this.showContent = this.showContent.bind(this);
        this.updateNumInLine = this.updateNumInLine.bind(this);
    }

  addGuest(){
   //this.updateNumberOfOpenProviders(); 
    let newGuests = this.state.guests;
    let empty = this.state.empty; 
    let numOfGuests = this.state.numOfGuests; 
    let numInLine = this.state.numInLine;
    let waitTime = this.state.waitTime;
    let startTime = new Date();
    //let finishTime = startTime + 1000; 
    //startTime = finishTime; 
    //check if    
    if(this.state.name){
      newGuests = [ ...newGuests, {name: this.state.name, number: this.state.number, index: numInLine, status: 'ready', quoted: waitTime, startTime: startTime, waitedTime: 0 } ];
      console.log(newGuests);
       
      empty = false; 
      numOfGuests++; 
      numInLine++; 
    }
    this.setState({
        guests: newGuests,
        numOfGuests: numOfGuests,
        name: '', 
        number: '', 
        empty: empty,
        numInLine: numInLine,      
    });
  }
  
  //Method to move position of guest 1 up or down 
  moveGuest(dir, index){
    let guests = this.state.guests; 
    if(guests.length < 1) return; 
    
    let tempGuest = guests[index];
  
    if(dir){//move up if true
      if(index < 1){ return; }
      let guest = guests[index - 1]; 
      guests[index] = guest; 
      guests[index - 1] = tempGuest; 

      guests[index].index = index; 
      guests[index - 1].index = index - 1; 
    }
    else{ //move down
      if(index >= guests.length - 1){return; }
      let guest = guests[index + 1]; 
      guests[index] = guest; 
      guests[index + 1] = tempGuest; 

      guests[index].index = index; 
      guests[index + 1].index = index + 1; 
    }
    this.setState({
      guests: guests 
    });
  }

  //Method to set the status of guests 
  setStatus(num, index){
    let status = "";
    let guests = this.state.guests;  
    if(num == 0){
      status = "ready";
    } else if (num == 1){
      status = "inProgress";
    }else {
      status = "done";
    }
    guests[index].status = status; 
    this.setState({
      guests: guests
    });
  }
  
  //Method to get name of guests at any instance
  getName(event){
    this.setState({
        name: event.target.value
    });
  }
  
  //Method to get the phone number of guest onChange
  getNumber(event){
    this.setState({
        number: event.target.value
    });
  }
  
  //Method to add provider to list of providers
  addProvider(){
     let providers = this.state.providers;    
     
     //Check if name has been filled out
     if(this.state.providerName){
       providers = [...providers, {name: this.state.providerName, providerId: this.state.providerId, status: "open"}];
     }
     
     this.setState({
       providers: providers,
       providerName: "",
       providerId: ""
     });

     console.log(this.state.providers);
   }

  //Method to get provider name onChange
  getProviderName(event){
    this.setState({
        providerName: event.target.value
    });

    this.updateNumberOfOpenProviders();
  }

  //Method to get provider ID onChange
  getProviderId(event){
    this.setState({
        providerId: event.target.value
    });
  }
  
  //method to check the number of open providers
  handleNumOfProviders(event){
    this.setState({ 
      numOfProviders: event.target.value 
    });  
   console.log(this.state.numOfProviders);
   
   this.updateNumberOfOpenProviders(); //TODO: REMOVE after persisting data
  }

  //Function to get the number of providers that are open
  updateNumberOfOpenProviders(){
    let numOfProv = this.state.numOfProviders; 
    let index = 0; 
    let numOfOpenProv = 0;

    //iterate through all the providers
    if(numOfProv){
      for(index = 0; index <= numOfProv; index++){
        if(this.state.providers[index].status === "open"){
          numOfOpenProv++; 
        }
        console.log(this.state.providers[index]); 
      }
    }
    this.setState({ 
      openProviders: numOfOpenProv
    });
  }
  
  //update state whenever the processTime is changed
  handleProcessTime(event){
    this.setState({ 
      processTime: event.target.value
    });  

    console.log(this.state.processTime, "the process time")
  }

  updateNumInLine(){
    //iterate through guest in line
    let guests = this.state.guests; 
    let i = 0; 
    let numInLine = 0; 
    //count how many are in the ready state
    for(i = 0; i < guests.length; i++){
      if(guests[i].status == "ready"){
        numInLine++; 
      }
    }
    console.log("num in line is: ", numInLine);
    //set state
    this.setState({ 
      numInLine: numInLine
    });  
  }

  //Function to calculate the wait time depending on number of guests in line and number of open providers
  updateWaitTime(){  
    console.log(this.state.guests); 
    let waitTime = 0; //Initialize waitTime to zero
    let providers = this.state.providers;
    let processTime = this.state.processTime;
    //update the number of open Providers
    //this.updateNumberOfOpenProviders(); 
    let numOfOpenProv = this.state.openProviders; 
    let numInLine = this.state.numInLine;
    let i = 0; 
    console.log(numOfOpenProv, "num of open Providers");
    console.log(numInLine, "num inLine");
    console.log(processTime, "The process Time");
    //Check whether the number of guests inLine is greater than the number of open providers
    if(numInLine >= numOfOpenProv){    
      //iterate through the providers who are InProgress and calculate estimate finish time
      //this.calcFinishTime(providers, processTime); 
      //let estimatedFinishTimes = this.state.estimatedFinishTimes; //estimated times are stored in descending order  
      let estimatedFinishTimes = this.calcFinishTime(providers, processTime);
      console.log(estimatedFinishTimes, "estimate finish times"); 
      //calculateWaitTimes from estimated finish times
      //this.calcWaitTime(estimatedFinishTimes);
      //let waitTimes = this.state.waitTimes;
      var waitTimes = this.calcWaitTime(estimatedFinishTimes);
      //iterate up to the number of guest inLine
      for(i = numOfOpenProv; i <= numInLine; i++){
        waitTime = waitTimes.pop(); //get the earliest wait time and increment by processTime
        let newWaitTime = waitTime*1 + processTime*1; //we multiply by 1 so we get an int
        waitTimes.unshift(newWaitTime); //insert the lastest waitTime
      }
    }
    if(waitTime <= 5){
      waitTime = 5; 
    }
    this.setState({ 
      waitTime: waitTime
    });  
  }

  //updates the waited time so far based on the current time
  updateWaitedTime(index){
    let guests = this.state.guests;
    let currTime = new Date();
    var waitedTime; 

    if(guests[index].status == "ready"){
      let startTime = guests[index].startTime; 
      waitedTime = new Date(currTime - startTime); 
      guests[index].waitedTime = waitedTime.getMinutes(); 

      this.setState({ 
        guests: guests
      });  

      waitedTime = waitedTime.getMinutes();
      console.log("waited time is ", waitedTime);
    }
    
    
  }
  
  //Note: current time is always greater than the starting time in this app
  getDate(){
    let date = new Date(); 
     //get the time
    date = date.toString(); 
    date = new Date(date); 
    console.log(date);

    let testDate = new Date(2018, 3, 27, 18, 1); 
    console.log(testDate);

    testDate = new Date(testDate.getTime() + 60000*15); 

    console.log(testDate);

    let diff = date - testDate; 

    console.log(diff);

    let time = new Date(diff); 

    time = time.getMinutes(); 

    console.log(time); 
  }
   
  //Calculate estimated finish time for each provider in progress and update the array 
  //input: 1) an array of providers
  //       2) processTime: the estimate time to process guests
  //Output: we will output an array with the estimated finish times 
  calcFinishTime(providers, processTime){
   //let inProgProv = this.state.inProgressProviders; //
    let estimatedFinishTimeList = []; 
    let i = 0; 
    let currentTime = new Date();
    //iterate through all providers
    //  1) if inProgress: get their startTime and increment by processTime
    //  2) if open: set startTime to currentTime and increment by processTime 
    for(i = 0; i < providers.length; i++){    
      let provider = providers[i];    
      if(provider.status === "inProgress"){
        let estimatedFinishTime = new Date(provider.startTime.getTime() + 60000*processTime);
        estimatedFinishTimeList.push(estimatedFinishTime);
      }
      else if(provider.status === "open"){
        let estimatedFinishTime = new Date(currentTime.getTime() + 60000*processTime);
        estimatedFinishTimeList.push(estimatedFinishTime);
      }
    }
    //sort the estimatedFinishTimes in descending order
    //estimatedFinishTimeList.sort(function (a,b){return a.getTime() - a.getTime()}); 
    return estimatedFinishTimeList;
    // this.setState({ 
    //   estimatedFinishTimes: estimatedFinishTimeList,
    // });
  }

  //TODO: Need to figure out what happens if currentTime is greater that estimated finish time
  //      If this happens we can set the wait time to be font color red since we have now went over the quoted time
  //get the estimated finishTime and subtract it by the currentTime  
  calcWaitTime(estimatedFinishTime){
    let i = 0; 
    let currentTime = new Date(); 
    var waitTimeList = [];  
    console.log(waitTimeList);
    //iterate through the list of estimated Finish Time
    for(i = 0; i < estimatedFinishTime.length; i++){  
      //get the earliest finishtime and subtract by currrent time     
      let finishTime = new Date(estimatedFinishTime[i]); 
      let diff = finishTime - currentTime;
      diff = new Date(diff);
      let waitTime = diff.getMinutes(); 
      waitTimeList.push(waitTime);
    }
    console.log(waitTimeList);
    //sort the  waitTimes in descending order
    waitTimeList.sort(function(a, b){return b - a}); 
    
    return waitTimeList; 
    // this.setState({ 
    //     waitTimes: waitTimes
    //   });  
  }

  //set the settings content to display or hidden 
  showContent(){
    let show = this.state.settingDisplay;
   
    if(show == "none"){
      show = "block";
    } 
    else {
      show = "none";
    }
    this.setState({
      settingDisplay: show
    });
  }

  //Initialize the providers 
  //sort the providers by name and store
  //create keys and store them in openProviderList 
  //This should call from an API
  initProviders(){

  }

  render() {
    //initialize providers

    //console.log(this.state.providerType, "whattt");

    //sort providers by name

    return (
      <div>
        <div className="upperRow">
          <div className="topNav">
            <Link to="/">Home</Link>
            
            <div className="dropdown">  
              <div className="dropbtn" onClick={this.showContent}>Settings </div> 
              
              <div className="dropdown-content" style={{display: this.state.settingDisplay}}>
                <div className="setting-column"> # of {this.state.providerType}: {this.state.openProviders}
                  <input type="number" value={this.state.numOfProviders} onChange={this.handleNumOfProviders}/>

                  <br></br>
                  <input type="text" placeHolder="type name " onChange={this.getProviderName} value={this.state.providerName} />
                  <input type="text" placeHolder="type employee id " onChange={this.getProviderId} value={this.state.providerId}/>
                  <button className="addBtn" onClick={this.addProvider}>+</button>

                </div>                
                
                <div className="setting-column"> Process Time: 
                  <input type="number" value={this.state.processTime} onChange={this.handleProcessTime}/>
                </div>
              </div>
            </div>
            
            <div className="wait-container">In-Line: {this.state.numInLine}</div>
            {/* <div className="wait-container" onClick={this.updateWaitTime}> Wait Time: {this.state.waitTime} </div> */}
            <WaitTime update={this.updateWaitTime} waitTime={this.state.waitTime}/>
          </div>
        </div>
        <div className="middleRow">
          <div className="newRow">
            <table className="newRow">
              <tr>
                <th><input type="text" placeHolder="type name..." onChange={this.getName} value={this.state.name}/></th>
                <th><input type="tel" placeHolder="type number..." onChange={this.getNumber} value={this.state.number}/></th>
                <th><div className="addBtn" onClick={this.addGuest}>+</div></th>
              </tr>
            </table>
          </div>
        </div>
        <div className="bottomRow">
          <GuestList guests={this.state.guests} isEmpty={this.state.empty} providers={this.state.providers} onMove={this.moveGuest} setStatus={this.setStatus} updateNumInLine={this.updateNumInLine} updateWaitedTime={this.updateWaitedTime}/>
        </div>
      </div>
    );
  }
}


export default ClientPage;
