import React from 'react';
import {Link} from 'react-router-dom';
import '../../css/client.css';
import fire from '../../config/fire';
import GuestList from './GuestList';
import GuestListCard from './GuestDetailCard';
import ProviderList from './ProviderList';
import ProvDetailCard from './ProvDetailCard';
import WaitTime from './WaitTime';



class ClientPage extends React.Component { 
     constructor(props,context) {
        super(props,context);
        let date = this.getDate();
       
        this.state = {

          storeNumber: this.props.storeNumber,
          date: date,
          // guests: [], 
          //providers: employees, //set dummy employees TODO: sorted by alphabet
          empty: true, //flag to check if clients exist
          isEmptyProv: true, 
          
          settingDisplay: "none",
          showDefault: "block",
          showProviders: "none",
          showDisplay: "none",
          
          
          showPopup: false,
          showDetailPopup: false,
          showDetailProv: false, 
          


          providerType: "Employees",
          numInLine:0,

          numOfGuests: 0,
          number: "",

          numOfProviders: 0, 
          openProviders: 0, //array of integers
          idleProviders:[], //array of integers
          inProgressProviders:[], //array of integers
          providerId: "",
          
          processTime: 10, 
          waitTime: 0, 
          waitTimes: [],
          minStartTime: 0,
          estimatedFinishTimes: [], 
          
          page: 1,
          maxRows: 15,

          textData:"",
          guestHeader: ["name", "number", "provider", "insolesOnly", "startTime", "finishTime", "quoted", "waitedTime", "processStartTime", "processTime" ],
          providerHeader: ["name", "id", "visits", "sold", "percentage"]
        }

        this.getDate = this.getDate.bind(this); //helper method
        this.formatTime = this.formatTime.bind(this);

        // this.authListener = this.authListener.bind(this);
        // this.verifyUser = this.verifyUser.bind(this);

        this.initProviders = this.initProviders.bind(this);
        this.initGuests = this.initGuests.bind(this);
        this.initSettings = this.initSettings.bind(this);

        this.writeProviderData = this.writeProviderData.bind(this);
        this.writeGuestData = this.writeGuestData.bind(this);
        this.writeSettingData = this.writeSettingData.bind(this);
        
        this.updateGuestData = this.updateGuestData.bind(this);
        this.updateProvData = this.updateProvData.bind(this);
        this.updateSettingData = this.updateSettingData.bind(this);

        this.saveGuestDetail = this.saveGuestDetail.bind(this);
        this.saveProvDetail = this.saveProvDetail.bind(this);
        
        this.deleteGuest = this.deleteGuest.bind(this);     
        this.deleteProv = this.deleteProv.bind(this);

        this.addGuest = this.addGuest.bind(this);
        this.addProvider = this.addProvider.bind(this);
       
        this.getName = this.getName.bind(this);
        this.getNumber = this.getNumber.bind(this);
        this.getGuestName = this.getGuestName.bind(this);
        this.getGuestNumber = this.getGuestNumber.bind(this);
        this.getGuestNotes = this.getGuestNotes.bind(this);

       
        this.getProviderName = this.getProviderName.bind(this);
        this.getProviderId = this.getProviderId.bind(this);
        this.getProvName = this.getProvName.bind(this);
        this.getProvId = this.getProvId.bind(this);

        this.handleNumOfProviders = this.handleNumOfProviders.bind(this);
        this.handleProcessTime = this.handleProcessTime.bind(this);
        
        this.updateWaitTime = this.updateWaitTime.bind(this);
        this.updateNumInLine = this.updateNumInLine.bind(this);
        this.updateWaitedTime = this.updateWaitedTime.bind(this);
        this.updateNumOfOpenProv = this.updateNumOfOpenProv.bind(this);
        this.updateNumVisits = this.updateNumVisits.bind(this);
        this.handleSold = this.handleSold.bind(this);

        this.calcFinishTime = this.calcFinishTime.bind(this);
        this.calcWaitTime = this.calcWaitTime.bind(this);
        
        this.moveGuest = this.moveGuest.bind(this);
        this.setStatus = this.setStatus.bind(this); 
        this.setProvStatus = this.setProvStatus.bind(this);
        this.setProvider = this.setProvider.bind(this);

        this.updateCheckedBox = this.updateCheckedBox.bind(this);
        
        this.turnPage = this.turnPage.bind(this);
        
        this.showContent = this.showContent.bind(this); //navigate in setting pops up
        this.togglePopup = this.togglePopup.bind(this); //open and close settings popup
        this.toggleDetailPopup = this.toggleDetailPopup.bind(this); //open and close guest detail popup       
        this.toggleDetailProv = this.toggleDetailProv.bind(this); //open and close provider detail popup

        this.logout = this.logout.bind(this);
     
        this.JSONToCSVConvertor = this.JSONToCSVConvertor.bind(this);
    }
    
