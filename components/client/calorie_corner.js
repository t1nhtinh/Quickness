import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from '../common/LoadingDots';

const Calorie_corner = () => {
  return (
    <div id="calorie_corner">
    <div className="signage">
        <h1> Nutritional Breakdown </h1>
    </div>
    <div id="calorie_meter">
    </div>
    <p id="macros">
        Calories: 2000 <br />
        Protein: 150g <br />
        Carbs: 200g <br />
        Fat: 25g <br />
    </p>
</div>
  );
};

export default Calorie_corner;
