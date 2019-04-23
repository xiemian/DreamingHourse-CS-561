SELECT t1 . * , t2.Url
FROM  `Houses2` t1
INNER JOIN  `Houses_image` t2 ON t1.`User_id` = t2.`User_id` 
WHERE t1.`User_id` =39
