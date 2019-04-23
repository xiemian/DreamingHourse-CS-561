
SELECT COUNT(`User_name`) AS dbResult 
FROM `User_info` 
WHERE `User_name` = [user name] AND AES_DECRYPT (`Password`,UNHEX(SHA2('My secret passphrase',512))) = [password] 
