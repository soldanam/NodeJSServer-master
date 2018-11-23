var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
ID: String,
PASSWORD: String,
});

module.exports=mongoose.model('book',bookSchema);