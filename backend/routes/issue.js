const express = require('express');
const route = express.Router();
const issue = require('./schema')
route.get('/',(req,res)=>{
    console.log("rrrrrrrrr",req.body);
    issue.find()
    .then((resp)=>{
        res.send(resp);
    });
});

route.post('/',(req,res)=>{
    console.log("oooo",req.body);
    var data= new issue({type: "Glass Broken", phone: "99999999"});
    data.save()
    .then((ress)=>{
        console.log(ress);
        res.status(200).send(ress);
    })
});

module.exports= route;