var express = require('express');
const cors=require("cors");
require('dotenv').config();
var cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5050;

//connecting mongoose
const db = require('./mongoConnection');
db();

var authRouter = require('./routes/auth');
var recentRouter = require('./routes/recent');
var shareRouter = require('./routes/shareUser');

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/recent', recentRouter);
app.use('/share', shareRouter);

app.listen(PORT, ()=>{
  console.log("Server listening",PORT);
})

app.get('/', function(req, res, next) {
  res.send('API is running');
});

module.exports = app;
