import React, { PropTypes } from 'react';

const ClientInfo = () => {
    return (
        <div id="info_list" className="calendar">
            <table className="given_calendar">
                <tr>
                    <th> General </th>
                </tr>
                <tr>
                    <td> Male </td>
                </tr>
                <tr>
                    <td> Age: 47</td>
                </tr>
                <tr>
                    <td> Tired All the Time</td>
                </tr>
                <tr>
                    <th> Fitness Plan</th>
                </tr>
                <tr>
                    <td> Weight Loss Goal</td>
                </tr>
                <tr>
                    <th> Weight </th>
                </tr>
                <tr>
                    <td>800lbs</td>
                </tr>
                <tr>
                    <th>Weight Goal</th>
                </tr>
                <tr>
                    <td>150lbs</td>
                </tr>
            </table>
        </div>
    );
};

export default ClientInfo;

