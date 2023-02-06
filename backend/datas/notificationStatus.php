<?php


// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- vérifions si le compte existe déja -----------------------
$req = $bdd->prepare( <<<EOT
SELECT count(id) as number
FROM
(SELECT id, status
FROM Notification
WHERE
personne = ?
LIMIT 15
) as someTabme
WHERE
status = 0
EOT
);
$req->execute(array($rp['personne']));
$result = $req->fetch(PDO::FETCH_ASSOC);
echo(json_encode($result['number']));

$req->closeCursor();
?>