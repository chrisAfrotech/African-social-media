<?php


// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

//--------------------- vérifions si le compte existe déja -----------------------
$req = $bdd->prepare( <<<EOT

select number,date,publication, com, comOfCom, texte, status, nom, image
from (
select number, Notification.date,Notification.publication, Notification.com, Notification.comOfCom, Publication.titre as texte, Notification.status, Personne.nom, Personne.image
from Notification, Personne, Publication, (select count(*) as number, notification from Notificator group by notification) as notif
where com = 1 AND
comOfCom = 1 AND
personne = ? AND
Notification.last_notificator = Personne.id AND
publication = Publication.id_publication AND
Notification.id = notif.notification
UNION
(
select number, Notification.date,Notification.publication, Notification.com, Notification.comOfCom, Commentaire.texte, Notification.status, Personne.nom, Personne.image
from Notification, Personne, Commentaire, Publication, (select count(*) as number, notification from Notificator group by notification) as notif
where
com != 1 AND
comOfCom = 1 AND
Notification.personne = ? AND
Notification.last_notificator = Personne.id AND
com = Commentaire.id_commentaire AND
Notification.id = notif.notification
) 
UNION
(
select number, Notification.date ,Notification.publication, Notification.com, Notification.comOfCom, CommentOfComment.texte, Notification.status, Personne.nom, Personne.image
from Notification, Personne, CommentOfComment, Publication, (select count(*) as number, notification from Notificator group by notification) as notif
where
com != 1 AND
comOfCom != 1 AND
Notification.personne = ? AND
Notification.last_notificator = Personne.id AND
comOfCom = CommentOfComment.id_commentaire AND
Notification.id = notif.notification
)
) as result order by date desc limit 15
EOT
);
$req->execute(array($rp['personne'],$rp['personne'],$rp['personne']));
$data = Array();
while ($donnees = $req->fetch(PDO::FETCH_ASSOC))
{
  $data[]= $donnees;
}
echo(json_encode($data));

$req->closeCursor();
?>

