UPDATE `Houses2` SET
    `User_id` = CASE MOD(`House_id`, 3)
        WHEN 1 THEN FLOOR(RAND()*(50-1)+6)
        WHEN 2 THEN FLOOR(RAND()*(50-1)+6)
        WHEN 0 THEN FLOOR(RAND()*(50-1)+6)
    END
WHERE 1





INSERT INTO `Houses_image`(`House_id`,`User_id`,`Url`) 
SELECT t1.`House_id`, t1.`User_id` , t2.Url
FROM  `Houses2` t1
INNER JOIN  `Houses_image` t2 ON t2.`Image_id` = MOD(t1.`House_id`,20) OR t2.`Image_id` = MOD(t1.`House_id`,20)+1
WHERE 1;