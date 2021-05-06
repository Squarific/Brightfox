const router = require('express').Router({ mergeParams: true });
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const INSERT_QUERY = "INSERT INTO `plugins` (uuid, useruuid, name, description) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?)";

module.exports = (database) => {
    router.post('/', [
        body('name').isLength({ min: 3, max: 255 }),
        body('description')
    ], async () => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // TODO userid from jwt token
        const pluginuuid = uuidv4();
        const useruuid = uuidv4();
        database.query(INSERT_QUERY, [pluginuuid, useruuid, req.body.name, req.body.description], (err, result) => {
            return res.status(200).json({ 
                uuid: pluginuuid
             });
        });
    });

    return router;
};