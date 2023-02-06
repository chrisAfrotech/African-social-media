<?php

session_id(2022);
session_start();

// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);
$_SESSION['publication'] = $rp;
$_SESSION['publication']['publiTitle'] = htmlspecialchars ($_SESSION['publication']['publiTitle']);
$_SESSION['publication']['publiContent'] = htmlspecialchars ($_SESSION['publication']['publiContent']);
print_r($rp);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

// --------------- enregistrement du commentaire dans la BD ---------------------------
 if(!isset($_SESSION['image_name'])) {
 	$_SESSION['image_name']='' ;
 }
$req = $bdd->prepare('INSERT INTO Publication(image, titre,texte, type, personne_publication, dat_p)
	VALUES (?,?,?,?,?,NOW())');
$req->execute(array($_SESSION['image_name'], $_SESSION['publication']['publiTitle'], $_SESSION['publication']['publiContent'], $_SESSION['publication']['type'], $_SESSION['publication']['userId']));

// augmentation du nomber de publicatuion chez le publisher

$req = $bdd->prepare('SELECT id FROM userStat WHERE type = ? AND personne = ?');
$req->execute(array($rp['type'],$rp['userId']));
$result = $req->fetch();
if(!$result) {

	$req = $bdd->prepare('INSERT INTO userStat(type, personne, number_published)
	VALUES (?,?,?)');
	$req->execute(array($rp['type'],$rp['userId'],1));
}
else {
	$req = $bdd->prepare('UPDATE userStat SET number_published = number_published + 1 WHERE id = ?');
	$req->execute(array($result['id']));
}

// vidage...
$_SESSION['image_name']='' ; 


	$req->closeCursor();
?>