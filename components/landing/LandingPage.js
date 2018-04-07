import React from 'react';
import '../../styles/home.css';
import {Link} from 'react-router';

class LandingPage extends React.Component {
  
    constructor(){
        super();
        this.state = {
            value: ''
           
      };
     // Using declarations in ES6 will not automatically bind the method to this, so you need to bind it 
      this.handlePage = this.handlePage.bind(this);
      this.handleChange = this.handleChange.bind(this);
  
      
  
    }
  
    handleChange(event){
        this.setState({
            value: event.target.value
           
        });
    }

    handlePage(){
        this.setState({
            value: event.target.value 
        });
    }

    
 


 render() {

//     var slideIndex = 1;
//     showSlides(slideIndex);

//     function showSlides(n) {
//         var i;
//         var slides = document.getElementsByClassName("mySlides");
//         var dots = document.getElementsByClassName("dot");
//         if (n > slides.length) {slideIndex = 1}    
//         if (n < 1) {slideIndex = slides.length}
//         for (i = 0; i < slides.length; i++) {
//             slides[i].style.display = "none";  
//         }
//         for (i = 0; i < dots.length; i++) {
//             dots[i].className = dots[i].className.replace(" active", "");
//         }
//         slides[slideIndex-1].style.display = "block";  
//         dots[slideIndex-1].className += " active";
//       }

// function plusSlides(n) {
//   this.showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   this.showSlides(slideIndex = n);
// }

    return (
      <div>
          <div className="header">

<div className="dummy_container">               
</div>
<div className="menu_login_container">
        <table className="login_form">
            <thead>
            <tr>
                <td><label for="email">Email or Username</label></td>
                <td><label for="pwd">Password</label></td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><input type="value" name="userid" id="email"/></td>
                <td><input type="password" name="pwd" id="pwd"/></td>
                <td><form id="page_select"><Link to={this.state.value}>Log In</Link></form></td>
                {/* <td><form><input type="button" value="Sign Up"/></form></td> */}
            </tr>
            <tr>
                <td>
                    <form onChange={this.handleChange} >
                        <select id="account_type">
                            <option value="landing">Select account...</option>
                            <option value="clientFP">Patient</option>
                            <option value="trainerFP">Provider</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </form>

                </td>
                <td><a href="#">Forgot account?</a></td>
            </tr>
            </tbody>
        </table>
</div>

<div className="title">
    <h1>
        <img src={require('../../images/suit1.png')} alt="suit" width="100" height="100"  /> Tailored Health Services
    </h1>
</div>

</div>


<div className="carousel">
<div className="carousel-inner">
<input className="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden="" checked="checked" style={{visibility: 'hidden'}}/>

<div className="carousel-item">

    <img src={require('../../images/health.jpg')} alt="Docters" />

    <div className="card_info">
        <p>To ensure your safety, we suit you with the our team of Doctors to go over your goals and evaluate your physical wellness.</p>
        <a href="#packages">Learn More ›</a>
    </div>
</div>


{/* <input className="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden=""/>
<div className="carousel-item">
    <img src={require('../../images/weightTraining.jpg')} alt="Personal Trainers" />
    <div className="card_info">
        <p>Train with world-renowned fitness coaches. </p>

        <a href="#strength_training">Learn More › </a>
    </div>
</div>

<input className="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden=""/>
<div className="carousel-item">
    <img src={require('../../images/marathon2.jpg')} alt="Marathon Runner" />
    <div className="card_info">
        <p>Training for a marathon? We got you covered! </p>
        <a href="#marathon">Learn More ›</a>

    </div>
</div>

<input className="carousel-open" type="radio" id="carousel-4" name="carousel" aria-hidden="true" hidden=""/>
<div className="carousel-item">
    <img src={require('../../images/physicalTherapist.jpg')}  alt="Physical Therapist" />
    <div className="card_info">
        <p>Injured?? Physical Therapists are here to help you back to recovery. </p>
        <a href="#physical_therapy">Learn More ›</a>
    </div>
</div>

<input className="carousel-open" type="radio" id="carousel-5" name="carousel" aria-hidden="true" hidden=""/>
<div className="carousel-item">
    <img src={require('../../images/jt3.jpg')} alt="JT selection" />
</div> */}

</div>
</div>

<div className="row">
<h2 id="packages">"Solutions that Suit your Health Needs"</h2>
<div className="left_column">


<div className="card_left">
    <h3 id="strength_training">Strength Training</h3>

    <img src={require('../../images/weights4.png')} alt="weights" />
    <p>
        Our strength training program will make you look like Arnold Schawzeneigar if he starred in Rocky Balboa. Your guns
        will turn into actual guns. 
    </p>
 

</div>

<div className="card_right">
   
        <h3>Weight Loss</h3>
        <img src={require('../../images/weightLoss.jpg')} alt="weight loss" />
        <p>
            The weight loss program. 
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
        </p>
 

</div>

    <div className="card_left">
        <h3 id="physical_therapy">Physical Therapy</h3>
        <img src={require('../../images/physicaltherapy2.png')} alt="physical therapy" />
        <p>
           This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description. 
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description. 
        </p>
    </div>



<div className="card_right">
    
        <h3 id="marathon">Train for a Marathon</h3>
        <img src={require('../../images/marathon1.png')} alt="marathon" />
        <p>
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
        </p>
 
       
    </div>
</div>

<div className="right_column">
    <h3>Mission</h3>
    <div className="card_one">
        <p>
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
            This is a description. This is a description. This is a description. This is a description.
        </p>
    </div>
</div>
</div>
      


{/* <div className="slideshow-container">

<div className="mySlides fade">
  <div className="numbertext">1 / 3</div>
  <img src={require('../../images/health.jpg')} alt="Docters" style={{width:'100%'}} />
  <div className="text">Caption Text</div>
</div>

<div className="mySlides fade">
  <div className="numbertext">2 / 3</div>
  <img src={require('../../images/physicaltherapy2.png')} style={{width:"100%"}} />
  <div className="text">Caption Two</div>
</div>

<div className="mySlides fade">
  <div className="numbertext">3 / 3</div>
  <img src={require('../../images/weightTraining.jpg')} alt="Personal Trainers" style={{width:'100%'}}/>
  <div className="text">Caption Three</div>
</div>

<a className="prev" onClick={plusSlides(-1)}>&#10094;</a>
<a className="next" onClick={plusSlides(1)}>&#10095;</a>

</div>
<br/>

<div style="text-align:center">
  <span className="dot" onClick={currentSlide(1)}></span> 
  <span className="dot" onClick={currentSlide(2)}></span> 
  <span className="dot" onClick={currentSlide(3)}></span> 
</div>  */}

      
      </div>
    );
  }
}



export default LandingPage;

