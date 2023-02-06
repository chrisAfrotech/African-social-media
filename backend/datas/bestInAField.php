<?php


// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- vérifions si le compte existe déja -----------------------
$req = $bdd->prepare( <<<EOT
SELECT Personne.id as id,nom, image, userStat.point as somme
FROM Personne, userStat
WHERE Personne.id = userStat.personne
AND type REGEXP ?
AND userStat.point= (
   SELECT MAX(somme) 
   FROM (
   SELECT SUM(point) as somme
   FROM userStat
   WHERE type REGEXP ?
   GROUP BY userStat.id) as deffre)

EOT
);
$req->execute(array($rp['type'],$rp['type']));
$result = $req->fetch(PDO::FETCH_ASSOC);
echo(json_encode($result));

$req->closeCursor();
?>