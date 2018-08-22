import React from 'react';
import {Link} from 'react-router-dom';
import '../css/client.css';
import fire from './../fire';
import GuestList from './GuestList';
import ProviderList from './ProviderList';

import WaitTime from './WaitTime';


// //TODO: implement breaks when provider is idle
// let employees = [
//   {
//     name: "Tinh Dang", 
//     id: 1, 
//     status: "open" 
//   }, 
//   {
//     name: "De Tran", 
//     id: 2,
//     status: "open" 
//   }, 
//   {
//     name: "Quickness", 
//     id: 3,
//     status: "open" 
//   }
// ];


class ClientPage extends React.Component { 
     constructor(props,context) {
        super(props,context);
        let date = this.getDate();
       
        this.state = {
          date: date,
          // guests: [], 
          //providers: employees, //set dummy employees TODO: sorted by alphabet
          empty: true,
          showPopup: false, 
          providerType: "Employees",
          numInLine:0,

          numOfGuests: 0,
          number: "",

          numOfProviders: 0, 
          openProviders: 0, //array of integers
          idleProviders:[], //array of integers
          inProgressProviders:[], //array of integers
          providerId: "",
          
          processTime: 0, 
          waitTime: 0, 
          waitTimes: [],
          minStartTime: 0,
          estimatedFinishTimes: [], 
          
          showDefault: "block",
          showProviders: "none",
          showDisplay: "none",
          settingDisplay: "none",
          page: 1,
          maxRows: 15

  
        }

        this.getDate = this.getDate.bind(this); //helper method
        
        this.initProviders = this.initProviders.bind(this);
        this.initGuests = this.initGuests.bind(this);
        this.initSettings = this.initSettings.bind(this);

        this.writeProviderData = this.writeProviderData.bind(this);
        this.writeGuestData = this.writeGuestData.bind(this);
        this.writeSettingData = this.writeSettingData.bind(this);
        
        this.updateGuestData = this.updateGuestData.bind(this);
        this.updateProviderData = this.updateProviderData.bind(this);
        this.updateSettingData = this.updateSettingData.bind(this);


        this.addGuest = this.addGuest.bind(this);
        this.getName = this.getName.bind(this);
        this.getNumber = this.getNumber.bind(this);

        this.addProvider = this.addProvider.bind(this);
        this.getProviderName = this.getProviderName.bind(this);
        this.getProviderId = this.getProviderId.bind(this);
        this.handleNumOfProviders = this.handleNumOfProviders.bind(this);


        this.handleProcessTime = this.handleProcessTime.bind(this);
        this.updateWaitTime = this.updateWaitTime.bind(this);
        this.updateNumInLine = this.updateNumInLine.bind(this);

        this.updateWaitedTime = this.updateWaitedTime.bind(this);
        this.updateNumOfOpenProv = this.updateNumOfOpenProv.bind(this);
        
        this.calcFinishTime = this.calcFinishTime.bind(this);
        this.calcWaitTime = this.calcWaitTime.bind(this);
        
        this.moveGuest = this.moveGuest.bind(this);
        this.setStatus = this.setStatus.bind(this); 
        this.setProvider = this.setProvider.bind(this);
        this.updateCheckedBox = this.updateCheckedBox.bind(this);
        
        this.turnPage = this.turnPage.bind(this);
        this.showContent = this.showContent.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        

    }

  
    componentWillMount(){     
      // for(var i = 0; i < employees.length; i++){
      //   var newKey = fire.database().ref().child("providers").push().key;
      //   this.writeProviderData("providers", newKey, employees[i].name, i+1, "open");
      // }    
    }

    componentDidMount(){
      this.initProviders();
      this.initGuests();
      this.initSettings();
      
    }

    componentWillUnmount(){

    }

    componentWillUpdate(){

    }

    componentWillReceiveProps(){

    }

    componentDidUpdate(){
 
    }

    //Note: current time is always greater than the starting time in this app
    getDate(){
      let date = new Date(); 
      let year = date.getFullYear(); 
      let month = date.getMonth()+ 1; 
      let day = date.getDate(); 

      return month + "-" + day + "-" + year;
    }

