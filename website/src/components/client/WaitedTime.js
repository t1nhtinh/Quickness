import React from 'react';

class WaitedTime extends React.Component {
    constructor(props) {
      super(props);
      this.state = { seconds: 0 };

      this.color = "black"; 
     
    }


    componentDidMount() {
      this.interval = setInterval(() => this.props.updateWaitedTime(this.props.guest.index), 60000);
      
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      if(this.props.guest.waitedTime > this.props.guest.quoted){
        this.color = "red"; 
      }
  
      return (
        <td style={{color: this.color}}>{this.props.guest.waitedTime} <small>min</small> </td>
      );
    }
  }

  export default WaitedTime;
