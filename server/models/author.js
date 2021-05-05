const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
})

//We have collection "Author" and 'authorSchema' is object of type schema defined above
module.exports = mongoose.model("Author", authorSchema);