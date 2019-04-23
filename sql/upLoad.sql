INSERT INTO `Houses2` (`User_id`, `Zipcode`, `Address`, `City`, `State`,`Price`,`Beds`, `Baths`, `Built`,`description`,`Space`,`Lot_space`) 
VALUES(
	(SELECT `User_id` FROM `User_info` WHERE `User_name` = 'yangz'),
	'97730','1230 Nw Ridegewood Pl', 'Corvallis', 'Oregon', '100000',3,2,2017,'nice house',500,2000)


SELECT `House_id`, `User_id` FROM `Houses2` ORDER BY `House_id` DESC LIMIT 1

INSERT INTO `Houses_image` (`House_id`,`User_id`, `Url`) 
VALUES(
	(SELECT `House_id`,`User_id` FROM Houses2 ORDER BY `House_id` DESC LIMIT 1),
	'wwwwwwwwwwwwwwwwwwwww')