    // authListener() {
    //   fire.auth().onAuthStateChanged((user) => {
    //     if (user) {
          
    //       this.setState({ 
    //         user,
    //         userId: user.uid,
    //       });
          
    //       this.verifyUser();
    //     } else {
    //       this.setState({ user: null });
    //     }
    //   });
    // }

    // verifyUser(){
    
    //   let userRef = fire.database().ref('users/' + this.state.userId);
    //   let storeNumber; 
      
    //   userRef.on('value', snapshot => { 
    //      if(snapshot.val()){
    //       storeNumber = snapshot.val().store;
  
    //       this.setState({ 
    //         storeNumber: storeNumber
    //       }); 
    //     }
    //   })
    // }

    createGFile = () => {
      if(this.state.guests){
        this.JSONToCSVConvertor(this.state.guests, " Guests Analytics", this.state.guestHeader);
      }
    }
    
    createEmpFile = () => {
      if(this.state.providers){
        this.JSONToCSVConvertor(this.state.providers, " Employee Analytics", this.state.providerHeader);
      }
    }
    
    
    JSONToCSVConvertor(JSONData, ReportTitle, header) {
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
      
      var CSV = 'sep=,' + '\r\n\n';
      // console.log(JSONData);
      // console.log(header);
      //This condition will generate the Label/Header
      if (header) {
        var row = "";
        
        //This loop will extract the label from header array
        for (var index in header) {
            //Now convert each value to string and comma-seprated
            row += header[index] + ',';
           
        }
         row = row.slice(0, -1); //remove the last comma
        
        //append Label row with line break
        CSV += row + '\r\n';
      }
      console.log(CSV);
          
      
      //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            //2nd loop will extract each column and convert it in string comma-seprated
            for(var j = 0; j < header.length; j++){             
                var data = arrData[i][header[j]] ? arrData[i][header[j]]: " ";
                row += '"' + data + '",';
              
            }
            //remove tailing comma
            row.slice(0, row.length - 1);     
            //add a line break after each row
            CSV += row + '\r\n';
        }
  
        console.log(CSV);

      if (CSV == '') {        
          alert("Invalid data");
          return;
      }   
      
      //Generate a file name
      var fileName = (this.state.date).toString();
      //this will remove the blank-spaces from the title and replace it with an underscore
      fileName += ReportTitle.replace(/ /g,"_");   
      
      //Initialize file format you want csv or xls
      var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
      
      // Now the little tricky part.
      // you can use either>> window.open(uri);
      // but this will not work in some browsers
      // or you will not get the correct file extension    
      
      //this trick will generate a temp <a /> tag
      var link = document.createElement("a");    
      link.href = uri;
      
