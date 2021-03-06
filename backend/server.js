const express = require('express');
const login = require('./routes/login');
const issue = require('./routes/issue.js');
const reset = require('./routes/reset.js');
const register = require('./routes/register.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const detail = require('./routes/detail');
const path = require("path");


const PORT = 8000;
const app = express();


//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    next();
  });



// const connectDB = async () => {
//   try {
//     await mongoose.connect(db, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true
//     });
//     console.log("MongoDB is Connected...");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };
mongoose.connect('mongodb://root:test123@ds259878.mlab.com:59878/heroku_7n8llkgd');

app.use('/login',login);
app.use('/issue',issue);
app.use('/detail',detail);
app.use('/register',register);
app.use('/reset',reset);

app.use(express.static(path.join(__dirname, "client", "build")))


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen((process.env.PORT || PORT),()=>{
    console.log("App is running on http://localhost:8000");
})









