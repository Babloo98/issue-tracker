var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// var userSchema = new Schema({
//   name: String,
//   phone: String,
//   email: String,
//   address: String,
// });

var issueSchema = new Schema({
    phone: String,
    type: String,
})

// module.exports = mongoose.model("userSchema",userSchema);
module.exports = mongoose.model("issueSchema",issueSchema);