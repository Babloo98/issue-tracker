const express = require('express');
const route = express.Router();
const Register = require('./registerSchema')

route.patch('/', (req, res)=> {
    const data = req.body;
    const payload = new Register(
        {
            email:req.body.email,
            number: req.body.number,
            password: req.body.password 
        }
    )
    Register.findOneAndUpdate({ $and: [ { email:  payload.email }, { number: payload.number } ] }, { $set: {password : payload.password} })
    .then((ress)=>{res.status(200).send(ress)});
})

module.exports = route; 