const mongoose = require("mongoose");

const User = mongoose.model(
  "Users",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      Roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        },
      ],
    },
    {
      timestamps: true, // This will add createdAt and updatedAt fields
    }
  )
);

module.exports = User;
