import React from 'react';
import GuestList from './GuestList';
import '../css/client.css';
import {Link} from 'react-router-dom';

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
          guests: {}, 
          providers: employees, //set dummy employees sorted by alphabet
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
        }

        this.addGuest = this.addGuest.bind(this);
        this.getName = this.getName.bind(this);
        this.getNumber = this.getNumber.bind(this);
        this.getProvider = this.getProvider.bind(this);
        this.handleNumOfProviders = this.handleNumOfProviders.bind(this);
        this.handleProcessTime = this.handleProcessTime.bind(this);
        this.updateWaitTime = this.updateWaitTime.bind(this);
        this.getDate = this.getDate.bind(this); //helper method
        this.updateNumberOfOpenProviders = this.updateNumberOfOpenProviders.bind(this);
        this.calcFinishTime = this.calcFinishTime.bind(this);
        this.calcWaitTime = this.calcWaitTime.bind(this);
    }

  addGuest(){
   //this.updateNumberOfOpenProviders(); 

    let newGuests = this.state.guests;
    let empty = this.state.empty; 
    let numOfGuests = this.state.numOfGuests; 
    let numInLine = this.state.numInLine;
    //update JSON for user   
    if(this.state.name){
       //add comment to user notes with most recent notes at the top
       newGuests = [ ...this.state.guests, {name: this.state.name, number: this.state.number}];
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

  getProvider(event){
    this.setState({
        provider: event.target.value
    });
  }

  
  handleNumOfProviders(event){
    

    this.setState({ 
      numOfProviders: event.target.value 
    });  
   console.log(this.state.numOfProviders);
   this.updateNumberOfOpenProviders();
  }
  
  //update state whenever the processTime is changed
  handleProcessTime(event){
    this.setState({ 
      processTime: event.target.value
    });  

    console.log(this.state.processTime, "the process time")
  }

  //Function to calculate the wait time depending on number of guests in line and number of open providers
  updateWaitTime(){  
    
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
    if(numInLine > numOfOpenProv){    
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
      for(i = numOfOpenProv; i < numInLine; i++){
        waitTime = waitTimes.pop(); //get the earliest wait time and increment by processTime
        waitTime = waitTime*1 + processTime*1; //we multiply by 1 so we get an int
        waitTimes.unshift(waitTime); //insert the lastest waitTime
      }
    }
    this.setState({ 
      waitTime: waitTime
    });  
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

  //Initialize the providers 
  //sort the providers by name and store
  //create keys and store them in openProviderList 
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
            <a href="#">Settings </a>
            <span> # of {this.state.providerType}: 
              <input type="number" value={this.state.numOfProviders} onChange={this.handleNumOfProviders}/>|----</span>
           
            <span className="keyFeature">| In-Line: {this.state.numInLine} |----</span>
            <span className="keyFeature"> Process Time: 
              <input type="number" value={this.state.processTime} onChange={this.handleProcessTime}/> min |-----</span>
            
            <span className="keyFeature" onClick={this.updateWaitTime}> Wait Time: {this.state.waitTime} ---|</span>
    
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
                <th><div className="addBtn" onClick={this.addGuest}>+</div></th>
              </tr>
            </table>
          </div>
        </div>
        <div className="bottomRow">
          <GuestList guests={this.state.guests} isEmpty={this.state.empty} providers={this.state.providers}/>
        </div>
      </div>
    );
  }
}


export default ClientPage;