require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const morgan = require("morgan");
const expressValidator = require('express-validator');

const authroute = require('./routes/authroute');
const userroute = require('./routes/userroute');

app.use(morgan("dev"));
app.use(express.json())
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());

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
app.use("/users",  authroute );
app.use("/users",  userroute );











const port = process.env.PORT;
//start the backend server
app.listen(port, () => console.log(`Express server started on port ${port}`));
