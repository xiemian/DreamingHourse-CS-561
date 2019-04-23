INSERT INTO  `User_favorites` (  `User_id` ,  `House_id` ,  `Create_Time` ) 
VALUES (
(SELECT  `User_id` 
FROM  `User_info` 
WHERE  `User_name` =  '222'), 
2152, (SELECT FROM_UNIXTIME( UNIX_TIMESTAMP( NOW( ) ) ,  '%Y-%m-%d %H:%i:%S' )))