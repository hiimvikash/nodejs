const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose"); // 1

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/restAPI"); // 2

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

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const log = `\n${Date.now()}  ${req.method} @ ${req.path}\n`;
  fs.appendFile("log.txt", log, () => {
    console.log("log generated");
  });
  next();
});

app.get("/users", async (req, res) => {
  const alldbusers = await User.find({});
  const html = `
    <ul>
        ${alldbusers
          .map((user) => `<li>${user.first_name} - ${user.email} </li>`)
          .join("")}
    </ul>
    `;
  res.send(html);
});

// REST API
app.get("/api/users", async (req, res) => {
  const alldbusers = await User.find({});
  res.json(alldbusers);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  console.log(body); // data received from frontend.

  const result = await User.create({ ...body });
  console.log("result", result);
  return res.status(201).json({ msg: "success" });
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const result = await User.findById(req.params.id);
    res.json(result);
  })
  .patch(async (req, res) => {
    // edit user with id
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id, { ...body });
    res.json({ msg: "success" });
  })
  .delete(async (req, res) => {
    // delete user with id
    const body = req.body;
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "success" });
  });

app.listen(8000, () => console.log("Server Started"));
