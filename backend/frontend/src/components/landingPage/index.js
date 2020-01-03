import React from 'react';
import Logo from '../../assets/logo.png';

class LandingPage extends React.Component {

    addNewIssue = () =>{
        this.props.history.push('/addissue');
    };

    viewIssue = () =>{
        this.props.history.push('/showissue');
    };

    render() {
        return (
                <div className="Landingpage">
                    <img style= {{margin:"20px"}} src = {Logo} alt="logo"></img>
                    <div className = "buttons">
                        <button className = "btn btn-danger" onClick = {this.addNewIssue}>Add new Issue</button>
                        <button className = "btn btn-danger" onClick = {this.viewIssue}>View Issue</button>
                    </div>
                </div>
            )
        }
    }

export default LandingPage;