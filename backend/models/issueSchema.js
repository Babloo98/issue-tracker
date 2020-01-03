var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueSchema = new Schema({
    phone: String,
    type: String,
});


module.exports = mongoose.model("issueSchema",issueSchema);
