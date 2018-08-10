import React from 'react';

class WaitedTime extends React.Component {
    constructor(props) {
      super(props);
      this.state = { seconds: 0 };
    }


    componentDidMount() {
      this.interval = setInterval(() => this.props.updateWaitedTime(this.props.guest.index), 60000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
        //console.log(this.props);
        //console.log("time: ", this.state.seconds )
      return (
        // <div className="wait-container" onClick={this.props.update}> Wait Time: {this.props.waitTime} </div>
        <td>{this.props.guest.waitedTime} <small>min</small> </td>
      );
    }
  }

  export default WaitedTime;
