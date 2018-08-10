import React from 'react';

class WaitTime extends React.Component {
    constructor(props) {
      super(props);
      this.state = { seconds: 0 };
    }



    componentDidMount() {
      this.interval = setInterval(() => this.props.update(), 3000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
        //console.log(this.props);
        //console.log("time: ", this.state.seconds )
      return (
        <div className="wait-container" onClick={this.props.update}> Wait Time: {this.props.waitTime} </div>
      );
    }
  }

  export default WaitTime;

// ReactDOM.render(<WaitTime />, mountNode);