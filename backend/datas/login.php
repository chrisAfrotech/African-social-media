<?php

session_id(2022);
session_start();

// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);
$_SESSION['login'] = $rp;

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- vérifions si le compte existe déja -----------------------

$req = $bdd->prepare('SELECT id FROM Personne WHERE nom = ? AND password = ?');
$req->execute(array($_SESSION['login']['name'],$_SESSION['login']['password']));
$result = $req->fetch(PDO::FETCH_ASSOC);

echo json_encode($result['id']);


$req->closeCursor();
?>