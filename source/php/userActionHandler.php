<?php  

    include('dbConnection.php');
    $userServiceLog = Logger::getLogger("myLogger");
    $db = new db();
  $connection_state = $db->dbConnect();
  $connection_state = json_decode($connection_state);
  $response->status = 0;
    $response->msg = '';
    /*Check if the database connection is set or not*/
  if ($connection_state->status !=0){
    /*Report Error if the database connecation is failed*/
    $userServiceLog->error('userService :: Database Connection Failed');
        $response->status = 600;
    $response->msg = "Database Coneection Failed";    
  }
  else {
    /*Process user acation services if the database connection is successed*/
        /*Check if front-end pass service name to server side*/
        if (!isset($_POST['userService'])){
            /*Report Error wheno no service name is sent via POST*/
            $userServiceLog->warn('userService :: No Service Selected');
            $response->status = 400;
            $response->msg = "No Service Selected";
        }
        else {
            /*Get service name and match it with service if service name is sent via POST*/
            $service = $_POST['userService'];
            switch($service) {
                case "isDuplicate":   /*Perform Service -isDuplicate- if it is called*/
                    
                    $userServiceLog->info('userService :: isDuplicate Called.');
                    if (isset($_POST['userName'])){
                        /*Get all required data ---> Query Databaes ---> Return callback*/
                        $userName           = $_POST['userName'];
                        $statement          = "SELECT COUNT(`User_name`) AS dbResult FROM User_info WHERE `User_name` = '$userName '";
                        $dbResult           =$db->dbExecute($statement);
                        if ($dbResult){
                           $dbResult = mysqli_fetch_assoc($dbResult);
                            /*Return message back if the query is succeed*/
                            //COVERED
                           $response->status   = 200;
                           $response->msg      =!!($dbResult['dbResult']);
                           $userServiceLog->info('userService :: isDuplicate Send dbResponse back.');
                        }
                       else {
                           /*Report error back if the query is failed*/
                           //COVERED
                           $response->status   = 601;
                           $response->msg      = 'Unknown error in database';
                           $userServiceLog->warn('userService ::isDuplicate fail in database');
                        }
                   }
                    else {
                        /*No enough data ---> Return callback*/
                        // COVERED
                       $userServiceLog->warn('userService ::isDuplicate Called Failed. No userName passed back via POST');
                       $response->status   = 406;
                       $response->msg      = 'userService: isDuplicate requires variable [userName]';
                    }
                    break;

                case "logIn":   /*Perform Service -logIn- if it is called*/
                    
                    $userServiceLog->info('userService :: logIn Called.');
                    if (isset($_POST['userName']) && isset($_POST['userPassword'])){
                        /*Get all required data ---> Query Databaes ---> Return callback*/
                        $userName           = $_POST['userName'];
                        $userPassword           = $_POST['userPassword'];
                        $statement = "SELECT COUNT(`User_name`) AS dbResult, User_role as userRole FROM `User_info` WHERE `User_name` = '$userName' AND AES_DECRYPT (`Password`,UNHEX(SHA2('My secret passphrase',512))) = '$userPassword' ";
                        $dbResult           =$db->dbExecute($statement);
                        $dbResult = mysqli_fetch_assoc($dbResult);
                        if ($dbResult){
                            /*Return message back if the query is succeed*/
                            //COVERED
                           $response->status   = 200;
                           $response->msg      =!!($dbResult['dbResult']);
                           $response->userRole = $dbResult['userRole'];
                           $userServiceLog->info('userService :: logIn Send dbResponse back.');
                        }
                       else {
                           /*Report error back if the query is failed*/
                           //COVERED
                           $response->status   = 601;
                           $response->msg      = !!($dbResult['dbResult']);
                           $userServiceLog->warn('userService ::logIn fail in database');
                        }
                   }
                    else {
                        /*No enough data ---> Return callback*/
                        // COVERED
                       $userServiceLog->warn('userService ::logIn Called Failed. No userName and userPassword back via POST');
                       $response->status   = 406;
                       $response->msg      = 'userService: logIn requires variable [userName][userPassword]';
                    }
                    break;
/*----------------------------------------------------------------------------------------------------------*/    
                 case "signUp":       /*Perform Service -signUp- if it is called*/
                    
                    $userServiceLog->info('userService :: signUp Called');
                    if(  isset($_POST['userName']) && 
                         isset($_POST['userPassword']) &&
                         isset($_POST['userPhone'])&&
                         isset($_POST['userEmail'])&&
                         isset($_POST['userRole'])){
                        /*Get all required variables ---> Query Database ---> Return callback*/   
                        // COVERED
                        $userName           = $_POST['userName'];
                        $userPassword       = $_POST['userPassword'];
                        $userRole           = $_POST['userRole'];
                        $userPhone          = $_POST['userPhone'];
                        $userEmail          = $_POST['userEmail'];
                        /*$statement          = "INSERT INTO User_info (User_name, Password, User_role, Email, Phone) 
                                                VALUES ('$userName', 
                                                AES_ENCRYPT('$userPassword', UNHEX(SHA2(`My secret key`,512))), 
                                                '$userRole',
                                                '$userEmail', '$userPhone');";*/
                        $statement          = "INSERT INTO User_info (User_name, Password, User_role, Email, Phone) 
                                                VALUES ('$userName', AES_ENCRYPT('$userPassword', UNHEX(SHA2('My secret passphrase',512))),'$userRole','$userEmail', '$userPhone');";
                        $dbResult           =$db->dbExecute($statement);
                         if ($dbResult){
                             /*Return message back if the query is succeed*/
                             //COVERED
                             $response->status       = 200;
                             $response->msg          = 'SUCCESS';
                             $userServiceLog->info('userService ::signUp Success');
                         }
                         else {
                             /*Return error back if the query is failed*/
                             //COVERED
                             $response->status       = 601;
                             $response->msg          = 'Unknown error in database';
                             $userServiceLog->warn('userService ::signUp fail in database');
                         } 
                    }else{
                        /*Not enough data ---> Return call back*/
                        // COVERED
                        $userServiceLog->warn('userService ::signUp Called Failed. No enough data');
                        $response->status   = 406;
                        $response->msg      = 'signUp requires variables [userName] [userPassword] [userRole] [userPhone] [userEmail]';
                    }
                    
                     break;

                 case "getUserInfo":   /*Perform Service -getUserInfo- if it is called*/
                    
                     $userServiceLog->info('userService :: getUserInfo Called.');
                     
                    if (isset($_POST['userName'])){
                         /*Get all required data ---> Query Databaes ---> Return callback*/
                         $userName           = $_POST['userName'];
                         $statement          = "SELECT `User_name`,`User_role`,`Email`,`Phone` FROM `User_info` WHERE `User_name` = '$userName'";
                         $dbResult           =$db->dbExecute($statement);

                        if ($dbResult->num_rows > 0) {
                            $row = $dbResult->fetch_assoc();                              
                            $response->status   = 200;
                            $response->msg      = $row;
                            $userServiceLog->info('userService :: getUserInfo Send dbResponse back.');
                        }
                        else {
                            /*Report error back if the query is failed*/
                            //COVERED
                            $response->status   = 601;
                            $response->msg      = 'can not find this user in database';
                            $userServiceLog->warn('userService ::getUserInfo fail in database');
                         }
                    }
                     else {
                         /*No enough data ---> Return callback*/
                         // COVERED
                        $userServiceLog->warn('userService ::getUserInfo Called Failed. No userName passed back via POST');
                        $response->status   = 406;
                        $response->msg      = 'userService: getUserInfo requires variable [userName]';
                     }
                     break;                     
               default: //COVERED
                    $userServiceLog->warn('userService :: '.$service.' Not Found');
                    $response->status = 404;
                    $response->msg =$service." Not Found";
            }
        }         
  }
echo(json_encode($response));

  
?>