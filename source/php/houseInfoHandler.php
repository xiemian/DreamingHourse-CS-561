<?php  

    include('dbConnection.php');
    $houseServiceLog = Logger::getLogger("myLogger");
    $db = new db();
	$connection_state = $db->dbConnect();
	$connection_state = json_decode($connection_state);
	$response->status = 0;
    $response->msg = '';
    /*Check if the database connection is set or not*/
	if ($connection_state->status !=0){
    /*Report Error if the database connecation is failed*/
		$houseServiceLog->error('houseService :: Database Connection Failed');
        $response->status = 600;
		$response->msg = "Database Coneection Failed";    
	}
	else {
    /*Process user acation services if the database connection is successed*/
        /*Check if front-end pass service name to server side*/
        if (!isset($_POST['houseService'])){
            /*Report Error wheno no service name is sent via POST*/
            $houseServiceLog->warn('houseService :: No Service Selected');
            $response->status = 400;
            $response->msg = "No Service Selected";
        }
        else {
            /*Get service name and match it with service if service name is sent via POST*/
            $service = $_POST['houseService'];
            switch($service) {
                case "uploadHouseInfo":   /*Perform Service -uploadHouseInfo- if it is called*/                   
                    $houseServiceLog->info('houseService :: uploadHouseInfo Called.');
                    if (isset($_POST['userName']) && isset($_POST['address'])
                    && isset($_POST['city']) && isset($_POST['state'])
                    && isset($_POST['bath']) && isset($_POST['bed'])
                    && isset($_POST['price']) && isset($_POST['imageUrl'])
                    && isset($_POST['livingSpace']) && isset($_POST['zipCode'])){
                        /*Get all required data ---> Query Databaes ---> Return callback*/
                        $userName = $_POST['userName'];
                        $address = $_POST['address'];
                        $city = $_POST['city'];
                        $state = $_POST['state'];
                        $bath = $_POST['bath'];
                        $bed = $_POST['bed'];
                        $price = $_POST['price'];
                        $imageUrl = $_POST['imageUrl'];
                        $buildTime = $_POST['buildTime'];
                        $livingSpace = $_POST['livingSpace'];
                        $lotSpace = $_POST['lotSpace'];
                        $description = $_POST['description'];
                        $zipCode = $_POST['zipCode'];
                        
                        $statement = "INSERT INTO `Houses2` (`User_id`, `Zipcode`, `Address`, `City`, `State`,`Price`,`Beds`, `Baths`, `Built`,`description`,`Space`,`Lot_space`) 
                        VALUES((SELECT `User_id` FROM `User_info` WHERE `User_name` = '$userName'),'$zipCode',
                        '$address','$city', '$state', '$price', '$bed','$bath','$buildTime','$description','$livingSpace','$lotSpace')"; #Houses2 will be modified in the final verson

                        $dbResult  =$db->dbExecute($statement);
                        

                        if ($dbResult){
                           $statement = "INSERT INTO `Houses_images` (`House_id`,`User_id`, `Url`) 
                           VALUES((SELECT `House_id` FROM `Houses2` ORDER BY `House_id` DESC LIMIT 1),(SELECT `User_id` FROM `Houses2` ORDER BY `House_id` DESC LIMIT 1),'$imageUrl')";
                           $dbResult =$db->dbExecute($statement);
                            if($dbResult){
                                $response->status   = 200;
                                $response->msg      ='SUCCESS';
                                $houseServiceLog->info('houseService :: uploadHouseInfo Send dbResponse back.');
                            }
                            else{
                                $response->status   = 601;
                                $response->msg      = 'Unknown error in database';
                                $houseServiceLog->warn('houseService ::uploadHouseInfo fail in database');
                            }
                        }
                       else {
                           /*Report error back if the query is failed*/
                           //COVERED
                           $response->status   = 601;
                           $response->msg      = 'Unknown error in database';
                           $houseServiceLog->warn('houseService ::uploadHouseInfo fail in database');
                        }
                   }
                    else {
                        /*No enough data ---> Return callback*/
                        // COVERED
                       $houseServiceLog->warn('houseService ::uploadHouseInfo Called Failed. No enought info passed back via POST');
                       $response->status   = 406;
                       $response->msg      = 'houseService: uploadHouseInfo requires enough variable';
                    }
                    break;
                case "getHouseInfo":   /*Perform Service -getHouseInfo- if it is called*/                   
                    $houseServiceLog->info('houseService :: getHouseInfo Called.');
                    if(isset($_POST['filtered']) && $_POST['filtered'] == 0
                     && isset($_POST['pageNum']) && isset($_POST['itemPerPage'])){
                        $X = ($_POST['pageNum'] - 1) * $_POST['itemPerPage'];
                        $Y = $_POST['itemPerPage'];
                        $statement = "SELECT H.`House_id`, H.`Address`,H.`City`,H.`State`,H.`Zipcode`,H.`Price`,H.`Beds`,H.`Baths`,H.`Built`,H.`Space`, H.`description`, Hi.`Url` FROM `Houses2` H  INNER JOIN  `Houses_images` Hi
     ON Hi.`House_id`= H.`House_id` GROUP BY H.`House_id` HAVING 1 limit $X,$Y";
                        $dbResult  =$db->dbExecute($statement);
                        $arr = [];
                        if ($dbResult->num_rows > 0) {
                            while($row = $dbResult->fetch_assoc()) {
                                $houseId = $row['House_id'];
                              
                                $arr[] = $row; 
                            }
                        }
                        $response->status   = 200;
                        $response->msg      = "SUCCESS";
                        $response->foundHouse = $arr;
                    }
                    elseif(isset($_POST['filtered']) && $_POST['filtered'] == 1){
                        if(isset($_POST['filterVariables'])
                         && isset($_POST['pageNum']) && isset($_POST['itemPerPage'])){
                            $filterVariables = json_decode($_POST['filterVariables']);
                            $city = $filterVariables->city;
                            $state = $filterVariables->state;
                            $zipCode = $filterVariables->zipCode;
                            $livingSpaceMin = $filterVariables->livingSpace->min;
                            $livingSpaceMax = $filterVariables->livingSpace->max;
                            $priceMin = $filterVariables->price->min;
                            $priceMax = $filterVariables->price->max;
                            $bed = $filterVariables->bed;
                            $bath = $filterVariables->bath;
                            $houseServiceLog->warn($filterVariables);
                            $X = ($_POST['pageNum'] - 1) * $_POST['itemPerPage'];
                            $Y = $_POST['itemPerPage'];

                            $statement = "SELECT H.`House_id`, H.`Address`,H.`City`,H.`State`,H.`Zipcode`,H.`Price`,H.`Beds`,H.`Baths`,H.`Built`,H.`Space`, H.`description`, Hi.`Url` FROM `Houses2` H  INNER JOIN  `Houses_images` Hi
                                          ON Hi.`House_id`= H.`House_id` GROUP BY H.`House_id` 
                                          HAVING H.`City`='$city' AND H.`State`='$state' 
                                          AND H.`Price`>=$priceMin AND H.`Price`<=$priceMax
                                          AND H.`Beds`= $bed AND H.`Baths` = $bath 
                                          AND H.`Space`>=$livingSpaceMin AND H.`Space`<=$livingSpaceMax limit $X, $Y";

                            $dbResult  =$db->dbExecute($statement);
                            $arr = [];
                            if ($dbResult->num_rows > 0) {
                                while($row = $dbResult->fetch_assoc()) {
                                    $houseId = $row['House_id'];
                                    $arr[] = $row;
                                }
                            }
                            $response->status   = 200;
                            $response->msg      = "SUCCESS";
                            $response->foundHouse = $arr;
                         }else {
                            $houseServiceLog->warn('houseService ::getHouseInfo Called Failed. No enought info passed back via POST');
                            $response->status   = 406;
                            $response->msg      = 'houseService: getHouseInfo requires enough variable';
                         }
                    }
                    else {
                        /*No enough data ---> Return callback*/
                        // COVERED
                       $houseServiceLog->warn('houseService ::getHouseInfo Called Failed. No enought info passed back via POST');
                       $response->status   = 406;
                       $response->msg      = 'houseService: getHouseInfo requires enough variable';
                    }
                    break;
 //-------------------------------------------------------------------------------------------------
                case "getUploadHouse":   /*Perform Service -getUploadHouse- if it is called*/                   
                    $houseServiceLog->info('houseService :: getUploadHouse Called.');
                    if(isset($_POST['userName']) && isset($_POST['pageNum']) && isset($_POST['itemPerPage'])){
                        $userName = $_POST['userName'];
                        $X = ($_POST['pageNum'] - 1) * $_POST['itemPerPage'];
                        $Y = $_POST['itemPerPage'];
                        $statement = "SELECT H.`House_id`, H.`Address`,H.`City`,H.`State`,H.`Zipcode`,H.`Price`,H.`Beds`,H.`Baths`,H.`Built`,H.`Space`, H.`description`, Hi.`Url` FROM `Houses2` H  INNER JOIN  `Houses_images` Hi
                        ON Hi.`House_id`= H.`House_id` WHERE H.`User_id` = (SELECT U.`User_id` FROM `User_info` U WHERE U.`User_name` = '$userName') limit $X,$Y";
                        $dbResult  =$db->dbExecute($statement);
                        $arr = [];
                        if ($dbResult->num_rows > 0) {
                            while($row = $dbResult->fetch_assoc()) {
                                $arr[] = $row; 
                            }
                        }
                        $response->status   = 200;
                        $response->msg      = "SUCCESS";
                        $response->foundHouse = $arr;
                    }else {
                            $houseServiceLog->warn('houseService ::getUploadHouse Called Failed. No enought info passed back via POST');
                            $response->status   = 406;
                            $response->msg      = 'houseService: getUploadHouse requires enough variable';
                    }
                    break;

//---------------------------------------------------------------------------------------------------
                case "deleteUploaded":   /*Perform Service -deleteUploaded- if it is called*/                   
                    $houseServiceLog->info('houseService :: deleteUploaded Called.');
                    if(isset($_POST['houseId'])){
                        $houseId = $_POST['houseId'];                      

                        $dbResult  =$db->dbExecute("DELETE FROM `Houses2` WHERE `House_id` = $houseId");
                        $dbResult  =$db->dbExecute("DELETE FROM `Houses_image` WHERE `House_id` = $houseId");
                        $dbResult  =$db->dbExecute("DELETE FROM `User_favorites` WHERE `House_id` = $houseId");
                        if ($dbResult) {
                            $response->status   = 200;
                            $response->msg      = "SUCCESS";
                        }
                    }
                    else {
                        /*No enough data ---> Return callback*/
                        // COVERED
                        $houseServiceLog->warn('houseService ::deleteUploaded Called Failed. No enought info passed back via POST');
                        $response->status   = 406;
                        $response->msg      = 'houseService: deleteUploaded requires enough variable';
                    }
                    break;

 //---------------------------------------------------------------------------------------------------
                case "addFavoriteHouse":   /*Perform Service -addFavoriteHouse- if it is called*/                   
                    $houseServiceLog->info('houseService :: addFavoriteHouse Called.');
                    if(isset($_POST['userName']) && isset($_POST['houseId'])){
                        $userName = $_POST['userName'];
                        $houseId = $_POST['houseId'];                
                        $statement = "INSERT INTO  `User_favorites` (`User_id` ,  `House_id` ,  `Create_Time` ) VALUES ((SELECT  `User_id` FROM `User_info` WHERE  `User_name` =  '$userName'), $houseId, (SELECT FROM_UNIXTIME( UNIX_TIMESTAMP( NOW( ) ) ,  '%Y-%m-%d %H:%i:%S' )))";
                        $dbResult  =$db->dbExecute($statement);
                        if ($dbResult) {
                            $response->status   = 200;
                            $response->msg      = "SUCCESS";
                        }else{
                            $response->status   = 400;
                            $response->msg      = "Error ";
                        }
                    }
                    else {
                        /*No enough data ---> Return callback*/
                        // COVERED
                        $houseServiceLog->warn('houseService ::addFavoriteHouse Called Failed. No enought info passed back via POST');
                        $response->status   = 406;
                        $response->msg      = 'houseService: addFavoriteHouse requires enough variable';
                    }
                    break;
 //---------------------------------------------------------------------------------------------------
                case "deleteSavedhouse":   /*Perform Service -deleteSavedhouse- if it is called*/                   
                    $houseServiceLog->info('houseService :: deleteSavedhouse Called.');
                    if(isset($_POST['userName']) && isset($_POST['houseId'])){
                        $userName = $_POST['userName'];
                        $houseId = $_POST['houseId'];                      
                        $statement = "DELETE FROM `User_favorites` WHERE `House_id` = $houseId AND `User_id` = (SELECT `User_id` FROM `User_info` WHERE `User_name` = '$userName')";
                        
                        $dbResult  =$db->dbExecute($statement);
                        if ($dbResult) {
                            $response->status   = 200;
                            $response->msg      = "SUCCESS";
                        }
                    }
                    else {
                        /*No enough data ---> Return callback*/
                        // COVERED
                        $houseServiceLog->warn('houseService ::deleteSavedhouse Called Failed. No enought info passed back via POST');
                        $response->status   = 406;
                        $response->msg      = 'houseService: deleteSavedhouse requires enough variable';
                    }
                    break;
 //---------------------------------------------------------------------------------------------------
                case "getSavedHouses":   /*Perform Service -getSavedHouses- if it is called*/                   
                    $houseServiceLog->info('houseService :: getSavedHouses Called.');
                    if(isset($_POST['userName'])){
                        $userName = $_POST['userName'];
                        
                        $statement = "SELECT H.`House_id`, H.`Address`,H.`City`,H.`State`,H.`Zipcode`,H.`Price`,H.`Beds`,H.`Baths`,H.`Built`,H.`Space`, H.`description`, Hi.`Url` FROM `Houses2` H  INNER JOIN  `Houses_images` Hi
     ON Hi.`House_id`= H.`House_id` WHERE H.`House_id` IN( SELECT F.`House_id`  FROM `User_favorites` F , `User_info` U WHERE F.`User_id` = U.`User_id` AND U.`User_name` = '$userName')";
                        
                        $dbResult  =$db->dbExecute($statement);
                        $arr = [];
                        if ($dbResult->num_rows > 0) {
                            while($row = $dbResult->fetch_assoc()) {
                                $arr[] = $row;
                            }
                            $response->status   = 200;
                            $response->msg      = "SUCCESS";
                            $response->foundHouse = $arr;
                        }

                    }
                    else {
                        /*No enough data ---> Return callback*/
                        // COVERED
                        $houseServiceLog->warn('houseService ::getSavedHouses Called Failed. No enought info passed back via POST');
                        $response->status   = 406;
                        $response->msg      = 'houseService: getSavedHouses requires enough variable';
                    }
                    break;

  //---------------------------------------------------------------------------------------------------
               default: //COVERED
                    $houseServiceLog->warn('houseService :: '.$service.' Not Found');
                    $response->status = 404;
                    $response->msg =$service." Not Found";
            }
        }         
	}
	echo(json_encode($response));
?>