<?php 
#print_r($_GET);
#exit;
include 'config.php';
include("EnDeString.php");

$EnDeStr = New EnDeString($EncryptKey);

$user_data3 = $EnDeStr->decrypt($_COOKIE['TestCookie']);
//$user_data4[0] = $EnDeStr->decrypt($user_data3);
//echo $user_data3;
//echo "<br>";
$user_data4 = explode("n", $user_data3);
//echo $user_data4[0];
////echo "<br>";
//echo $user_data4[1];

//$level_id  = unserialize($_COOKIE['TestCookie']);
//echo $level_id;
//var_dump(unserialize($_COOKIE['TestCookie']));
//$user_data4[0] = $EnDeStr->decrypt($_COOKIE['TestCookie']);


//$sql="select Question from $question_table where Level_id = $user_data4[1]";
$php_question = mysql_query("select Question from $question_table where Level_id = $user_data4[1]");

//var_dump($php_question);
$num_rows = mysql_num_rows($php_question);
for($i = 0;$i < $num_rows; $i++)
{
	$quiz[$i] = mysql_result($php_question,$i,"Question");
}


//get the options from Questions
$php_option1 = mysql_query("select option1 from  $question_table where Level_id = $user_data4[1]");
$num_rows1 = mysql_num_rows($php_option1);

$php_option2 = mysql_query("select option2 from  $question_table where Level_id = $user_data4[1]");
$num_rows2 = mysql_num_rows($php_option2);

$php_option3 = mysql_query("select option3 from  $question_table where Level_id = $user_data4[1]");
$num_rows3 = mysql_num_rows($php_option3);

for($i = 0;$i < $num_rows1; $i++)
{
	$options[$i] = array(mysql_result($php_option1,$i,"Option1"),mysql_result($php_option2,$i,"Option2"),mysql_result($php_option3,$i,"Option3"));
}

//get the score_increment, score_decrement and score_limit from QuizLevels using level_id
$php_score_increment = mysql_result(mysql_query("select score_increment from $quiz_level where Level_id = $user_data4[1]"),0,"score_increment");
$php_score_decrement = mysql_result(mysql_query("select score_decrement from $quiz_level where Level_id =$user_data4[1]"),0,"score_decrement");
$php_score_limit = mysql_result(mysql_query("select score_limit from $quiz_level where Level_id = $user_data4[1]"),0,"score_limit");
//$php_number_of_rows = mysql_query("select count(*) from Questions where Level_id = $user_data4[0]");
$php_number_of_levels = mysql_result(mysql_query("select max(Level_id) from $quiz_level"),0,"max(level_id)");

$data	= array("Questions" => $quiz, "Options" => $options, "Increment_score" => $php_score_increment,
				"Decrement_score" => $php_score_decrement,"Number_of_rows" => $num_rows,
				"Number_of_levels" => $php_number_of_levels,"Current_level" => $user_data4[1],
				"Limit_score" => $php_score_limit);
//echo "<pre>";print_r($data);
echo json_encode($data);


/*temporary just seeing if cookie is set //**********Incorrect code remove after testing**********
 $user_id = 'uid1'; //we get this when user account is created or when user logs in
 $quiz_level = $level_id['QuizLevel'];
 $quiz_level++;
 //create an array containing quizlevel and userid
set_user_cookie($user_id,$quiz_level);
*/
?>
