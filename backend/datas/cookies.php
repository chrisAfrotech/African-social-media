<?php

// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);
if($rp['request'] ='presence'){
	if(isset($_COOKIE['userId'])){
		echo json_encode($_COOKIE['userId']);
	}
	else {
		echo json_encode(false);
	}
}
?>