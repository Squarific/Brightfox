const express = require('express')
const app = express()

var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'example.org',
  user            : 'bob',
  password        : 'secret',
  database        : 'my_db'
});

app.use(express.json());

app.use('/plugin', require('./routes/plugin/_')(pool));

app.listen(8765, '0.0.0.0', () => {
    console.log("Listening...")
});