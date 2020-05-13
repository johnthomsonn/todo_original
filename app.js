require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const morgan = require("morgan");
const expressValidator = require('express-validator');
const chalk = require('chalk')

//Routes
const authroute = require('./routes/authroute');
const userroute = require('./routes/userroute');
const listroute = require('./routes/listroute');
const itemroute = require('./routes/itemroute');

// Includes to help with Routes
const {getUserByUsernameParam} = require('./controllers/usercontroller')
const {getListByListName} = require('./controllers/listcontroller')

//Middleware
app.use(morgan("dev"));
app.use(express.json())
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());

// Database connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology : true
  })
  .then(() => console.log(chalk.blue("Connected to Database")));

mongoose.connection.on('error', err => {
  console.log("Database error: " + err.message);
});


//get urls and route
app.get("/", (req,res) => res.send("Home Page"));
app.use("/auth",  authroute );
app.use("/users",  userroute );
app.use("/users/:username/lists", listroute);
app.use("/users/:username/lists/:listname/items", itemroute)
//route parameters
app.param("username", getUserByUsernameParam)
app.param("listname", getListByListName)










const port = process.env.PORT;
//start the backend server
app.listen(port, () => console.log(chalk.blue(`Express server started on port ${port}`)));
