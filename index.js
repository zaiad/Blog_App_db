const express = require("express");
require("dotenv").config();

require("./config/db");
require("./models/userModel");
require("./models/postModel");
const app = express();

const userRoutes = require("./routes/userRouter");
const postRoutes = require("./routes/postRouter");

app.use(express.json());

app.use("/", userRoutes);
app.use("/", postRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
