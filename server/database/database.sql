CREATE DATABASE `pluginmods`;
USE `pluginmods`;

CREATE TABLE IF NOT EXISTS `plugins` (
    uuid binary(16),
    useruuid binary(16),

    name VARCHAR(255),
    description TEXT,

    verified BOOLEAN DEFAULT FALSE,

    creation datetime DEFAULT CURRENT_TIMESTAMP,
    updatedatetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY(uuid),
    INDEX(name),
    INDEX(useruuid),
    INDEX(verified),
    INDEX(creation),
    INDEX(updatedatetime)
);

CREATE TABLE IF NOT EXISTS `versions` (
    pluginuuid binary(16),

    major TINYINT UNSIGNED,
    minor TINYINT UNSIGNED,
    patch TINYINT UNSIGNED,

    releasenotes TEXT,
    source TEXT,

    verified BOOLEAN DEFAULT FALSE,

    creation datetime DEFAULT CURRENT_TIMESTAMP,
    updatedatetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX(pluginuuid),
    INDEX(updatedatetime),
    INDEX(major, minor, patch),
    UNIQUE(pluginuuid, major, minor, patch),
    INDEX(verified),
    INDEX(creation)
);
