const express = require('express');
const route = express.Router();
const issue = require('./schema/issueSchema')
route.get('/',(req,res)=>{
    issue.find({ phone:req.body.phone })
    .then((res)=>{
        res.status(200).send(res);
    });
});

module.exports= route;