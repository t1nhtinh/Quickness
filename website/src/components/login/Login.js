import React from 'react';
import {Link} from 'react-router-dom';
import fire from '../../config/fire';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

class Login extends React.Component {
    
    constructor(){
        super();
        
        this.state = {
            email: '',
            password: '',
            user: null,
            companyPassword: '',
            storeNumber: '',
            userId: null,
            storeFailed: false,
            loginFailed: false,
        };

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.goBack = this.goBack.bind(this);      
        this.submitCredentials = this.submitCredentials.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
    }
    
    componentDidMount(){
        this.authListener();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{ 
            var userId = fire.auth().currentUser.uid;
            this.setState({
                userId: userId,
                loginFailed: false
            })     

        }).catch((error) => {
            this.setState({
                loginFailed: true
            })
            console.log(error);
        });
    }
    
    signup(e){
        e.preventDefault();
        if(this.state.email && this.state.password){
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
                var userId = fire.auth().currentUser.uid;
                let user = fire.auth().currentUser; 
                fire.database().ref( 'users' + '/' + userId).set({
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                    emailVerified: user.emailVerified,
                    userId: userId,
                    companyVerified: false
                });

                this.setState({
                    userId: userId,
                    loginFailed: false,
                    userId: userId
                });

            }).then((u)=>{console.log(u)})
            .catch((error) => {
                this.setState({
                    loginFailed: true
                })
                console.log(error);
            })
        }
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
          console.log(user);
          if (user) {
            this.setState({ user, userId: user.uid });
            
          } else {
            this.setState({ user: null });
          }
        });
    }

    goBack(e){
        e.preventDefault();

        fire.auth().signOut();      
        this.setState({
            user: null, 
            email: '', 
            password: '', 
            storeNumber: '', 
            companyPassword: '',
            userId: '',
            storeFailed: false
        });
    }

    submitCredentials(e){
        e.preventDefault();

        var storeFailed = this.state.storeFailed; 
        // console.log(this.state.storeNumber);
        // console.log(this.state.companyPassword);

        if(this.state.storeNumber == 101 && this.state.companyPassword == "sandiego"){           
            this.updateUserData(this.state.userId, "companyVerified", "true");  
            this.updateUserData(this.state.userId, "store", this.state.storeNumber);  
            storeFailed = false;         
            // console.log("Checking...");
                 
        }
        else{
            storeFailed = true; 
        }
        
        this.setState({
            storeNumber: '', 
            companyPassword: '',
            storeFailed: storeFailed
        });
    }

    updateUserData(userId, key, value){  
        if(userId){     
            let userRef = fire.database().ref( 'users/' + userId + '/');       
            userRef.update({
            [key]: value
            });
        }
    }


    render() {  
        return (
            <div className="login-wrapper">         
                <div className="col-md-6 login-container">

                    <form className="login-form">
                        <label> 
                           <p className="form-text text-muted"> Welcome to </p> 
                           
                           <h1>Quickness </h1>

                           <p className="form-text text-muted">Manage Long Lines. Optimize your business. Minimize wait times. </p> 


                        </label>
                        {!this.state.user ? 
                        <div >
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div  className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                                {this.state.loginFailed ? <p><small> ***The email or password in invalid. Please try again.</small></p>: null}
                                
                        </div>
                        : <div > 
                            <div  className="form-group">
                                <label htmlFor="storeNumber">Store Number</label>
                                <input value={this.state.storeNumber} onChange={this.handleChange} type="number" name="storeNumber" className="form-control" id="storeNumber" placeholder="Select..." />
                                
                            </div>
                            <div className="form-group">
                                <label htmlFor="companyPassCode">Company Code</label>
                                <input value={this.state.companyPassword} onChange={this.handleChange} type="password" name="companyPassword" className="form-control" id="companyPassword" placeholder="passcode" />
                            </div>
                            {this.state.storeFailed ? <p><small> ***The store number or passcode is invalid. Please try again.</small></p>: null}
                           
                        </div>
                        }

                        {!this.state.user ? <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
                        : <button onClick={this.submitCredentials} className="btn btn-primary">Submit</button>}
                        <br></br>
                        {!this.state.user ? <button onClick={this.signup} className="btn btn-success">Signup</button>
                        : <button onClick={this.goBack} className="btn btn-danger">Go Back</button>}

                    </form>
                </div>
                
            </div>
        );
    }
}

export default Login;

