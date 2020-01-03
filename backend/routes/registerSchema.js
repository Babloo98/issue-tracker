var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var registerSchema = new Schema({
    name: String,
    number: String,
    email: String,
    password: String,
});


module.exports = mongoose.model("registerSchema",registerSchema);
