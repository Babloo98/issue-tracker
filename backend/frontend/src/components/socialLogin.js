import React from 'react';
import Logo from '../assets/logo.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import firebaseApp from '../firebase';
import firebase from 'firebase';

class Register extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            email:"",
            password: "",
            number: "",
            name: "",
            otp:""
        }
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount () {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
            'size': 'invisible',
            callback: (response) => {
                this.submitPhoneNumberAuth();
            }
            }
        );
    }

    submitPhoneNumberAuth = () =>{
        const { number } = this.state;
        const phoneNumber = `+91 ${number}`
        var appVerifier = window.recaptchaVerifier;
        firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function(confirmationResult) {
            window.confirmationResult = confirmationResult;
        })
        .catch(function(error) {
            console.log(error);
        });

        // const {  } = this.state;
        
    }

    submitPhoneNumberAuthCode = () => {
        const { otp } = this.state;
        window.confirmationResult
        .confirm(otp)
        .then(result => {
            var user = result.user;
            this.onSuccess();
        })
        .catch(function(error) {
        });
    }

    onSuccess = () =>{
        const { name,number,email,password } = this.state; 
        const phoneNumber = `+91 ${number}`
        const data = {name: name, number : phoneNumber, email : email, password : password};
        axios.post('http://localhost:8000/register',data)
        .then(res=>{
            this.props.history.push('/');
            window.location.reload();
        })
        .catch(err=>{
            console.log('eeeee',err);
        })
    }

    render(){
        return(
          <div className= "RegisterWrapper">  
          <img style= {{margin:"20px"}} src = {Logo} alt="logo"></img>
            <div style ={{marginTop:"35px"}} className="Register">
                <div className="input-fields">
                    <p>Enter Name:</p>
                    <input type="text" name="name" value = {this.state.name} onChange = {this.handleChange} className="form-control" id="input1" placeholder="Enter Name" required/>
                </div>
                <div className="input-fields">
                    <p>Enter Phone Number:</p>
                    <input type="text" name="number" value = {this.state.number} onChange = {this.handleChange} className="form-control" id="input2" placeholder="Enter Phone Number" required/>
                </div>  

                <div className="input-fields">
                    <p>Enter Email:</p>
                    <input type="email" name="email" value = {this.state.email} onChange = {this.handleChange} className="form-control" id="input3" placeholder="Enter Email" required/>
                </div>  

                <div className="input-fields">
                    <p>Enter Password:</p>
                    <input type="password" name="password" value = {this.state.password} onChange = {this.handleChange} className="form-control" id="input4" placeholder="Enter Password" required/>
                </div>  
              <button  data-toggle="modal" data-target="#exampleModalCenter" onClick = {this.submitPhoneNumberAuth} className = "btn btn-danger mt-5">Register</button>  
             
            </div>
            
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centere" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Enter Otp</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <input style = {{marginTop:"15px"}} type="otp" name="otp" value = {this.state.otp} onChange = {this.handleChange} id="input5" placeholder="Enter OTP" required/>
                    <div id="recaptcha-container"></div>
                    <button onClick = {this.submitPhoneNumberAuthCode} className = "btn btn-danger mt-5">authenticate</button>  
                    </div>
                    </div>
                </div>
            </div>
         </div>
        )
    }
}

export default Register;