<?php

//---------- récupération de l'id de la publication----------------------------

$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;


// lets fech author informations 

$req = $bdd->prepare('SELECT age, date_inscription, id, image, nation, nom, photo_couverture, photo_profile, prenom, pseudo, sexe FROM Personne where id=?');
$req->execute(array($rp['id']));
$result = $req->fetch(PDO::FETCH_ASSOC);

$data = json_encode($result);
echo($data);

$req->closeCursor();
?>