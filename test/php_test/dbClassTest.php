<?php
	include '../../source/php/dbConnection.php';
	$dbTest = new db();
	$db_state = json_decode($dbTest->dbConnect());
	/*Success Case
		$db_status->status == 0
		$db_status->msg == "Connection Estiblished"
	*/
	if ($db_state->status == 0 && $db_state->msg == "Connection Estiblished"){
		echo "Test 1 : dbConnect connect to database --- Pass";
	}
	else {
		echo "Test 1: Class <db> --- Fail";
		echo $db_state->status;
		echo $db_state->msg;
	}
?>