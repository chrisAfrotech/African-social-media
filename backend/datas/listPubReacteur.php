 <?php


// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- vérifions si le compte existe déja -----------------------
$req = $bdd->prepare('SELECT reactionType, personne, nom, prenom, image FROM ReactionPublication, Personne WHERE publication = ? AND reactionType REGEXP  ? AND ReactionPublication.personne = Personne.id');
$req->execute(array($rp['publication'],$rp['reactionType']));
$data = Array() ;
while ($donnees = $req->fetch())
{
	$data[]= [ 'profile' => './profile.svg', 'name' => $donnees['nom'].' '.$donnees['prenom'], 'emoji' => $donnees['reactionType']];
}
echo(json_encode($data));
$req->closeCursor();
?>