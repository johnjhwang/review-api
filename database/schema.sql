-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Reviews'
--
-- ---

DROP TABLE IF EXISTS `Reviews`;

CREATE TABLE `Reviews` (
  `review_id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `product_id` INT NOT NULL DEFAULT NULL,
  `rating` INTEGER NOT NULL DEFAULT NULL,
  `summary` VARCHAR(60) NULL DEFAULT NULL,
  `recommend` TINYINT(1) NOT NULL DEFAULT NULL,
  `response` VARCHAR(60) NULL DEFAULT NULL,
  `body` VARCHAR(1000) NOT NULL DEFAULT 'NULL',
  `date` VARCHAR(30) NOT NULL DEFAULT 'NULL',
  `reviewer_name` VARCHAR(60) NOT NULL DEFAULT 'NULL',
  `reviewer_email` VARCHAR(60) NULL DEFAULT NULL,
  `helpfulness` INT NOT NULL DEFAULT 0,
  `reported` TINYINT(1) NOT NULL DEFAULT NULL,
  PRIMARY KEY (`review_id`)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `review_id` INTEGER NOT NULL DEFAULT NULL,
  `url` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'characteristics'
--
-- ---

DROP TABLE IF EXISTS `characteristics`;

CREATE TABLE `characteristics` (
  `id` INT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(20) NOT NULL DEFAULT 'NULL',
  `value` VARCHAR(20) NOT NULL DEFAULT 'NULL',
  `product_id` INT NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'ReviewsMeta'
--
-- ---

DROP TABLE IF EXISTS `ReviewsMeta`;

CREATE TABLE `ReviewsMeta` (
  `product_id` INT NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `ratings` VARCHAR(60) NULL DEFAULT NULL,
  `recommended` VARCHAR(30) NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`product_id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Reviews` ADD FOREIGN KEY (product_id) REFERENCES `ReviewsMeta` (`product_id`);
ALTER TABLE `photos` ADD FOREIGN KEY (review_id) REFERENCES `Reviews` (`review_id`);
ALTER TABLE `characteristics` ADD FOREIGN KEY (product_id) REFERENCES `ReviewsMeta` (`product_id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ReviewsMeta` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Reviews` (`review_id`,`product_id`,`rating`,`summary`,`recommend`,`response`,`body`,`date`,`reviewer_name`,`reviewer_email`,`helpfulness`,`reported`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `photos` (`id`,`review_id`,`url`) VALUES
-- ('','','');
-- INSERT INTO `characteristics` (`id`,`name`,`value`,`product_id`) VALUES
-- ('','','','');
-- INSERT INTO `ReviewsMeta` (`product_id`,`ratings`,`recommended`) VALUES
-- ('','','');