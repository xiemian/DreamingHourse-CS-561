-- delete from houses table
DELETE FROM `Houses2` WHERE `House_id` = '2001'
-- delete from images table
DELETE FROM `Houses_image` WHERE `House_id` = '2001'
-- delete from favorites table
DELETE FROM `User_favorites` WHERE `House_id` = '2001'