 <?php


// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- vérifions si le compte existe déja -----------------------
$req = $bdd->prepare('SELECT reactionType, COUNT(id) FROM ReactionCommentaire WHERE commentaire = ? GROUP BY reactionType');
$req->execute(array($rp['commentaire']));
$data = Array() ;
$total = 0;
while ($donnees = $req->fetch())
{
	$data += [$donnees['reactionType'] => $donnees['COUNT(id)']];
	$total += $donnees['COUNT(id)'];
}
$data += ['total' => $total];
echo(json_encode($data));
$req->closeCursor();
?>