-- Get house info

SELECT H.`House_id`, H.`Address`,H.`City`,H.`State`,H.`Zipcode`,H.`Price`,H.`Beds`,H.`Baths`,H.`Built`,H.`Space`, H.`description` FROM `Houses2` H WHERE H.`House_id` IN(
SELECT F.`House_id`  FROM `User_favorites` F , `User_info` U WHERE F.`User_id` = U.`User_id` AND U.`User_name` = '222') 

-- Get house image
SELECT `Url` FROM `Houses_images` WHERE `House_id` = "2105"