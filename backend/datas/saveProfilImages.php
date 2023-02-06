<?php


session_id(2022);
session_start();

	require("saveImage.php");
	$result = '';
	$result1 ='';
	$result2 ='';
	$_SESSION['image_name'] = '';
	$_SESSION['image_name2'] = '';
	$_SESSION['image_name1'] = '';
	if(isset($_FILES["image_name"])) { $result = saveImage("image_name");} // profile image
	if(isset($_FILES["image_name2"])) { $result2 = saveImage("image_name2");} // profile image small
	if(isset($_FILES["image_name1"])) { $result1 = saveImage("image_name1"); } // cover image
	echo json_encode($result.'||'.$result1.'||'.$result2);
?>