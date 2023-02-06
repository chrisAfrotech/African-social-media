<?php

session_start();
$_SESSION["favcolor"] = "green";
$_SESSION["favanimal"] = "catkjdjfdjffjkjgkj";

$table = [
    "Eric" => "Arnaud",
    "bar" => "foo",
];
$array = [
    "Tamo" => $table,
    "bar" => "foo",
];
$myJSON = json_encode($array);

// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);
$_SESSION['form'] = $rp;

echo($_SESSION['form']['surname']);
?>