<?php

session_id(2022);
session_start();

// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);
$rp['texte']= htmlspecialchars ($rp['texte']);
// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

// --------------- enregistrement du commentaire dans la BD ---------------------------
 if(!isset($_SESSION['image_name'])) {
 	$_SESSION['image_name']='' ;
 }
$req = $bdd->prepare('INSERT INTO Commentaire(image, texte, type, publication, personne,dat_commentaire)
	VALUES (?,?,?,?,?,NOW())');
$req->execute(array($_SESSION['image_name'], $rp['texte'], $rp['type'], $rp['publication'], $rp['personne']));

// augmentation du nomber de publicatuion chez le publisher

$req = $bdd->prepare('SELECT id FROM userStat WHERE type = ? AND personne = ?');
$req->execute(array($rp['type'],$rp['personne']));
$result = $req->fetch();
if(!$result) {

	$req = $bdd->prepare('INSERT INTO userStat(type, personne, number_published)
	VALUES (?,?,?)');
	$req->execute(array($rp['type'],$rp['personne'],1));
}
else {
	$req = $bdd->prepare('UPDATE userStat SET number_published = number_published + 1 WHERE id = ?');
	$req->execute(array($result['id']));
}

// recuperons l'identifiant du publisher pour la fonction de notification
$req = $bdd->prepare('SELECT personne_publication as personne FROM Publication WHERE Publication.id_publication = ?');
$req->execute(array($rp['publication']));
$personne = $req->fetch(PDO::FETCH_ASSOC);
// ici on va envoyer la requete de notification
require("notification.php") ;
notification($bdd,$personne['personne'],$rp['publication'],1,1,$rp['personne']);

// vidage...
$_SESSION['image_name']='' ;

	echo 'done';
	$req->closeCursor();
?>