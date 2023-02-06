<?php

// getting datas from post

$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- recoltons les identifains des publications par réaction -----------------------
if($rp['typeRequest'] == 'mypub') {
	$req = $bdd->prepare('SELECT id_publication FROM Publication WHERE personne_publication = ? order By id_publication desc');
	$req->execute(array($rp['personne']));
}
// the publication on with the user reacted too
if($rp['typeRequest'] == 'reacted') {
	$req = $bdd->prepare('SELECT publication as id_publication FROM ReactionPublication WHERE personne = ? order By id desc');
	$req->execute(array($rp['personne']));
}

$data = Array() ;
while ($donnees = $req->fetch(PDO::FETCH_ASSOC))
{
	$data[] = $donnees['id_publication'];
}
$data = json_encode($data);
echo($data);

$req->closeCursor();
?>