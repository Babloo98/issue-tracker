import React from 'react';
import firebase from 'firebase';
import Logo from '../../assets/logo.png';

class Resetpassword extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            number: "",
            otp:""
        }
    }

    componentDidMount(){
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

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitPhoneNumberAuthCode = () => {
        const { otp, number } = this.state; 
        const phoneNumber = `+91 ${number}`
        window.confirmationResult
        .confirm(otp)
        .then(result => {
            var user = result.user;
             sessionStorage.setItem( 'number', phoneNumber );
             this.props.history.push('/reset');
             window.location.reload();
        })
        .catch(function(error) {
            console.log('afsdgfdsj',error);
        });
    };

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
    }

    

    render(){
        return(
            <div className="resetpasswordwrapper">
                <img style= {{margin:"20px"}} src = {Logo} alt="logo"></img>
                <div className="input-fields">
                    <p>Enter Phone Number:</p>
                    <input type="text" name="number" value = {this.state.number} onChange = {this.handleChange} className="form-control" id="input1" placeholder="Enter Phone Number" required/>
                    <button  data-toggle="modal" data-target="#exampleModalCenter" onClick = {this.submitPhoneNumberAuth} className = "btn mt-3">Reset Password</button>
                </div>
                
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centere" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Enter Otp</h5>
                        <button type="button" style = {{background: "none"}} class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <input style = {{marginTop:"15px"}} type="otp" name="otp" value = {this.state.otp} onChange = {this.handleChange} id="input5" placeholder="Enter OTP" required/>
                    <div id="recaptcha-container"></div>
                    <button onClick = {this.submitPhoneNumberAuthCode} className = "btn mt-3">authenticate</button>  
                    </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Resetpassword;