<?php

// getting datas from post

$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- recoltons les identifains des commentaire of commentaire par réaction -----------------------

$req = $bdd->prepare('SELECT id_commentaire FROM CommentOfComment WHERE parent_comment = ? order BY id_commentaire ');
$req->execute(array($rp['parent_id']));

$data = Array() ;
while ($donnees = $req->fetch(PDO::FETCH_ASSOC))
{
	array_push($data, $donnees['id_commentaire']);
}
$data = json_encode($data);
print_r($data);

$req->closeCursor();
?>