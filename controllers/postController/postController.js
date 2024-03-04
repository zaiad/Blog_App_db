const Post = require("../../models/userModel");


const getPost = async (req, res) => {
  const post = await Post.find()
  res.json({post})
}

const addPost = async (req, res) => {
  const { body } = req;
  if (!body.title || !body.price || !body.description)
    res.status(400).json({ message: "Fill the all fields to add post" });
  const add_post = await Post.create({
    ...body,
  });
  res.json({ message: `Post ${add_post.title} is added` });
};
const updatePost = async (req, res) => {
  const {body} = req
  const id = req.params.id
  if(!id || !body.title || !body.description || !body.price ) throw Error('Fill the all fields to add post')
  const post = await Post.findOne({name: body.title})
  if (!post) throw Error("Invalid Category")
  const update_post = await Post.findByIdAndUpdate(
      id, {
          ...body,
          post: post._id
      }
  )
  if(!update_post) throw Error('Error, try again')
  res.json({message: `Post ${body.title} is updated`, update_post})
}

module.exports = {
  getPost,
  addPost,
  updatePost,
};
