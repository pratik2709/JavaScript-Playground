<?php
//This file is used for calling common functions
include("config.php");
include("EnDeString.php");
$EnDeStr = New EnDeString($EncryptKey);
$user_id = 'demo';
$quiz_level = $_GET["current_level"]; //get quiz

/*decrypt the previous cookie
$decrypt_previous_cookie = unserialize($_COOKIE['TestCookie']);
$quiz_level = $EnDeStr->decrypt($decrypt_previous_cookie['qry2']);
$quiz_level++; //increment level and set cookie */

//$user_data = array("qry1" => $EnDeStr->encrypt($user_id), "qry2" => $EnDeStr->encrypt($quiz_level)); 
//$concatenation = $user_id. "n" .$quiz_level;	
//$user_data = $EnDeStr->encrypt($concatenation)
//setcookie("TestCookie",$concatenation);

//temporary code to be removed
//$level_id  = unserialize($_COOKIE['TestCookie']);
//$new_level = $EnDeStr->decrypt($user_data['qry2']);
//echo $new_level;

$user_data = $user_id. "n" .$quiz_level;
$user_data1 = $EnDeStr->encrypt($user_data);
setcookie("TestCookie",$user_data1);
?>