    //Initialize the providers 
    //sort the providers by name and store
    //create keys and store them in openProviderList 
    //This should call from an API
    initProviders(){
      let providerRef = fire.database().ref('providers').orderByKey().limitToLast(20);
      
      providerRef.on('value', snapshot => {
        /* Update React state when providers is added at Firebase Database */
        let providers = [];
        snapshot.forEach((snap) => {               
          if(snap.val()){
            providers.push(snap.val());
          } 
        })      

        let openProviders = this.updateNumOfOpenProv(providers);

        this.setState({ 
          providers: providers,
          numOfProviders: providers.length,
          openProviders: openProviders
        });
      
      })
    }

    initGuests(){
      let guestRef = fire.database().ref( this.getDate() + "/" + "guests");
      var empty = true; 

      guestRef.on('value', snapshot => {
        /* Update React state when guests is added at Firebase Database */        
        let guests = [];       
        snapshot.forEach((snap) => {               
          if(snap.val()){
            guests.push(snap.val());
            empty = false;
          } 
        })                 
        
        let numInLine = this.updateNumInLine(guests); 

        this.setState({ 
          guests: guests,
          empty: empty,
          numOfGuests: guests.length,
          numInLine: numInLine
        }); 
      })
    }


    initSettings(){
      let settingRef = fire.database().ref( this.getDate() + "/" + "settings");
      settingRef.on('value', snapshot => {
        /* Update React state when settings is added at Firebase Database */
        snapshot.forEach((snap) => {               
          if(snap.val()){
            var key = snap.key;
            var val = snap.val();
   
            this.setState({ 
              [key]: val
            });   
          } 
        })     
      })
    }
    
    //Write data to the database
    writeProviderData( userType, key, name, id, status) {
      fire.database().ref( userType + '/' + key).set({
        key: key, 
        name: name,
        id : id, 
        status: status 
      });
    }

    //Write guest data to the database
    writeGuestData( date, key, name, number, index, status, quotedTime, startTime, waitedTime, provider) {
      fire.database().ref( date + '/' + 'guests' + '/' + key).set({
        key: key,
        name: name, 
        number: number, 
        index: index, 
        status: status, 
        quoted: quotedTime, 
        startTime: startTime, 
        waitedTime: waitedTime, 
        provider: provider
      });
    }

    writeSettingData(date, key, value){
      let settingRef = fire.database().ref( date + '/' + 'settings' + '/');
      
      settingRef.set({
        [key]: value
      });
    }

    updateGuestData(guestKey, key, value, index){
      let guestRef = fire.database().ref( this.state.date + '/' + 'guests' + '/' + guestKey);
      guestRef.update({
        [key]: value
      });
    }

    updateProviderData(){

    }

    updateSettingData(){

    }

