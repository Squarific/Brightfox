const router = require('express').Router({ mergeParams: true });
const { param, validationResult } = require('express-validator');
// const { v4: uuidv4 } = require('uuid');

const SELECT_QUERY = "SELECT BIN_TO_UUID(uuid) as uuid, BIN_TO_UUID(useruuid) as useruuid, name, description, creation, updatedatetime from  `plugins` WHERE uuid = UUID_TO_BIN(?)";
const GENERIC_DB_ERROR = {
    errors: [{
        msg: "Internal database error"
    }]
};

module.exports = (database) => {
    router.get('/:uuid', [
        param('uuid').isLength({ min: 36, max: 36 })
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        database.query(SELECT_QUERY, [req.params.uuid], (err, result) => {
            if (err) {
                console.log("Retrieve plugin database error", err, req.params.uuid);
                return res.status(504).json(GENERIC_DB_ERROR);
            }

            return res.status(200).json({
                plugin: result[0]
            });
        });
    });

    return router;
};
