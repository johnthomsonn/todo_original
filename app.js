require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(cors())


//get urls and route
app.get("/", (req,res) => res.send("Home Page"));













//start the backend server
app.listen(port, () => console.log(`Express server started on port ${port}`));
