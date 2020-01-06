const express = require('express');
const route = express.Router();
const Register = require('../models/registerSchema')

route.post('/', (req,res)=>{
    const data = new Register(
        {   
            name:req.body.name,
            number:req.body.number,
            email:req.body.email,
            password:req.body.password
        }
    )
    console.log("hello frfndsd",data)
    data.save()
    .then((ress)=>{
        res.status(200).send(ress);
    })
    .catch(err=>{console.log('erroe',err)})
});

route.get('/',(req,resp)=>{
    Register.find()
    .then((res)=>{
        resp.send(res);
    });
});

module.exports= route;