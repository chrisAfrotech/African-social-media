<?php


// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;
require("biblio.php") ;
$point = pointForReaction($rp['reactionType']);
$point_to_add = 0;

//--------------------- vérifions si le compte existe déja -----------------------
$req = $bdd->prepare('SELECT id, point, personne FROM ReactionComOfCom WHERE comOfCom = ? AND personne = ?');
$req->execute(array($rp['comOfCom'],$rp['personne']));
$result = $req->fetch();
if(!$result) {
	//------------------ ajout de la réaction -------------------------------------------------
	$point_to_add = $point;
	$req = $bdd->prepare('INSERT INTO ReactionComOfCom(comOfCom, personne, reactionType, point, date)
	VALUES (?,?,?,?,NOW())');
	$req->execute(array($rp['comOfCom'],$rp['personne'],$rp['reactionType'],$point));
}
else {
	//------------------ mis à jour de la réaction ------------------------------
	$point_to_add = $point - $result['point'];
	$req = $bdd->prepare('UPDATE ReactionComOfCom SET reactionType = :rtype, point = :pt, date = NOW() WHERE id = :identif');
	$req->execute(array(
		'rtype' => $rp['reactionType'], 
		'pt' => $point, 
		'identif' => $result['id'],
	));
}

// recuperons l'identifian du publisher pour augmenter ses points
$req = $bdd->prepare('SELECT personne FROM CommentOfComment WHERE CommentOfComment.id_commentaire = ?');
$req->execute(array($rp['comOfCom']));
$personne = $req->fetch(PDO::FETCH_ASSOC);
//------------------------- now will update the number of point for both the publication and the publisher ---------------
$req = $bdd->prepare('SELECT id FROM userStat WHERE type = ? AND personne = ?');
$req->execute(array($rp['type'],$personne['personne']));
$result = $req->fetch();
if(!$result) {
	//------------------ ajout de la réaction -------------------------------------------------
	$req = $bdd->prepare('INSERT INTO userStat(type, personne, point)
	VALUES (?,?,?)');
	$req->execute(array($rp['type'],$personne['personne'],$point_to_add));
}
else {
	//------------------ mis à jour de la réaction ------------------------------
	$req = $bdd->prepare('UPDATE userStat SET point = point + ? WHERE id = ?');
	$req->execute(array($point_to_add, $result['id']));
}
	// update the publication point
	$req = $bdd->prepare('UPDATE CommentOfComment SET point = point + ? WHERE id_commentaire = ? ');
	$req->execute(array($point_to_add,$rp['comOfCom']));


// ici on va envoyer la requete de notification
require("notification.php") ;
notification($bdd,$personne['personne'],$rp['parentOfParent'],$rp['parent'],$rp['comOfCom'],$rp['personne']);

$req->closeCursor();
?>