<?php


// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- vérifions si le compte existe déja -----------------------
$req = $bdd->prepare('SELECT point FROM Publication WHERE Publication.id_publication = ?');
$req->execute(array($rp['publication']));
$result = $req->fetch();

echo json_encode($result['point']);

$req->closeCursor()
?>