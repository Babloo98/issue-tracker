const express = require('express');
const route = express.Router();
const Login = require('./loginSchema');
const Register = require('./registerSchema')

route.post('/', (req,res)=>{
    const data = new Login(
        {
            email:req.body.email,
            password:req.body.password
        }
    )
    Register.findOne({email:req.body.email, password: req.body.password}).then(
        ress=>{ress ? res.send({login : 'Success', email: req.body.email}):res.send({login : 'Failure'})}
    )
    .catch(err=>console.log(err))
});

route.get('/',(req,resp)=>{
    Login.find()
    .then((res)=>{
        resp.send(res);
    });
});

module.exports= route;