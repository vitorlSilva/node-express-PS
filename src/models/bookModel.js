var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false },
});

const Book = mongoose.model("Book", bookModel);

module.exports = Book;
