require("express-async-errors");
require("dotenv").config();
const mongoose = require("mongoose");
let DB_URL = `mongodb+srv://mark:mark123@cluster0.aezcg.mongodb.net/myFirstDatabase?retryWrites=true`


const express = require("express");
const app = express();
// const connection = require("./db");
const cors = require("cors");
const port = 8080;

app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));

const connection = async function connection() {
  try {
    await mongoose.connect(
      DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: true,
      },
      (error) => {
        if (error) return new Error("Failed to connect to database");
        console.log("connected..");
      }
    );
  } catch (error) {
    console.log(error);
  }
};


(async function db() {
  await connection();
})();

app.use(cors());
app.use(express.json());

// API routes
app.use("/", require("./routes/main.route"));

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log("Listening to Port ", port);
});

module.exports = app;
