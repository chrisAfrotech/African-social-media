<?php

// getting datas from post

$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- recoltons les identifains des publications par réaction -----------------------
if($rp['typeRequest'] == 'by_reaction') {
	$req = $bdd->prepare('SELECT id_publication FROM Publication, ReactionPublication WHERE reactionType REGEXP ? AND Publication.id_publication = ReactionPublication.publication Group By id_publication order By COUNT(reactionType) desc');
	$req->execute(array($rp['reactionType'] ));
}

//--------------------- ordonné par ordre décroisssant du nombre de point -----------------------

if($rp['typeRequest'] == 'most_point') {
	$req = $bdd->query(' SELECT id_publication FROM Publication LEFT JOIN ReactionPublication ON Publication.id_publication = ReactionPublication.publication Group By id_publication order by SUM(ReactionPublication.point) desc');
}

//--------------------- Latest -----------------------

if($rp['typeRequest'] == 'latest') {
	$req = $bdd->query('SELECT id_publication FROM Publication ORDER BY id_publication DESC');
}

$data = Array() ;
while ($donnees = $req->fetch(PDO::FETCH_ASSOC))
{
	$data[] = $donnees['id_publication'];
}
$data = json_encode($data);
echo($data);

$req->closeCursor();
?>