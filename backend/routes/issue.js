const express = require('express');
const route = express.Router();
const issue = require('./schema')
route.get('/',(req,res)=>{
    issue.find({  })
    .then((resp)=>{
        res.status(200).send(resp);
    });
});

module.exports= route;