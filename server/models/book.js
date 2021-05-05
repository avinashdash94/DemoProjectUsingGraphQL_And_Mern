const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

//We have collection "Book" and 'bookSchema' is object of type schema defined above
module.exports = mongoose.model("Book", bookSchema);