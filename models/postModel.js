const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
  })
);

module.exports = Post;
