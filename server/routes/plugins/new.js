const router = require('express').Router({ mergeParams: true });
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const INSERT_QUERY_PLUGIN = "INSERT INTO `plugins` (uuid, useruuid, name, description) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?)";
const INSERT_QUERY_VERSION = "INSERT INTO `versions` (pluginuuid, major, minor, patch, releasenotes, source) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?)";
const GENERIC_DB_ERROR = {
    errors: [{
        msg: "Internal database error"
    }]
};

module.exports = (database) => {
    router.post('/', [
        body('name').isLength({ min: 3, max: 255 }),
        body('description'),
        body('releasenotes').optional({ nullable: true, checkFalsy: true }),
        body('source')
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // TODO userid from jwt token
        const pluginuuid = uuidv4();
        const useruuid = uuidv4();
        database.query(INSERT_QUERY_PLUGIN, [pluginuuid, useruuid, req.body.name, req.body.description], (err, result) => {
            if (err) {
                console.log("New plugin database error", err, pluginuuid, useruuid, req.body.name, req.body.description);
                return res.status(504).json(GENERIC_DB_ERROR);
            }
        });
        let realeasenotes = "inital release"
        if (req.body.realeasenotes) {
            releasenotes = req.body.realeasenotes
        }
        database.query(INSERT_QUERY_VERSION, [pluginuuid, 0, 0, 1, realeasenotes, req.body.source], (err, result) => {
            if (err) {
                console.log("New plugin database error", err, pluginuuid);
                return res.status(504).json(GENERIC_DB_ERROR);
            }
            return res.status(200).json({
                uuid: pluginuuid
            });
        });

    });

    return router;
};
