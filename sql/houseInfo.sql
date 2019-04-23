-- Get the count of house belong to the user_name

SELECT COUNT(*) FROM `Houses2` H , `User_info` U WHERE H.`User_id` = U.`User_id` AND U.`User_name` = '123';


--page show for house info  

SELECT * FROM `Houses2` H , `User_info` U WHERE H.`User_id` = U.`User_id` AND U.`User_name` = '222' limit 10, 20