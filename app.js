const cors = require("cors");
const path = require("path");
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

console.log(process.env.NODE_ENV);
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@minhthanhfx16802.yrvcsj8.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const userRouters = require("./routers/authRouter");
const mainRouters = require("./routers/mainRouter");
const adminRouters = require("./routers/adminRouter");

app.use(userRouters);
app.use(mainRouters);
app.use("/admin", adminRouters);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));
