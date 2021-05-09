CREATE DATABASE IF NOT EXISTS `pluginmods`;
USE `pluginmods`;

CREATE TABLE IF NOT EXISTS `plugins` (
    uuid binary(16) NOT NULL,
    useruuid binary(16) NOT NULL,

    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,

    verified BOOLEAN DEFAULT FALSE NOT NULL,

    creation datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedatetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,

    PRIMARY KEY(uuid),
    INDEX(name),
    INDEX(useruuid),
    INDEX(verified),
    INDEX(creation),
    INDEX(updatedatetime)
);

CREATE TABLE IF NOT EXISTS `versions` (
    pluginuuid binary(16) NOT NULL,

    major TINYINT UNSIGNED NOT NULL,
    minor TINYINT UNSIGNED NOT NULL,
    patch TINYINT UNSIGNED NOT NULL,

    releasenotes TEXT NOT NULL,
    source TEXT NOT NULL,

    verified BOOLEAN DEFAULT FALSE NOT NULL,

    creation datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedatetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,

    UNIQUE(pluginuuid, major, minor, patch),
    INDEX(pluginuuid),
    INDEX(updatedatetime),
    INDEX(major, minor, patch),
    INDEX(verified),
    INDEX(creation)
);
