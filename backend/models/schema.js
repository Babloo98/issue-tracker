var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  issue: Array,
});

module.exports = mongoose.model("userSchema",userSchema);