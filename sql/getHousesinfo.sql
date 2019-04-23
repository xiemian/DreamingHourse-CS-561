-- Get the count of house belong to the features

SELECT COUNT(*) FROM `Houses2` H  WHERE ;

--page show for house info  

SELECT H.`House_id`, H.`Address`,H.`City`,H.`State`,H.`Zipcode`,H.`Price`,H.`Beds`,H.`Baths`,H.`Built`,H.`Space`, H.`description` FROM `Houses2` H  WHERE 1 limit 10, 20
SELECT COUNT(*) FROM `Houses2` H  WHERE H.`Address`='1230 NW Ridgewood Pl' AND H.`City`='Corvallis'  AND H.`State`='OR' AND H.`Zipcode`='90077' AND H.`Price`>=1 AND H.`Price`<=77500000000 AND H.`Beds`>=2 AND H.`Baths`>=2 AND H.`Built`>=2000 AND H.`Space`>=0 AND H.`Space`<=1000000000000
-- get house images
SELECT `Url` FROM `Houses_images` WHERE `House_id` = "2105"