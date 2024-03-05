const Post = require("../../models/postModel");

const getPost = async (req, res) => {
  const post = await Post.find();
  res.json({ post });
};

const addPost = async (req, res) => {
  const { body } = req;
  if (!body.title || !body.price || !body.description)
    res.status(400).json({ message: "Fill the all fields to add post" });
  const add_post = await Post.create({
    title: body.title,
    price: body.price,
    description: body.description,
  });
  res.json({ message: `Post ${add_post.title} is added` });
};

const updatePost = async (req, res) => {
  const { body } = req;
  const id = req.params.id;
  if (!id || !body.title || !body.description || !body.price)
    throw Error("Fill the all fields to update post");
  const post = await Post.findOne({ name: body.title });
  // if (!post) throw Error("Invalid Post");
  const update_post = await Post.findByIdAndUpdate(id, {
    ...body,
  });
  if (!update_post) throw Error("Error, try again");
  res.json({ message: `Post ${body.title} is updated`, update_post });
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const find_post = await Post.findById(id);
    if (!find_post) {
      return res.status(404).json({ message: "Error, Product not found" });
    }
    // await find_post.remove();
    // res.json({ message: `Post with id ${id} is deleted` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getPost,
  addPost,
  updatePost,
  deletePost,
};
