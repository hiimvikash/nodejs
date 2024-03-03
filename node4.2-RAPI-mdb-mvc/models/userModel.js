const mongoose = require("mongoose"); // 1

const userSchema = new mongoose.Schema(
    {
      first_name: {
        type: String,
        require: true,
      },
      last_name: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: [true, "email already exists"],
      },
      gender: {
        type: String,
      },
      job_title: {
        type: String,
      },
    },
    { timestamps: true }
  ); // 3
  
  const User = mongoose.model("user", userSchema); // 4 till here you will you made a DB : "restAPI" with a collection : "users"

  module.exports = User;
  