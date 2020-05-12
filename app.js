require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT;
const app = express();
const mongoose = require('mongoose')

app.use(bodyParser.json());
app.use(cors())

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology : true
  })
  .then(() => console.log("Connected to Database"));

mongoose.connection.on('error', err => {
  console.log("Database error: " + err.message);
});


//get urls and route
app.get("/", (req,res) => res.send("Home Page"));













//start the backend server
app.listen(port, () => console.log(`Express server started on port ${port}`));
