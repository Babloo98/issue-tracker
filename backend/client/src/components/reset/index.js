import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import Swal from 'sweetalert2';
import Logo from '../../assets/logo.png';


class Reset extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password:""
        }
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    onClickHandler = () =>{
        const self = this;
        const { email, password } = this.state;
        const number = sessionStorage.getItem('number');
        axios.patch('https://arch-system.herokuapp.com/reset', {
            email: email,
            password: password,
            number: number
          })
          .then(function (response) {
            Swal.fire({
                title: 'Reset',
                text: "Password Successfully reset",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, login!!'
              }).then((result) => {
                if (result.value) {
                    self.props.history.push("/")
                }
              })
              
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render(){
        return(
            <div className="resetpasswordwrapper">
                <img style= {{margin:"20px"}} src = {Logo} alt="logo"></img>
                <div className="input-fields">
                    <p>Enter Email:</p>
                    <input type="email" name="email" value = {this.state.email} onChange = {this.handleChange} className="form-control" id="input1" placeholder="Enter Email" required/>
                    <p>Enter new password</p>
                    <input type="password" name="password" value = {this.state.password} onChange = {this.handleChange} className="form-control" id="input2" placeholder="Enter Password" required/>
                    <button onClick = {this.onClickHandler} className = "btn btn-danger mt-5">Reset Password</button>
                </div>
            </div>
        )
    }
}

export default Reset;