      //set the visibility hidden so it will not effect on your web-layout
      link.style = "visibility:hidden";
      link.download = fileName + ".csv";
      
      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.setState({
        textData: uri
      })
  }
  
    componentWillMount(){     
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

    logout() {
      fire.auth().signOut();
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
      let providerRef;
      let storedProvRef; 

      providerRef = fire.database().ref("stores/" + this.state.storeNumber + "/"  + this.getDate() + '/providers').orderByKey().limitToLast(20);
   
      var isEmptyProv = true; 

      providerRef.on('value', snapshot => {
        /* Update React state when providers is added at Firebase Database */
        let providers = [];
        if(snapshot.val() === null){
          storedProvRef = fire.database().ref("stores/" + this.state.storeNumber + "/providers").orderByKey().limitToLast(20);
          
          storedProvRef.on('value', snapshot => {
            snapshot.forEach((snap) => {               
              if(snap.val()){
                // providers.push(snap.val());                
                let key = snap.val().key;          
                this.updateProvData(key, "name", snap.val().name);
                this.updateProvData(key, "id", snap.val().id);
                this.updateProvData(key, "index", snap.val().index);
                this.updateProvData(key, "key", snap.val().key);
                this.updateProvData(key, "sold", snap.val().sold);
                this.updateProvData(key, "status", snap.val().status);
              } 
            })      
          })        
        }

          snapshot.forEach((snap) => {               
            if(snap.val() !== null){
              providers.push(snap.val());
              
              let key = snap.val().key;          
              isEmptyProv = false; 
            } 
          })      
        
        let openProviders = this.updateNumOfOpenProv(providers);

        this.setState({ 
          providers: providers,
          numOfProviders: providers.length,
          openProviders: openProviders, 
          isEmptyProv: isEmptyProv

        });
      
      })
    }

    initGuests(){
      let guestRef = fire.database().ref("stores/" + this.state.storeNumber + "/"  + this.getDate() + "/" + "guests");
      var empty = true; 
      let textData = this.state.textData; 

      guestRef.on('value', snapshot => {
        /* Update React state when guests is added at Firebase Database */        
        let guests = [];    
        snapshot.forEach((snap) => {               
          if(snap.val() !== null){
            guests.push(snap.val());
            empty = false;
          } 
        })                 
        
        let numInLine = this.updateNumInLine(guests); 

        guests.sort(function(a,b){
          return a.index - b.index;
        });
        
        this.setState({ 
          guests: guests,
          empty: empty,
          numOfGuests: guests.length,
          numInLine: numInLine,
          textData: textData
        }); 
      })
    }


    initSettings(){
      let settingRef = fire.database().ref( "stores/" + this.state.storeNumber + "/"  + this.getDate() + "/" + "settings");
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
    writeProviderData( userType, key, name, id, status, index) {
      fire.database().ref( "stores/" + this.state.storeNumber + "/"  + this.getDate() + "/" + userType + '/' + key).set({
        key: key, 
        name: name,
        id : id, 
        status: status,
        index: index, 
        visits: 0,
        sold: 0
      });
    }

    //Write guest data to the database
    writeGuestData( date, key, name, number, index, status, quotedTime, startTime, waitedTime, provider) {
      fire.database().ref( "stores/" + this.state.storeNumber + "/" + date + '/' + 'guests' + '/' + key).set({
        key: key,
        name: name, 
        number: number, 
        index: index, 
        status: status, 
        quoted: quotedTime, 
        startTime: startTime, 
        waitedTime: waitedTime, 
        provider: provider,
        notes: "-"
      });
    }

    writeSettingData(date, key, value){
      let settingRef = fire.database().ref( "stores/" + this.state.storeNumber + "/"  + date + '/' + 'settings' + '/');
      
      settingRef.set({
        [key]: value
      });
    }

    updateGuestData(guestKey, key, value){
      let guestRef = fire.database().ref( "stores/" + this.state.storeNumber + "/"  + this.state.date + '/' + 'guests' + '/' + guestKey);
      guestRef.update({
        [key]: value
      });
    }

    updateProvData(provKey, key, value){
      let provRef = fire.database().ref( "stores/" + this.state.storeNumber + "/"  + this.getDate() + "/" +'providers' + '/' + provKey);
      provRef.update({
        [key]: value
      });
    }

    updateSettingData(){

    }

    addGuest(e){
      e.preventDefault();
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
        var newKey = fire.database().ref().child("stores/" + this.state.storeNumber + "/"  + this.state.date + "/" + "guests").push().key;

        let guest = {name: this.state.name, key: newKey, number: this.state.number, 
          index: numOfGuests, status: 'ready', quoted: waitTime, 
          startTime: startTime, waitedTime: 0, provider:"default", notes: "" }

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
      let processStartTime = new Date();
      processStartTime = processStartTime.toString();

      guests[index].processStartTime = processStartTime;
      this.updateGuestData(guests[index].key , "processStartTime", processStartTime);
    }else {
      status = "done";
    }
    guests[index].status = status; 
    
    this.setState({
      guests: guests
    });

    this.updateGuestData(guests[index].key , "status", status);
  }

  //Method to set the status of providers 
  setProvStatus(num, index){
    let status = ""; 
    let providers = this.state.providers;  
    
    if(num === 0){
      status = "open";
    } else if (num === 1){
      status = "busy";
    }else {
      status = "done";
    }

    providers[index].status = status; 
    
    this.setState({
      providers: providers
    });

    this.updateProvData(providers[index].key , "status", status);
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
      this.updateGuestData(guests[index].key , "insolesOnly", value);
    }
    else if (name == "isDone"){
      guests[index].isDone = value;
      
      if(value == true){
        guests[index].status = "done";
        this.updateNumInLine();
        this.updateGuestData(guests[index].key , "status", "done");
        
        let finishTime = new Date();
        finishTime = finishTime.toString();

        guests[index].finishTime = finishTime;
        this.updateGuestData(guests[index].key , "finishTime", finishTime);
      }

      this.updateGuestData(guests[index].key , "isDone", value);
    }

    this.setState({
      guests: guests
    });
  }

  //Method to get name of guests at any instance
  getName(event){
    event.preventDefault();
    this.setState({
        name: event.target.value
    });
  }
  
  //Method to get the phone number of guest onChange
  getNumber(event){
    event.preventDefault();
    this.setState({
        number: event.target.value
    });
  }

  //PRECONDITION: guest has been set
  //Method to get name of guests at any instance
  getGuestName(event){
    event.preventDefault();
    let guest = this.state.guest; 
    guest.name = event.target.value;
    
    this.setState({
        [guest.name]: event.target.value
    });
  }
  
  //Method to get the phone number of guest onChange
  getGuestNumber(event){
    event.preventDefault();
    let guest = this.state.guest;
    guest.number = event.target.value; 
    
    this.setState({
        [guest.number]: event.target.value
    });
  }
 
  getGuestNotes(event){
    event.preventDefault();
    let guest = this.state.guest;
    guest.notes = event.target.value; 
    
    this.setState({
        [guest.notes]: event.target.value
    });
  }
  
  //Method to add provider to list of providers
  addProvider(e){
    e.preventDefault();
     let providers = this.state.providers;    
     let numOfProv = 0; 
     //Check if name has been filled out
     if(this.state.providerName){
      var newKey = fire.database().ref().child("stores/" + this.state.storeNumber + "/providers").push().key; //create a key for new employee   
      let provider;
      
      if(providers){
        numOfProv = providers.length;
        providers = [...providers, {name: this.state.providerName, id: this.state.providerId, key: newKey, status: "open", index: numOfProv, visits: 0, sold: 0 }];
      }
      else {
        providers = [{name: this.state.providerName, id: this.state.providerId, key: newKey, status: "open", index: numOfProv, visits: 0, sold: 0 }]
      }
          
       //upload to firebase
       this.writeProviderData("providers", newKey, this.state.providerName, this.state.providerId, "open", numOfProv);
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
    event.preventDefault();
    this.setState({
        providerName: event.target.value
    });
  }

  //Method to get provider ID onChange
  getProviderId(event){
    event.preventDefault();
    this.setState({
        providerId: event.target.value
    });
  }

  //Method to get provider detail name onChange
  getProvName(event){
    event.preventDefault();
    let provider= this.state.provider;
    provider.name = event.target.value; 
    
    this.setState({
        [provider.name]: event.target.value
    });
  }

  //Method to get provider detail ID onChange
  getProvId(event){
    event.preventDefault();
    let provider = this.state.provider;
    provider.id = event.target.value; 
    
    this.setState({
        [provider.id]: event.target.value
    });
  }
  
  //method to check the number of open providers
  handleNumOfProviders(event){
    event.preventDefault();
    this.setState({ 
      numOfProviders: event.target.value 
    });  
  }

  //Function to get the number of providers that are open
  updateNumOfOpenProv(providers){
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
    event.preventDefault();
    this.setState({ 
      processTime: event.target.value
    });  

    this.writeSettingData(this.getDate(), "processTime", event.target.value);
  }

  updateNumInLine(guests){
    //iterate through guest in line
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

  handleSold(event, index){
    event.preventDefault();
    let providers = this.state.providers;
    let key = providers[index].key;

    this.setState({
      [providers[index].sold]: event.target.value
    })

    this.updateProvData(key, "sold", event.target.value);
  }

  //Update the number of visits 
  updateNumVisits(){
    let providers = this.state.providers;
    let guests = this.state.guests; 
    if(guests && providers){
      for(var i = 0; i < providers.length; i++){
        providers[i].visits = 0;
        var key = providers[i].key; 
        for(var j = 0; j < guests.length; j++){
          if(providers[i].name == guests[j].provider){
            providers[i].visits += 1; 
          }
        }
        this.updateProvData(key, "visits", providers[i].visits);
      }
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
  //TODO: we need to make more accurate... does not work if wait time goes over an hour long.....
  updateWaitedTime(index){
    let guests = this.state.guests;
    
    let currTime = new Date();
    var waitedTime; 

    if(guests){
      if(guests[index].status === "ready"){
        let startTime = new Date(guests[index].startTime); 
        waitedTime = Math.abs(new Date(currTime - startTime)); 
        waitedTime = Math.round((waitedTime/1000)/60);
        guests[index].waitedTime = waitedTime; 

        this.setState({ 
          guests: guests
        });  

        this.updateGuestData(guests[index].key , "waitedTime", waitedTime, index);
      }
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
  }

  //TODO: Need to figure out what happens if currentTime is greater that estimated finish time
  //      If this happens we can set the wait time to be font color red since we have now went over the quoted time
  //get the estimated finishTime and subtract it by the currentTime  
  calcWaitTime(estimatedFinishTime){
    let i = 0; 
    let currentTime = new Date(); 
    var waitTimeList = [];  
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
    event.preventDefault();
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

  //show settings
  togglePopup() {
    this.updateNumVisits();

    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  toggleDetailPopup(index) {
    let guest = this.state.guests[index]; 

    
    this.setState({
      guest: guest, 
      showDetailPopup: !this.state.showDetailPopup
    });
  }

  toggleDetailProv(index) {
    let provider = this.state.providers[index]; 
   
    this.setState({
      provider: provider, 
      showDetailProv: !this.state.showDetailProv
    });
  }

  formatTime(time){
    let date = new Date(time);
    let hr = date.getHours();
    let min = date.getMinutes(); 
    var ampm = "am";

    if (min < 10) {
      min = "0" + min;
    }
  

    if( hr >= 12 ) {
      hr -= 12;
      ampm = "pm";
    }

    if(hr == 0){
      hr = 12; 
    }  

    time = hr + ":" + min + ampm; 
    
    return time; 
  }

  saveGuestDetail(){
    let guest = this.state.guest; 
    let key = guest.key;

    this.updateGuestData(key, "name", guest.name );
    this.updateGuestData(key, "number", guest.number );
    this.updateGuestData(key, "notes", guest.notes );

  }

  

  deleteGuest(){

  }

  saveProvDetail(){
    let provider = this.state.provider; 
    let key = provider.key;

    this.updateProvData(key, "name", provider.name );
    this.updateProvData(key, "id", provider.id );

  }

  deleteProv(){

  }

  render() {
    console.log(this.state);
    console.log("client props", this.props);
    return (
      <div>
        <div className="upperRow">
          <div className="topNav">
            <Link to="/">Home</Link>
            
              <a onClick={this.togglePopup}>Options </a> 
              <a onClick={this.logout}>Logout </a> 
              {/* <a href={this.state.textData} download="data.csv" > Download</a> */}
              {/* <button onClick={this.createFile}> Generate Docs</button> */}
              {this.state.showPopup ?
                <div className="popup">

                  <div className="tab">
                    <button className="tablinks" onClick={this.showContent} id="0">Main Settings</button>
                    <button className="tablinks" onClick={this.showContent} id="1">Employees</button>
                    <button className="tablinks" onClick={this.showContent} id="2">Analytics</button>
                  </div>

                  <div className="tabcontent" style={{display: this.state.showDefault}}>
                    <button onClick={this.togglePopup} className="closeBtn"> &#215; </button>
                    
                    <h3 style={{clear: "right"}}> Process Time: {this.state.processTime} </h3>
                    <p><input type="number" value={this.state.processTime} onChange={this.handleProcessTime}/></p>
                    <form> 
                    
                    </form>                  
                    <p><button>Save</button> </p>
                  </div>

                  <div className="tabcontent" style={{display: this.state.showProviders}}> 
                    <button onClick={this.togglePopup} className="closeBtn"> &#215; </button>                  
                    <h3 style={{clear: "right"}}> # of {this.state.providerType}: {this.state.openProviders} </h3>
                    <form>
                      <input type="text" placeholder="type name " onChange={this.getProviderName} value={this.state.providerName} />
                      <input type="number" placeholder="type employee id " onChange={this.getProviderId} value={this.state.providerId}/>
                      <button type="submit" onClick={this.addProvider}>+</button>
                    </form>
                    <br></br>
                    <br></br>
                    <ProviderList providers={this.state.providers} isEmpty={this.state.isEmptyProv} showDetailProv={this.toggleDetailProv}
                      setProvStatus={this.setProvStatus} handleSold={this.handleSold}/>
                                       
                    <p><button>Save</button></p>              
                  </div>
                  
                  <div className="tabcontent" style={{display: this.state.showDisplay}}> 
                    <button onClick={this.togglePopup} className="closeBtn"> &#215; </button>                  
                    <h3 style={{clear: "right"}}>Analytics</h3>
                    <h5> {this.state.date} </h5>


                    <div className="row">
                      <div className="col-md-6">
                        <h5> Employee Summary </h5> 
                        <button className="btn btn-sm btn-warning" onClick={this.createEmpFile}>Generate Employee Summary</button>
                      </div>      
                      <div className="col-md-6">
                        <h5> Guests Summary </h5> 
                        <button className="btn btn-sm btn-warning" onClick={this.createGFile}>Generate Guest Summary</button>
                      </div> 
                    </div>       
                  </div>
                </div>
              : null}

              {this.state.showDetailPopup ?
                <GuestListCard guests={this.state.guests} guest={this.state.guest} providers={this.state.providers} setProvider={this.setProvider}
                  toggleDetailPopup={this.toggleDetailPopup} getGuestName={this.getGuestName} 
                  getGuestNumber={this.getGuestNumber} saveGuestDetail={this.saveGuestDetail} 
                  getGuestNotes={this.getGuestNotes} formatTime={this.formatTime}/>
              : null }

              {this.state.showDetailProv ?
                <ProvDetailCard provider={this.state.provider} toggleDetailProv={this.toggleDetailProv} 
                  saveProvDetail={this.saveProvDetail} getProvName={this.getProvName} getProvId={this.getProvId}/>
              : null}
     
           <div className="analytic-cont">
              <WaitTime updateWaitTime={this.updateWaitTime} waitTime={this.state.waitTime} />      
              <div className="wait-container inline-cont">In Line: {this.state.numInLine}</div>
            </div>
          </div>
        </div>
        <div className="middleRow">
          <div className="newRow">
          <form>
              <table className="newRow">
                <thead>
                  <tr>
                    <th><input type="text" placeholder="type name..." onChange={this.getName} value={this.state.name}/></th>
                    <th><input type="number" placeholder="type number..." onChange={this.getNumber} value={this.state.number}/></th>
                    <th><button type="submit" className="addBtn" onClick={this.addGuest}>+</button></th>
                  </tr>
                </thead>
              </table>
            </form>
          </div>
        </div>
        <div className="bottomRow">
          <GuestList guests={this.state.guests} isEmpty={this.state.empty} providers={this.state.providers} 
          onMove={this.moveGuest} setStatus={this.setStatus} setProvider={this.setProvider} updateNumInLine={this.updateNumInLine} 
          updateWaitedTime={this.updateWaitedTime} updateCheckedBox={this.updateCheckedBox} page={this.state.page} 
          maxRows={this.state.maxRows} turnPage={this.turnPage} showDetail={this.toggleDetailPopup}/>
        </div>
      </div>
    );
  }
}


export default ClientPage;
