import React from 'react';
import './App.css';
import Login from '../src/components/login/login';
import LandingPage from '../src/components/landingPage/index';
import Addissue from '../src/components/addIssue/index';
import Viewissue from '../src/components/viewissue/index';
import Register from '../src/components/socialLogin';
import Admin from '../src/components/Admin/index';
import Resetpassword from '../src/components/resetpassword/index'
import Reset from '../src/components/reset/index'
import './main.css';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <PrivateRoute exact path = "/landingpage" component = {LandingPage}/>
        <Route exact path = "/" component = {Login}/>
        <PrivateRoute exact path = "/Register" component = {Register}/>
        <PrivateRoute exact path = "/addissue" component = {Addissue}/>
        <PrivateRoute exact path = "/showissue" component = {Viewissue}/>
        <AdminRoute exact path = "/admin" component = {Admin}/>
        <Route exact path = "/resetpassword" component = {Resetpassword}/>
        <Route exact path = "/reset" component = {Reset}/>
      </Router>
    </div>
  );
}

export default App;


const PrivateRoute = ({component: Component, ...props}) => (
  <Route {...props} render={props => (
    sessionStorage.getItem('isAuthenticated')
    ? (
       <Component {...props} />
    )
    : (<Redirect to={{ pathname: '/', state: { from: props.location} }} />)
  )} />
);

const AdminRoute = ({component: Component, ...props}) => (
  <Route {...props} render={props => (
    sessionStorage.getItem('isAdmin')
    ? (
       <Component {...props} />
    )
    : (<Redirect to={{ pathname: '/', state: { from: props.location} }} />)
  )} />
);