const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connection to MongoDB
mongoose.connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => console.log(err));


// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use(require("./routes/index"));
app.use(require("./routes/studentTickets"));
app.use(require("./routes/facultyTickets"));
app.use(require("./routes/Evaluations"));



// 404 middleware
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});
