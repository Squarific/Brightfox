CREATE TABLE IF NOT EXISTS `plugins` (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(255),
    creation datetime DEFAULT CURRENT_TIMESTAMP,
    updatedatetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description TEXT,
    PRIMARY KEY(id),
    INDEX(name)
);

CREATE TABLE IF NOT EXISTS `versions` (
    pluginid INT UNSIGNED AUTO_INCREMENT,
    major TINYINT UNSIGNED,
    minor TINYINT UNSIGNED,
    patch TINYINT UNSIGNED,
    releasenotes TEXT,
    creation datetime DEFAULT CURRENT_TIMESTAMP,
    updatedatetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX(pluginid),
    INDEX(updatedatetime)
);
