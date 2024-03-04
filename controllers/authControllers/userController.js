const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const saltRounds = 10;

const register = async (req, res) => {
  const { body } = req;

  try {
    if (
      !body.username ||
      !body.email ||
      !body.password ||
      !body.confirm_password
    ) {
      return res.status(400).json({ message: "Fill all fields to register" });
    }

    if (body.password != body.confirm_password) {
      return res.status(400).json({ message: "Not same password, Try again" });
    }

    const existingEmail = await User.findOne({ email: body.email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(String(body.password), saltRounds);
    const user = await User.create({
      username: body.username,
      email: body.email,
      password: hashPassword,
    });

    if (!user) {
      throw Error("User not created, try again");
    }

    res.status(201).json({
      message: "Registration successful",
      email: body.email,
      password: hashPassword,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all fields to login" });
    }
    const login_user = await User.findOne({ email: email });
    // console.log("paassswwwooorrdd", login_user.password, password);
    if (
      !login_user ||
      !(await bcrypt.compare(String(password), login_user.password))
    ) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    const token = await jwt.sign(
      { _id: login_user._id },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" } 
    );
    res.json({
      message: "Login success",
      _id: login_user._id,
      username: login_user.username,
      email: login_user.email,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "server not working" });
  }
};


const logout = async(req, res) => {

}

module.exports = {
  register,
  login,
  logout
};
