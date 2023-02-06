<?php


// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- fetching the total -----------------------
$req = $bdd->prepare( <<<EOT
SELECT 'Total' as type, SUM(point) as total, SUM(number_published) as published
FROM userStat WHERE personne = ?
EOT
);
$req->execute(array($rp['id']));
$result = $req->fetch(PDO::FETCH_ASSOC);

//--------------------- fetching by field -----------------------
$req = $bdd->prepare( <<<EOT
SELECT type, point as total, number_published as published
FROM userStat WHERE personne = ?
ORDER BY total DESC
EOT
);
$req->execute(array($rp['id']));
$data = Array() ;
$data[] = $result ;
while ($donnees = $req->fetch(PDO::FETCH_ASSOC))
{
  $data[] = $donnees;
}
echo(json_encode($data));

$req->closeCursor();
?>