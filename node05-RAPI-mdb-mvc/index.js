const express = require("express");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoute')

mongoose.connect("mongodb://127.0.0.1:27017/restAPI"); // 2

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const log = `\n${Date.now()}  ${req.method} @ ${req.path}\n`;
  fs.appendFile("log.txt", log, () => {
    console.log("log generated");
  });
  next();
});


app.use('/user', userRouter);
app.listen(8000, () => console.log("Server Started"));
