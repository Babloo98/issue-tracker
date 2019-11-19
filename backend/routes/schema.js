var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  phone: integer,
  email: String,
  address: String,
  id:ObjectId,
});

var issueSchema = new Schema({
    id: ObjectId,
    phone: integer,
    type: String,
})