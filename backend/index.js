const express = require('express');
const login = require('./routes/login');
const issue = require('./routes/issue.js');
const mongoose = require('mongoose');

const PORT = 8000;
const app = express();



mongoose.connect(`mongodb://localhost/issue_tracker`);


// app.use('/login',login);

app.use('/issue',issue);

app.listen(PORT,()=>{
    console.log("App is running on http://localhost:8000");
})