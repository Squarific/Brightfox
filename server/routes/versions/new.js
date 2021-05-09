const router = require('express').Router({ mergeParams: true });
const { body, param, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const INSERT_QUERY = "INSERT INTO `versions` (pluginuuid, major, minor, patch, releasenotes) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?)";
const GENERIC_DB_ERROR = {
    errors: [{
        msg: "Internal database error"
    }]
};

module.exports = (database) => {
    router.post('/:pluginUuid', [
        param('pluginUuid').isLength({ min: 36, max: 36 }),
        body('releasenotes').isLength({ min: 3, max: 255 }),
        body('major'),
        body('minor'),
        body('patch')
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        database.query(INSERT_QUERY, [req.param.pluginUuid, req.body.major, req.body.minor, req.body.patch, req.body.releasenotes], (err, result) => {
            if (err) {
                console.log("New plugin database error", err, pluginuuid);
                return res.status(504).json(GENERIC_DB_ERROR);
            }

        });

        return res.status(200).json({
            uuid: req.param.pluginUuid
        });
    });

    return router;
};
