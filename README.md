# Guideline for using backend APIs

## `userActionHandler.php` contains all services related to users' actions. 
To call services in this file with AJAX, you need to specify **url to this file** and **userService's name**. Here is a sample AJAX call: 

```javascript
        /*Sample to call isDuplicate in userActionHandler.php*/
        $.ajax({
                type: "POST",
                url: "../php/userActionHandler.php" ,
                data: {'userService': 'isDuplicate' , 'servicePara': 'username'},
                success: function (serverResponse) {
                    /* serverResponse contains info sent from server 
                         Handle server response with proper functions*/
                },
                error : function(ajaxError) {
                   /*If the communication failed, explore ajaxError*/  
                }
            });
```
### Specifications:
1. **Calling Service**
    * `isDuplicate`
        * _function_ : find out if the given userName existed in the database.
        * _post data_ : `{'userService' : 'isDuplicate ', 'userName': 'userName'}`
        * _server response_ : `{'status' : status_code, 'msg': TRUE/FALSE} ` 

    * `signUp`
        * _function_: store the user's registration info into the database.
        * _post data_ : `{'userService' : 'signUp',
                          'userName':'user name', 'userPass':'user passwork',
                                          'userRole':'user role', 'userPhone': 'user phone', 
                                          'userEmail': 'user email'}`
        * _server response_ : `{'status' : status_code, 'msg': SUCCESS} when signUp success` 

    * `logIn`
        * _function_: check if the userName and userPassword users input are correct by comparing with records from database.
        * _post data_ : `{'userService' : 'logIn',
                          'userName':'user name', 'userPassword':'user password'}`
        * _server response_ : `{'status' : status_code, 'msg': true} when logIn success
                            or {'status' : status_code, 'msg': false} when logIn fail` 
2.  **Server Response**
     * Service Success
        * `{'status' : 200, 'msg': database response}` 
     * Service Failed   
       * `{'status' : 400, 'msg': 'No Service Selected'}`
       * `{'status' : 404, 'msg': 'Service Not Found'}`
       * `{'status' : 406, 'msg': 'No enough data'}`
       * `{'status' : 600, 'msg': 'Databae Connection Failed'}`
       * `{'status' : 601, 'msg': 'Unknown error in database'}`
     

## `houseActionHandler.php` contains all services related to houses' actions.

# Guideline for using Front End Javascript
## `signUp.js` contains all event controls related to sign up page. 
### Specifications: 
1. **Syntax of each filed in SignUp form**
    * userName (required): shouldn't be duplicate with any userName in Database
    * passWord (required)
    * repassWord (required): passWord should be the same with repassWord.
    * email (optional): xx@xxx.com
    * phone (optional): xxx-xxx-xxxx
2. **Check Validate of input**
    * Check if all field in the form is filled. 
      * If not, should prompt a notice to user 
    * Check if the passWord marched with repassWord 
    * Check if the userName is duplicated 
3. **Ajax POST() and GET()**
    * Get the userName information from Server.
      * get Status from server about whether userName isDuplicate or not
    * Post all the information in 1. to Server
      * get status back from server about if the Post succeeded or not 
# Guideline for using database sql query 
## `isDuplicated.sql` checks a username is already existed in the table `User_info`and return the result message. 
To use these queries you need to specify **[user name]**(requirement)
```MySQL
      -- isDuplicated
        SELECT CASE ( SELECT COUNT(`User_name`) FROM User_info WHERE `User_name` = [user name]) 
	       WHEN 0 THEN CONCAT ('{"status":'   ,  0, ','  '"msg":', '"user name is available!"}')
                      ELSE CONCAT ('{"status":'   ,  -1 , ','  '"msg":', '"user name is duplicated!"}') 
               END;
```
## `signUp.sql` add a new user to table `User_info` and return the result of sign up. 
To use these queries you need to specify **[user name]**(requirement), **[password]**(requirement),**[user role]**(requirement),**[email]** and **[phone]**

```MySQL
     -- signUp
     INSERT INTO User_info (User_name, Password, User_role, Email, Phone) 
           VALUES ([user name], 
                    AES_ENCRYPT([password], UNHEX(SHA2(`My secret key`,512))), [user role], [email], [phone]);

     SELECT CASE ( SELECT COUNT(`User_name`) FROM `User_info` WHERE `User_name` = [user name]) 
	    WHEN 0 THEN CONCAT ('{"status":'   ,  -1 , ','  '"msg":', '"Sign up Failed!"}')
                   ELSE CONCAT ('{"status":'   ,  0 , ','  '"msg":', '"Sign up succeed!"}') 
            END;
```
## `logIn.sql` check user's username and password in table `User_info` and return the result of log in. 
To use these queries you need to specify **[user name]**(requirement), **[password]**(requirement)

```MySQL
     -- logIn
    SELECT COUNT(`User_name`) AS dbResult 
    FROM `User_info` 
    WHERE `User_name` = [user name] AND AES_DECRYPT (`Password`,UNHEX(SHA2('My secret passphrase',512))) = [password] ;
```
### Specifications: 
1. **isDuplicate**
    * _function_ : find out if the given userName existed in the database.
    * _input parameter_: [user name]

2. **signUp**
    * _function_ : store the user's registration info into the database and return status of registration.
    * _input parameter_: [user name], [password], [user role], [email], [phone].

3. **logIn**
    * _function_ : check the user's username and password in the database table 'User_info' and return status of log in.
    * _input parameter_: [user name], [password].
