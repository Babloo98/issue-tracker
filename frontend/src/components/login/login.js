import React from 'react';
import Logo from '../../assets/logo.png';
import axios from 'axios';
import Swal from 'sweetalert2'

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email:"",
            Password: "",
        }
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClick = (e) =>{
        const self = this;
        e.preventDefault();
        const { email, password} = self.state;
        axios.post('http://localhost:8000/login', {
            email: email,
            password: password
          })
          .then(function (response) {
            console.log(response.data['email'])
              if(response.data['login']==='Success'){
                    if(response.data['email'].includes('@archsystem.in')){
                        sessionStorage.setItem('email',self.state.email);
                        sessionStorage.setItem('isAdmin',true);
                        self.props.history.push("/admin");
                    }
                    else{
                    sessionStorage.setItem('email',self.state.email);
                    sessionStorage.setItem('isAuthenticated',true);
                    self.props.history.push("/landingpage");
                    }
              }
              else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                  })
              }
          })
          .catch(function (error) {
            console.log(error)
          });
    }

    register = () =>{
        this.props.history.push("/Register");
    };

    reset = () =>{
        this.props.history.push("/resetpassword");
    };


    render() {
        return (
            <div className="login-container">
                <img style= {{margin:"20px"}} src = {Logo} alt="logo"></img>
                <div className="login">
                    <form>
                        <div className="input-group align-item-center input-fields">
                            <div className="input-fields">
                            <p>Enter Email:</p>
                                <input type="email" name="email" value = {this.state.email} onChange = {this.handleChange} className="form-control" id="input1" placeholder="Enter your id here!!" required/>
                            </div>
                            <div className="input-fields">
                                <p>Enter Password:</p>
                                <input type="password" name="password" value = {this.state.password} onChange = {this.handleChange} className="form-control" id="input2" placeholder="Enter Password here!!" required/>
                            </div>  
                            <div className="input-fields">
                                <button onClick={this.handleClick} className="btn btn-danger pr-5 pl-5">Login</button>
                            </div>                     
                        </div>
                    </form>
                </div>
            <span className = "register mr-3" onClick = {this.register} >Register</span>
            <span className = "register ml-3" onClick = {this.reset} >Forget Password</span>
            </div>
            )
            }
        }
        
export default Login;