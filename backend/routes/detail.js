const express = require('express');
const route = express.Router();
const User = require('../models/schema')

route.post('/', (req,res)=>{
    const data = req.body;
    const payload = new User(
        {
            email:req.body.email,
            issue: req.body.issue
        }
    )
    User.findOne({email:req.body.email}).then(
        resp =>{
            if(resp){
                const temp = [];
                temp = [...resp.issue,...payload.issue];
                console.log(temp)
                User.findOneAndUpdate({ email: payload.email }, { $set:{issue : temp} })
                .then((ress)=>{res.status(200).send(ress)});
            }
            else{
                payload.save()
                .then((ress)=>{
                    res.status(200).send(ress);
                })
            }
        }
    )
    .catch(err=>{
        console.log("error",err)
    })
});

route.get('/',(req,resp)=>{
    User.find()
    .then((res)=>{
        resp.send(res);
    });
});

route.patch('/', (req, res)=> {
    const data = req.body;
    const payload = new User(
        {
            email:req.body.email,
            issue: req.body.issue
        }
    )
    console.log(payload.issue)
    User.findOneAndUpdate({ email: payload.email }, { $set: {issue : payload.issue} })
    .then((ress)=>{res.status(200).send(ress)});
});


module.exports = route;