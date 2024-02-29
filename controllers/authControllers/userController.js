const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrybt = require("bcryptjs");
const saltRounds = 10;

const register = async (req, res) => {
  const { body } = req;
  if (!body.username || !body.email || !body.password) {
    return res.status(400).json({ message: "Fill all fields to register" });
  }
  const findEmail = await User.findOne({ email: body.email });
  if (findEmail) res.status(400).json({ message: "Email already exists" });
  const hashPassword = await bcrybt.hash(String(body.password), saltRounds);
  const user = await User.create({
    username: body.username,
    email: body.email,
    password: hashPassword,
  });
  if (!user) {
    return res.status(500).json({ message: error.message });
  }
  // try {
  // if (user) {
  //   res.status(201).json({
  //     message: "Successfully",
  //     email: body.email,
  //     password: hashPassword,
  //   });
  // }
  // if(!user)
  // } catch (error) {
  // }
};

module.exports = {
  register,
};
