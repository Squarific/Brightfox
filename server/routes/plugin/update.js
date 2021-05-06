const router = require('express').Router({ mergeParams: true });
//const { body } = require('express-validator');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
 
connection.connect();

module.exports = () => {
    router.get('/', async () => {
        console.log("it works");
    });

    return router;
};