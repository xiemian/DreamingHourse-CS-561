
SELECT CASE ( SELECT COUNT(`User_name`) FROM User_info WHERE `User_name` = "A") 
	WHEN 0 THEN CONCAT ('{"Code":'   ,  0, ','  '"msg":', '"user name is available!"}')
    ELSE CONCAT ('{"Code":'   ,  -1 , ','  '"msg":', '"user name is duplicated!"}') 
    END;