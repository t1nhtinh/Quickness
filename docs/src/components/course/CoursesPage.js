import React, {PropTypes} from 'react';
import {connect} from 'react-redux'; //renders component and injects props into the component without messing with layout
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    //-	Using declarations in ES6 will not automatically bind the method to this, so you need to bind it with that call.
    // If you did not you would get an error RedirectToCoursePage is undefined.
    // It is assinged so that whenever you choose to call it elsewhere in the class you can use this.redirectToAddCoursePage 
    //otherwise any other instance you use this method you would need the full this.redirectToAddCoursePage.bind(this)
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this); 
  
    console.log(this.props);
  }

  //function to return a div element with the course title
  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  // function to add course link
  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render() {
    const {courses} = this.props; //set the courses from the props

    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={courses}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
