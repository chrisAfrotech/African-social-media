<?php

session_id(2022);
session_start();

// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);
// ------------- sauvegarde --------------------------
if($rp['request'] == 'save'){
	$_SESSION['reaction'] = $rp['reaction'] ;
	$_SESSION['typeRequest'] = $rp['typeRequest'] ;
	$_SESSION['newIndex'] = $rp['newIndex'] ;
	$_SESSION['index'] = $rp['index'] ;
}
else {
	if(isset($_SESSION['reaction'])){
	$datas = ['reaction' => $_SESSION['reaction'],
	'typeRequest' => $_SESSION['typeRequest'],
	'newIndex' => $_SESSION['newIndex'],
	'index' => $_SESSION['index']];
	echo json_encode($datas);
	}
	else {
	 $datas = ['reaction' => "",
	'typeRequest' => "latest",
	'newIndex' => 0,
	'index' => 0];
	echo json_encode($datas);
	}
}
?>