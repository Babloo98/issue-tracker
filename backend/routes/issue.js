const express = require('express');
const route = express.Router();
const Issue = require('./issueSchema');

route.get('/',(req,res)=>{
    Issue.find()
    .then((resp)=>{
        res.send(resp);
    });
});

route.post('/',(req,res)=>{
    const data = req.body;
    const payload = data.issue.map((item,id)=>{
        return {
            type: item,
            phone:data.phone
        }
    })
    console.log(payload);
    var d = issue.insertMany( [...payload] )
    .then((ress)=>{
        res.status(200).send(ress);
    })
});

module.exports= route;