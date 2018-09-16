import React from 'react';

class WaitTime extends React.Component {
    constructor(props) {
      super(props);
      this.state = { };
    }

    componentDidMount() {
      this.interval = setInterval(() => this.props.updateWaitTime(), 5000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
        //console.log(this.props);
        //console.log("time: ", this.state.seconds )
      return (
        <div className="wait-container waitTime-cont" onClick={this.props.update}> Wait Time: {this.props.waitTime} </div>
      );
    }
  }

  export default WaitTime;