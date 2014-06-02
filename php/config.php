<?php
$localhost = "localhost";
$username = "xxxxxxx";
$password = "xxxxxxx";
$database = "xxxxxxx";
$EncryptKey	= "xxxxxxx";
//$input_prefix = "book_";

$question_table = "xxxxxxx";
$quiz_level = "xxxxxxx";

$con = mysql_connect($localhost,$username,$password);
if (!$con)
{
	die("Could not connect: ".mysql_error());
}
else
{
	mysql_select_db($database,$con);
}

?>
