const router = require('express').Router({ mergeParams: true });
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync('${ WORKSPACE }jwtsignkey.key');




const SELECT_QUERY = "SELECT BIN_TO_UUID(uuid) as uuid, BIN_TO_UUID(useruuid) as useruuid, name, description, creation, updatedatetime from  `plugins` WHERE useruuid = UUID_TO_BIN(?)";
const GENERIC_DB_ERROR = {
    errors: [{
        msg: "Internal database error"
    }]
};

module.exports = (database) => {
    router.get('/', [
        body('bearer'),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let useruuid
        try {
            useruuid = jwt.verify(req.body.bearer, privateKey)
        } catch (error) {
            return res.status(401).json({ msg: "jwt decode failed" }); w
        }

        database.query(SELECT_QUERY, [useruuid.uuid], (err, result) => {
            if (err) {
                console.log("Retrieve plugin database error", err);
                return res.status(504).json(GENERIC_DB_ERROR);
            }

            return res.status(200).json({
                plugins: result
            });
        });
    });

    return router;
};
