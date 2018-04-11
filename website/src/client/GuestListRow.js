import React from 'react';

const GuestListRow = (props) => {
        // console.log(props);
        return(
            <tr>
                <td> {props.guest.name} </td>
                <td> {props.guest.number} </td>
                <td> {props.guest.employee} </td>
                <td> 
                    <tr> 
                        <td> <div className="optBtn" onClick={this.addGuest}>x</div> </td>
                        <td> <div className="optBtn" onClick={this.addGuest}>-</div> </td>
                        <td> <div className="optBtn" onClick={this.addGuest}>+</div> </td>
                    </tr>
                </td>
            </tr>
                            
        );

};


GuestListRow.propTypes = {
    //props: PropTypes.array.isRequired
  };
export default GuestListRow;