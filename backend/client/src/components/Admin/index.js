import React from 'react';
import axios from 'axios';
import Logo from '../../assets/logo.png';

class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : []
        }
    }

    componentDidMount(){
        let self = this;
        axios.get('http://localhost:8000/Register')
          .then(function (response) {
            let data = sessionStorage.getItem('email');
            var payload = response['data'];
            self.setState({data: payload})
          })
          .catch(function (error) {
            console.log('error',error);
          })
          .finally(function () {
              console.log("finally block executed")
          }); 
    }

    onClickHandler = (data) =>{
        sessionStorage.setItem('email', data);
        this.props.history.push('/showissue');
    }

    render(){
        const { data } = this.state;
        return(
        <div className= "adminwrapper">
            <img src = {Logo} alt="logo"></img>
            <h2>Admin</h2>
            <div className="admin">
            {data.map(item=>{return(
                <div className="mt-3 data">
                    <p>{item['name']}</p>
                    <p className="email" onClick ={()=>this.onClickHandler(item.email)}>{item['email']}</p>
                </div>
            )}
            )}
            </div>
        </div>
        )
    }
}

export default Admin;