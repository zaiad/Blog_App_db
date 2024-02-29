const express = require("express");
require("dotenv").config();
const cors = require("cors");

require("./config/db");
require("./models/userModel");
require("./models/postModel");
const app = express();

const userRoutes = require("./routes/userRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
