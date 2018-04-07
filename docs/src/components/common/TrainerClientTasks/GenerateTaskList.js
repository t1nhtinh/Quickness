import React, {PropTypes} from 'react';
import ClientTaskList from "./ClientTaskList";
import TrainerTaskList from "./TrainerTaskList";

class GenerateTaskList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        who:this.props.who
    };
  }

    render() {
        if (this.state.who == "client") {
            return (
                <ClientTaskList/>
            );
        }
        else {
            return (
                <TrainerTaskList/>
            );
        }
    }
}
GenerateTaskList.propTypes = {
    who: PropTypes.string.isRequired
};

export default GenerateTaskList;