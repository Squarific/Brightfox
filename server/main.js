const express = require('express')
const app = express()
const database = {};

app.use('/plugin', require('./routes/plugin/_')(database));

app.listen(8765, '0.0.0.0', () => {
    console.log("Listening...")
});