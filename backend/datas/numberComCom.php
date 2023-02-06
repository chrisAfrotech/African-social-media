<?php

// getting datas from post

$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- nombre de commentaire pour la publication -----------------------

$req = $bdd->prepare('SELECT count(id_commentaire) FROM CommentOfComment WHERE parent_comment = ?');
$req->execute(array($rp['parent_comment']));
$result = $req->fetch(PDO::FETCH_ASSOC);

$data = json_encode($result['count(id_commentaire)']);
print_r($data);

$req->closeCursor();
?>