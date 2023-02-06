<?php


// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- vérifions si le compte existe déja -----------------------
$req = $bdd->prepare( <<<EOT
SELECT Personne.id as id,nom,prenom, image, SUM(userStat.point) as point, SUM(number_published) as numberPublished
FROM Personne, userStat
WHERE Personne.id = userStat.personne
AND type REGEXP ?
GROUP BY userStat.personne
ORDER BY point DESC
LIMIT 10
EOT
);
$req->execute(array($rp['type']));
$data = Array() ;
while ($donnees = $req->fetch(PDO::FETCH_ASSOC))
{
  $data[] = $donnees;
}
echo(json_encode($data));

$req->closeCursor();
?>