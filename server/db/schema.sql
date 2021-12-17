-- ---
-- Globals
-- ---

DROP DATABASE IF EXISTS reviewapi;

CREATE DATABASE reviewapi;

USE reviewapi;


-- mysql -u b2e43b95a74146 -p3ea000b8 -h us-cdbr-east-05.cleardb.net


-- mysql --host=us-cdbr-east-05.cleardb.net --user=b2e43b95a74146 --password=3ea000b8 --reconnect heroku_d1094ae8bb349af < ./server/db/schema.sql

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Reviews'
--
-- ---

DROP TABLE IF EXISTS Reviews;
-- id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
-- 1,1,5,"2019-01-01","This product was great!","I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.",true,false,"funtime","first.last@gmail.com",,8

CREATE TABLE Reviews (
  review_id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date VARCHAR(60),
  summary VARCHAR(60),
  body VARCHAR(1000) NOT NULL,
  recommend TINYINT(1),
  reported TINYINT(1),
  reviewer_name VARCHAR(60),
  reviewer_email VARCHAR(60),
  response VARCHAR(60),
  helpfulness INT NOT NULL DEFAULT 0,
  PRIMARY KEY (review_id)
);

-- ---
-- Table 'photos'
--
-- ---
-- id,review_id,url
-- 1,5,"https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT,
  review_id INT NOT NULL,
  url VARCHAR(500),
  PRIMARY KEY (id),
  FOREIGN KEY (review_id) REFERENCES Reviews(review_id)
);

-- ---
-- Table 'characteristics'
--
-- ---
-- id,product_id,name
-- 1,1,"Fit"


DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  characteristic_id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(20) NOT NULL,
  PRIMARY KEY (characteristic_id)
);

-- ---
-- Table 'charReviews'
--
-- ---
-- id,characteristic_id,review_id,value
-- 1,1,1,4

DROP TABLE IF EXISTS charReviews;

CREATE TABLE charReviews (
  id INT NOT NULL AUTO_INCREMENT,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (characteristic_id) REFERENCES characteristics(characteristic_id),
  FOREIGN KEY (review_id) REFERENCES Reviews(review_id)
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE `Reviews` ADD FOREIGN KEY (product_id) REFERENCES `ReviewsMeta` (`product_id`);
-- ALTER TABLE `photos` ADD FOREIGN KEY (review_id) REFERENCES `Reviews` (`review_id`);
-- ALTER TABLE `characteristics` ADD FOREIGN KEY (product_id) REFERENCES `ReviewsMeta` (`product_id`);

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

-- LOAD DATA LOCAL INFILE '/home/ubuntu/reviews.csv'
-- INTO TABLE Reviews
-- FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '/home/ubuntu/reviews_photos.csv'
-- INTO TABLE photos
-- FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '/home/ubuntu/characteristics.csv'
-- INTO TABLE characteristics
-- FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '/home/ubuntu/characteristic_reviews.csv'
-- INTO TABLE charReviews
-- FIELDS TERMINATED BY ','
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;


-- CREATE INDEX product_id_and_reported_idx ON Reviews (product_id, reported);
-- CREATE INDEX review_id_index ON photos (review_id);
-- CREATE INDEX product_id_and_recommend_idx ON Reviews (product_id, recommend);
-- CREATE INDEX product_id_idx ON Reviews (product_id);
-- CREATE INDEX product_id_idx ON characteristics (product_id);
-- CREATE INDEX characteristic_id_idx ON charReviews (characteristic_id);