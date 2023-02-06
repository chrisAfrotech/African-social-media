<?php
session_id(2022);
session_start();
// getting datas from post
$rp1 = json_decode(file_get_contents('php://input'), true);
$_SESSION['form'] = $rp1 ;

print_r($_SESSION);
?>