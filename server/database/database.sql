CREATE TABLE IF NOT EXISTS `plugins` (
    uuid VARCHAR(36),
    name VARCHAR(255),
    useruuid VARCHAR(36),
    creation datetime DEFAULT CURRENT_TIMESTAMP,
    updatedatetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description TEXT,
    PRIMARY KEY(uuid),
    INDEX(name),
    INDEX(useruuid),
    INDEX(creation),
    INDEX(updatedatetime)
);

CREATE TABLE IF NOT EXISTS `versions` (
    pluginuuid VARCHAR(36),
    major TINYINT UNSIGNED,
    minor TINYINT UNSIGNED,
    patch TINYINT UNSIGNED,
    releasenotes TEXT,
    creation datetime DEFAULT CURRENT_TIMESTAMP,
    updatedatetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX(pluginuuid),
    INDEX(updatedatetime),
    INDEX(major, minor, patch),
    INDEX(creation)
);
