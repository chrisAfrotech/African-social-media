<?php

//---------- récupération de l'id de la publication----------------------------

$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- vérifions si le compte existe déja -----------------------
$req = $bdd->prepare('SELECT * FROM CommentOfComment where id_commentaire=?');
$req->execute(array($rp['id']));
$result = $req->fetch(PDO::FETCH_ASSOC);

// lets fech author informations 

$req1 = $bdd->prepare('SELECT id as auth_id, nom, prenom, image as auth_img FROM Personne where id=?');
$req1->execute(array($result['personne']));
$result1 = $req1->fetch(PDO::FETCH_ASSOC);
$data = array_merge($result,$result1);

$data = json_encode($data);
echo($data); 
$req1->closeCursor();
$req->closeCursor();
?>