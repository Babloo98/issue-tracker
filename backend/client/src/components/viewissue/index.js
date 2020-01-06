import React from 'react';
import Logo from '../../assets/logo.png';
import axios from 'axios';
import Swal from 'sweetalert2'

class Viewissue extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            dataToShow: {},
            issue: [],
        }
    }

    componentDidMount(){
        let self = this;
        axios.get('https://arch-system.herokuapp.com/detail')
          .then(function (response) {
            let data = sessionStorage.getItem('email');
            response.data.map(item=>{
                if(item['email'] === data){
                    self.setState({
                        dataToShow: item
                    })
                }
            })
          })
          .catch(function (error) {
            console.log('error',error);
          })
          .finally(function () {
              console.log("finally block executed");
          }); 
    }

    onClickHandler = () =>{
        this.props.history.push("/addissue");
    }
    
    closehandler = (data) =>{
        const { dataToShow } = this.state;
        let issue = [];
        dataToShow['issue'].splice( dataToShow['issue'].indexOf(data), 1 );
        issue = dataToShow['issue']
        let email = sessionStorage.getItem('email');
        axios
        .patch('https://arch-system.herokuapp.com/detail', {
            email: email,
            issue: issue,
         })
        .then(res => {
        window.location.reload();
     })
        .catch(err => console.log(err));
     }

    render(){
       const { dataToShow } = this.state;
       const data = dataToShow['issue'];
        return(
            <div className = "viewissueWrapper">
                <img style= {{margin:"20px"}} src = {Logo} alt="logo"></img>
                <div className = "viewissue">
                    <h3>Locked Issue</h3>
                    <div>
                        {data ? (data.map(item=>{return(
                            <div className= "issues">
                                <span>{item}</span>
                                <span style= {{marginLeft:"20px"}} className= "close-button" onClick={()=>this.closehandler(item)}>&#x274C;</span>
                            </div>
                        )}))
                        :null }
                    </div>
                <button className = "btn btn-danger mt-3" onClick={this.onClickHandler}>Add new issue</button>
            </div>
            </div>
        )
    }
}

export default Viewissue;