import React from 'react';
import Logo from '../../assets/logo.png';
import axios from 'axios';
import Swal from 'sweetalert2'

class Addissue extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          issues : ['Glass Broken', 'Handle Broken', 'Mesh Bursting', 'Alignment out', 'Locking issues'],
          issue : [],
          checkeditem: []
        }
    }

    componentDidMount(){
        let self = this;
        axios.get('http://localhost:8000/detail')
          .then(function (response) {
            let data = sessionStorage.getItem('email');
            response.data.map(item=>{
                if(item['email'] === data){      
                    self.setState({
                        checkedItem: item['issue']
                    })
                }
            })
            
          })
          .catch(function (error) {
            console.log('error',error);
          })
          .finally(function () {
          }); 
    }

    onSelectHandler = (e,data) => {
        this.setState({
            [data]: !this.state[data]
        },()=>{this.createindex(data,this.state[data])});
      };

      createindex = (data,value) =>{
        let { issue } = this.state;
        if(value){
            issue.push(data);
            issue = [...new Set(issue)];
        }
        else{
            var index = issue.indexOf(data);
            if (index !== -1) issue.splice(index, 1);
            issue = [...new Set(issue)];
        }
    };

    addIssue = () =>{
        const {issue} = this.state;
        let email = sessionStorage.getItem('email');
        const data = {issue: issue, email: email};
        axios.post('http://localhost:8000/detail',data)
          .then(res=>{
              Swal.fire(
                'Issue Addded!',
                'You Issue has been recorded',
                'success'
              )
          })
          .catch(err=>{
              console.log('eeeee',err);
          })
    }

    render(){
        return(
            <div className = "addissueWrapper">
                <img style= {{margin:"20px"}} src = {Logo} alt="logo"></img>
                <div className = "addissue">
                    {
                    this.state.issues.map(element => {
                        return(
                            <div class="custom-control custom-checkbox checkboxwrapper">
                                {
                                this.state.checkedItem
                                ?    
                                this.state.checkedItem.includes(element)
                                    ?
                                        <div>
                                            <input checked = {true} class="custom-control-input" id={element} onClick={(e, data) => this.onSelectHandler(e,element)} type="checkbox"/>
                                            <label class="custom-control-label" for={element}>{element}</label>
                                        </div>
                                    :
                                        <div>
                                            <input class="custom-control-input" id={element} onClick={(e, data) => this.onSelectHandler(e,element)} type="checkbox"/>
                                            <label class="custom-control-label" for={element}>{element}</label>
                                        </div>
                                :
                                <div>
                                            <input class="custom-control-input" id={element} onClick={(e, data) => this.onSelectHandler(e,element)} type="checkbox"/>
                                            <label class="custom-control-label" for={element}>{element}</label>
                                </div>
                                }
                            </div>
                        )
                        })
                    }
                    <button onClick = {this.addIssue} className="btn btn-danger mt-3">Add Issues</button>
                </div>
            </div>
        )
    }
}

export default Addissue;