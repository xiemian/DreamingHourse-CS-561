SELECT COUNT(*) FROM `Houses2` H , `User_info` U WHERE H.`User_id` = U.`User_id` AND U.`User_name` = '123';


--page show for house info  

SELECT H.`House_id`, H.`Address`,H.`City`,H.`State`,H.`Zipcode`,H.`Price`,H.`Beds`,H.`Baths`,H.`Built`,H.`Space`, H.`description` FROM `Houses2` H , `User_info` U WHERE H.`User_id` = U.`User_id` AND U.`User_name` = '222' limit 10, 20
-- get house images
SELECT `Url` FROM `Houses_images` WHERE `House_id` = "2105"