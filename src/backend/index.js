



// const functions = require('firebase-functions');
// const express = require('express');
// const cors = require('cors');
// const app = express();

// // Enable CORS
// app.use(cors({ origin: true }));

// // Your routes
// app.post('/signup', (req, res) => {
//   res.send('Signup working');
// });

// app.post('/login', (req, res) => {
//   res.send('Login working');
// });

// // Export to Firebase
// exports.api = functions.https.onRequest(app);







const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://your-mongo-uri", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error", err));

app.post("/signup", (req, res) => {
  res.send("Signup works!");
});

exports.backend = functions.https.onRequest(app);
