<?php

function notification($bdd,$personne,$publication,$com,$comOfCom,$notificator){


	/* pour rappel: 
				notificator =  déclancheur la notification sur le post
				 title = le titre du post
				 number = le nombre de personne qui ont réagi au post
				 statut = si la notification à été lu ou pas, si le statut est 0 elle ne l'a pas été si 1 elle l'a été
	*/

	//------------------ creation de la nouvelle notification -------------------------------------------------
	$req = $bdd->prepare(
	<<<EOT
	INSERT INTO Notification(personne,publication,com,comOfCom,date,last_notificator) 
	VALUES (?,?,?,?,NOW(),?) 
	ON DUPLICATE KEY UPDATE
	date = NOW(),
	last_notificator = ?,
	status = 0
	EOT
	);
	$req->execute(array($personne,$publication,$com,$comOfCom,$notificator,$notificator));

//----- recherchons l'id de la ligne modifié ou ajouté
	$req = $bdd->prepare( <<<EOT
	SELECT id
	FROM Notification
	WHERE personne = ? AND
	publication = ? AND
	com = ? AND
	comOfCom = ?
	EOT
	);
	$req->execute(array($personne,$publication,$com,$comOfCom));
	$result = $req->fetch(PDO::FETCH_ASSOC);

// insertion du notificateur dans la table des notificateurs

	$req = $bdd->prepare( <<<EOT
		INSERT IGNORE INTO Notificator(notification,notificator)
		VALUES (?,?);
	EOT
	);
	$req->execute(array($result['id'],$notificator));

	$req->closeCursor();
}
?>