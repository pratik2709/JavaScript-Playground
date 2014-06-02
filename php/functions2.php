<?php
include("config.php");
include("EnDeString.php");
$EnDeStr = New EnDeString($EncryptKey);

$level_id  = unserialize($_COOKIE['TestCookie']);
$new_level = $EnDeStr->decrypt($level_id['qry2']);
echo $new_level;
?>