    addGuest(){
      let newGuests = this.state.guests;
      let empty = this.state.empty; 
      let numOfGuests = this.state.numOfGuests; 
      let numInLine = this.state.numInLine;
      let waitTime = this.state.waitTime;
      let startTime = new Date().toString();
      let page = this.state.page;
      let maxRows = this.state.maxRows; 

      //check if name exists   
      if(this.state.name){
        var newKey = fire.database().ref().child(this.state.date + "/" + "guests").push().key;

        let guest = {name: this.state.name, key: newKey, number: this.state.number, 
          index: numOfGuests, status: 'ready', quoted: waitTime, 
          startTime: startTime, waitedTime: 0, provider:"default" }

        if(newGuests){
          newGuests = [ ...newGuests, guest];
        }
        else{
          newGuests = [guest]
        }
                      
        this.writeGuestData(this.state.date, newKey, this.state.name, this.state.number, 
          numOfGuests, 'ready', waitTime, startTime, 0, "default" );
 
        empty = false; 
        numOfGuests++; //total number of guests
        numInLine++; //number of people waiting so far

        if((numOfGuests)  % maxRows == 1){
          this.turnPage(1); 
        }
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
    var newIndex;  

    if(dir){//move up if true
      if(index < 1){ return; }

      newIndex = index - 1; 
      let guest = guests[newIndex]; 
      guests[index] = guest; 
      guests[newIndex] = tempGuest; 

      guests[index].index = index; 
      guests[newIndex].index = newIndex; 
    }
    else{ //move down
      if(index >= guests.length - 1){return; }
      newIndex = index + 1; 
      let guest = guests[newIndex]; 
      guests[index] = guest; 
      guests[newIndex] = tempGuest; 

      guests[index].index = index; 
      guests[newIndex].index = newIndex; 
    }
    this.updateGuestData(guests[newIndex].key , "index", newIndex, newIndex);
    this.updateGuestData(guests[index].key , "index", index, index);
    
    this.setState({
      guests: guests 
    });
  }

  turnPage(dir){
    let page = this.state.page;
    let maxRows = this.state.maxRows; 
    let numOfGuests = this.state.numOfGuests;
    let maxRow = page*maxRows; // 1*15 --> 15 

    if(!dir && page > 1){ //0 means go to prevpage
      page = page - 1
    }
    else if(numOfGuests >= maxRow){
      page = page + 1; 
    }
    else {return;} 

    this.setState({
      page: page
    });
  }
  //Method to set the status of guests 
  setStatus(num, index){
    let status = "";
    let guests = this.state.guests;  
    if(num === 0){
      status = "ready";
    } else if (num === 1){
      status = "inProgress";
    }else {
      status = "done";
    }
    guests[index].status = status; 
    
    this.setState({
      guests: guests
    });

    this.updateGuestData(guests[index].key , "status", status, index);
  }

  setProvider(providerName, index){
    let guests = this.state.guests;
    guests[index].provider = providerName;

    this.setState({
      guests: guests
    });

    this.updateGuestData(guests[index].key , "provider", providerName);
  }
  
  updateCheckedBox(name, value, index){
    let guests = this.state.guests;

    if(name === "insolesOnly"){
      guests[index].insolesOnly = value;
      this.updateGuestData(guests[index].key , "insolesOnly", value, index);
    }
    else if (name == "isDone"){
      guests[index].isDone = value;
      
      if(value == true){
        guests[index].status = "done";
        this.updateNumInLine();

        this.updateGuestData(guests[index].key , "status", "done", index);
      }

      this.updateGuestData(guests[index].key , "isDone", value, index);
    }

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
       providers = [...providers, {name: this.state.providerName, id: this.state.providerId, status: "open"}];

       var newKey = fire.database().ref().child("providers").push().key; //create a key for new employee
       //upload to firebase
       this.writeProviderData("providers", newKey, this.state.providerName, this.state.providerId, "open");
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
  }

  //Function to get the number of providers that are open
  updateNumOfOpenProv(providers){
    console.log("updating num of providers");
    if(providers){
      let index = 0; 
      let numOfOpenProv = 0;
      //iterate through all the providers
      if(providers.length){
        for(index = 0; index < providers.length; index++){
          if(providers[index].status === "open"){
            numOfOpenProv++; 
          }
        }
      }
      return numOfOpenProv;
    }
    return 0; 
  }
  
  //update state whenever the processTime is changed
  handleProcessTime(event){
    this.setState({ 
      processTime: event.target.value
    });  

    this.writeSettingData(this.getDate(), "processTime", event.target.value);
  }

  updateNumInLine(guests){
    console.log("updating num in line");
    //iterate through guest in line
    //let guests = this.state.guests; 
    if(guests){
      let i = 0; 
      let numInLine = 0; 
      //count how many are in the ready state
      for(i = 0; i < guests.length; i++){
        if(guests[i].status === "ready"){
          numInLine++; 
        }
      }
      //set state
      // this.setState({ 
      //   numInLine: numInLine
      // }); 
      return numInLine;
   } 
  }

  //Function to calculate the wait time depending on number of guests in line and number of open providers
  updateWaitTime(){  
    //console.log(this.state.guests); 
    let waitTime = 0; //Initialize waitTime to zero
    let providers = this.state.providers;
    let processTime = this.state.processTime;

    //  if(processTime < 5) {return; }
    //update the number of open Providers
    //this.updateNumberOfOpenProviders(); 
    let numOfOpenProv = this.state.openProviders; 
    let numInLine = this.state.numInLine;
    let i = 0; 
    // console.log(numOfOpenProv, "num of open Providers");
    // console.log(numInLine, "num inLine");
    // console.log(processTime, "The process Time");

    //Check whether the number of guests inLine is greater than the number of open providers
    if(numInLine >= numOfOpenProv && numOfOpenProv > 0){    
      //iterate through the providers who are InProgress and calculate estimate finish time
      //this.calcFinishTime(providers, processTime); 
      //let estimatedFinishTimes = this.state.estimatedFinishTimes; //estimated times are stored in descending order  
      let estimatedFinishTimes = this.calcFinishTime(providers, processTime);
      //console.log(estimatedFinishTimes, "estimate finish times"); 
      //calculateWaitTimes from estimated finish times
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

  //updates the waited/quoted time so far based on the current time
  updateWaitedTime(index){
    let guests = this.state.guests;
    
    let currTime = new Date();
    var waitedTime; 

    if(guests[index].status === "ready"){
      let startTime = new Date(guests[index].startTime); 
      waitedTime = new Date(currTime - startTime); 
      waitedTime = waitedTime.getMinutes();
      guests[index].waitedTime = waitedTime; 

      this.setState({ 
        guests: guests
      });  

      this.updateGuestData(guests[index].key , "waitedTime", waitedTime, index);
    }
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
    // console.log(waitTimeList);
    
    //sort the  waitTimes in descending order
    waitTimeList.sort(function(a, b){return b - a}); 
    
    return waitTimeList; 

  }

  //set the settings content to display or hidden 
  showContent(event){
    // if(show === "none"){
    //   show = "block";
    // } 
    // else {
    //   show = "none";
    // }
    let num = event.target.id;
    var showDefault, showProviders, showDisplay; 

  
    if(num == 0){
      showDefault = "block"; 
      showProviders = "none";
      showDisplay = "none"; 
    }
    else if( num == 1){
      showDefault = "none"; 
      showProviders = "block";
      showDisplay = "none"; 
    }
    else if (num == 2){
      showDefault = "none"; 
      showProviders = "none";
      showDisplay = "block"; 
    }
    this.setState({
      showDefault: showDefault,
      showProviders: showProviders,
      showDisplay: showDisplay
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });

    // this.showContent();
  }

  render() {

    return (
      <div>
        <div className="upperRow">
          <div className="topNav">
            <Link to="/">Home</Link>
            
            {/* <div className="dropdown">   */}
              <a onClick={this.togglePopup}>Settings </a> 
             { this.state.showPopup ?
                <div className="popup">

                  <div class="tab">
                    <button class="tablinks" onClick={this.showContent} id="0">Default</button>
                    <button class="tablinks" onClick={this.showContent} id="1">Employees</button>
                    <button class="tablinks" onClick={this.showContent} id="2">Display</button>
                  </div>

                  <div class="tabcontent" style={{display: this.state.showDefault}}>
                    Process Time: {this.state.processTime}
                    <p><input type="number" value={this.state.processTime} onChange={this.handleProcessTime}/></p>
                    <p><button>Save</button> <button onClick={this.togglePopup}> Close </button></p>
                  </div>

                  <div class="tabcontent" style={{display: this.state.showProviders}}>                   
                    <h3> # of {this.state.providerType}: {this.state.openProviders} </h3>
                    <input type="text" placeholder="type name " onChange={this.getProviderName} value={this.state.providerName} />
                    <input type="text" placeholder="type employee id " onChange={this.getProviderId} value={this.state.providerId}/>
                    <button onClick={this.addProvider}>+</button>
                    <br></br>
                    <br></br>
                    <ProviderList providers={this.state.providers} isEmpty={this.state.empty}/>
                    
                    
                    <p><button>Save</button> <button onClick={this.togglePopup}> Close </button></p>              
                  </div>
                  
                </div>
            : null}
            {/* </div> */}
            
           <div className="analytic-cont">
              <WaitTime updateWaitTime={this.updateWaitTime} waitTime={this.state.waitTime} />      
              <div className="wait-container inline-cont">In-Line: {this.state.numInLine}</div>
            </div>
          </div>
        </div>
        <div className="middleRow">
          <div className="newRow">
            <table className="newRow">
              <thead>
                <tr>
                  <th style={{padding: "5px"}}><input type="text" placeholder="type name..." onChange={this.getName} value={this.state.name}/></th>
                  <th style={{padding: "5px"}}><input type="tel" placeholder="type number..." onChange={this.getNumber} value={this.state.number}/></th>
                  <th><div className="addBtn" onClick={this.addGuest}>+</div></th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="bottomRow">
          <GuestList guests={this.state.guests} isEmpty={this.state.empty} providers={this.state.providers} 
          onMove={this.moveGuest} setStatus={this.setStatus} setProvider={this.setProvider} updateNumInLine={this.updateNumInLine} 
          updateWaitedTime={this.updateWaitedTime} updateCheckedBox={this.updateCheckedBox} page={this.state.page} 
          maxRows={this.state.maxRows} turnPage={this.turnPage}/>
        </div>
      </div>
    );
  }
}


export default ClientPage;
