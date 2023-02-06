<?php


// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- vérifions si le compte existe déja -----------------------
$req = $bdd->prepare('SELECT reactionType FROM ReactionPublication WHERE publication = ? AND personne = ?');
$req->execute(array($rp['publication'],$rp['personne']));
$result = $req->fetch();
if(!$result) {
	//------------------ retourne la réaction ---------------
	echo json_encode('handshake');
}
else {
	//------------------ retourne la réaction ---------------
	echo json_encode($result['reactionType']);
}


$req->closeCursor();
?>