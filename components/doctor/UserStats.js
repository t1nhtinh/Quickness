import React from 'react';

const UserStats = (props) => {
        return(
            <div className="summary">
                <table id="summary">
                <tbody>
                    <tr>
                        <th>Name:</th><td>{props.stats.first} {props.last}</td>
                    </tr>
                    <tr>
                        <th>Age:</th><td>{props.stats.age}</td>
                    </tr>
                    <tr>
                        <th>Height:</th><td>{props.stats.ht}</td>
                    </tr>
                    <tr>
                        <th>Weight:</th><td>{props.stats.wt}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );

};

export default UserStats;
