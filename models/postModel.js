const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
  })
);

module.exports = Post;
