const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // Allow requests from http://localhost:3000
  })
);
const mongourl =
  "mongodb+srv://nabilelhady73:NLAswc123@cluster0.yenrrik.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongourl);
app.get("/test", (req, res) => {
  res.status(200).json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 12),
  });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });
  if (user) {
    const passOk = await bcrypt.compare(password, user.password);
    if (passOk) {
      jwt.sign(
        { email: user.email, id: user._id },
        "hi iam a secret",
        {},

        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token)
            .cookie("id", user.id)
            .json({ id: user._id, message: "ok" });
          console.log(token);
        }
      );
    } else {
      res.json("email or password wrong");
    }
  } else {
    res.json({ message: "not found" });
  }
});
app.listen(3001);
