<?php


session_id(2022);
session_start();

	require("saveImage.php");
	$result = saveImage("image_name");
	echo json_encode($result);
?>