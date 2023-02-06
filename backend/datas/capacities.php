<?php


// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- vérifions si le compte existe déja -----------------------
$req = $bdd->prepare( <<<EOT
SELECT type, point as total
FROM userStat
WHERE personne = ?
ORDER BY point DESC
EOT
);
$req->execute(array($rp['personne']));
$data = Array() ;
while ($donnees = $req->fetch(PDO::FETCH_ASSOC))
{
  $data[]= $donnees;
}
echo(json_encode($data));

$req->closeCursor();
?>