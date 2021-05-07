const router = require('express').Router({ mergeParams: true });
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const SELECT_QUERY = "SELECT name, description from  `plugins` WHERE uuid = ?";
const GENERIC_DB_ERROR = {
    errors: [{
        msg: "Internal database error"
    }]
};

module.exports = (database) => {
    router.post('/', [
        body('pluginuuid').isLength({ min: 36, max: 36 })
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // TODO userid from jwt token
        database.query(UPDATE_QUERY, [req.body.name, req.body.description, req.body.uuid, req.body.useruuid], (err, result) => {
            if (err) {
                console.log("Retrieve plugin database error", err, pluginuuid, useruuid, req.body.name, req.body.description);
                return res.status(504).json(GENERIC_DB_ERROR);
            }

            return res.status(200).json({
                uuid: pluginuuid
             });
        });
    });

    return router;
};