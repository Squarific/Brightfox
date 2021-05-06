const router = require('express').Router({ mergeParams: true });
//const { body } = require('express-validator');

module.exports = () => {
    router.get('/', async () => {
        console.log("it works");
    });

    return router;
};