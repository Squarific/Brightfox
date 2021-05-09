const router = require('express').Router({ mergeParams: true });
const { body, param, validationResult, check } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const SELECT_QUERY_LATEST_VERSION = `
    SELECT major, minor, patch from  versions 
    WHERE pluginuuid = UUID_TO_BIN(?) 
    ORDER BY major DESC, minor DESC, patch DESC 
    LIMIT 1
    ;`;
const INSERT_QUERY = "INSERT INTO `versions` (pluginuuid, major, minor, patch, releasenotes, source) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?)";
const GENERIC_DB_ERROR = {
    errors: [{
        msg: "Internal database error"
    }]
};

module.exports = (database) => {
    router.post('/:pluginuuid', [
        param('pluginuuid').isLength({ min: 36, max: 36 }),
        body('releasenotes').isLength({ min: 3, max: 255 }),
        body('source'),
        check('version')
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        database.query(SELECT_QUERY_LATEST_VERSION, [req.params.pluginuuid], (err, result) => {
            if (err) {
                console.log("Find pluginversion database error", err, req.params.pluginuuid);
                return res.status(504).json(GENERIC_DB_ERROR);
            }
            newVersion(result)
        })

        function newVersion(versionData) {
            newVersion = updateVersion(versionData, req.body.version)
            database.query(INSERT_QUERY, [req.params.pluginuuid, newVersion.major, newVersion.minor, newVersion.patch, req.body.releasenotes, req.body.source], (err, result) => {
                if (err) {
                    console.log("New plugin database error", err, req.params.pluginuuid);
                    return res.status(504).json(GENERIC_DB_ERROR);
                }
                return res.status(200).json({
                    newversion: `${newVersion.major}.${newVersion.minor}.${newVersion.patch}`
                });
            });
        }

        function updateVersion(versionData, requestVersion) {
            // TODO trow error if versions < 255
            let { major, minor, patch } = { ...versionData[0] }
            switch (requestVersion) {
                case "major":
                    major++
                    minor = 0
                    patch = 0
                    break;
                case "minor":
                    minor++
                    patch = 0
                    break;
                case "patch":
                    patch++
                    break;
            }
            return { major, minor, patch };

        }
    });

    return router;
};
