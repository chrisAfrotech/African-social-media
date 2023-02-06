<?php

// getting datas from post

$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- recoltons les identifains des publications par réaction -----------------------
if($rp['typeRequest'] == 'by_reaction') {
	$req = $bdd->prepare('SELECT id_commentaire FROM Commentaire, ReactionCommentaire WHERE publication = ? AND reactionType REGEXP ? AND Commentaire.id_commentaire = ReactionCommentaire.commentaire Group By id_commentaire order By COUNT(reactionType) desc');
	$req->execute(array($rp['publication'], $rp['reactionType'] ));
}

//--------------------- ordonné par ordre décroisssant du nombre de point -----------------------

if($rp['typeRequest'] == 'most_point') {
	$req = $bdd->prepare(' SELECT id_commentaire FROM Commentaire LEFT JOIN ReactionCommentaire ON Commentaire.id_commentaire = ReactionCommentaire.commentaire WHERE publication = ? Group By id_commentaire order by SUM(ReactionCommentaire.point) desc');
	$req->execute(array($rp['publication']));
}

//--------------------- Latest -----------------------

if($rp['typeRequest'] == 'latest') {
	$req = $bdd->prepare('SELECT id_commentaire FROM Commentaire WHERE publication = ? ORDER BY id_commentaire DESC');
	$req->execute(array($rp['publication']));
}

$data = Array() ;
while ($donnees = $req->fetch(PDO::FETCH_ASSOC))
{
	array_push($data, $donnees['id_commentaire']);
}
$data = json_encode($data);
print_r($data);

$req->closeCursor();
?>