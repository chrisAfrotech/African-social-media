<?php

session_id(2022);
session_start();

// getting datas from post
$rp = json_decode(file_get_contents('php://input'), true);
$rp['description']= htmlspecialchars ($rp['description']);

// ------------- connexion à la base de données --------------------------

require("connexion_bd.php") ;
$bdd = connexion_bd() ;

// ------ repcuperons les anciennes donnee ---------------------------

$req = $bdd->prepare('SELECT image, pseudo, photo_couverture, photo_profile FROM Personne WHERE id = ?');
$req->execute(array($rp['id']));
$result = $req->fetch();
$image = $result['image'];
$description = $result['pseudo'];
$photo_couverture = $result['photo_couverture'];
$photo_profile = $result['photo_profile'];
$textes = '';

//----------------------- function to add old file into the trash --------
function toCorbeille($oldImage, $bdd) {
	$req = $bdd->prepare('INSERT INTO Corbeille(file) VALUES(?)');
	$req->execute(array($oldImage));
}

// --------------- enregistrement, gestion des images et des anciennes ---------------------------
if(!isset($_SESSION['image_name']) || $_SESSION['image_name'] == '') {
	$textes .= 'image profile vide';	
}
else if($photo_profile != 'pulication_img/standard_profile.svg') {
		$textes .= 'profile ok';
		toCorbeille($photo_profile,$bdd);
		$photo_profile = $_SESSION['image_name'];
}
else {
		$textes .= 'profile ok';
		$photo_profile = $_SESSION['image_name'];	
}


// --------------- enregistrement du commentaire dans la BD ---------------------------
if(!isset($_SESSION['image_name2']) || $_SESSION['image_name2'] == '') {
	$textes .= '  image profile small vide';	
}
else if($image != 'pulication_img/standard_profile.svg'){
	$textes .= '  profile small ok';
	toCorbeille($image,$bdd);
	$image = $_SESSION['image_name2'];
}
else {
	$textes .= '  profile small ok';
	$image = $_SESSION['image_name2'];
}

// --------------- enregistrement du commentaire dans la BD ---------------------------
if(!isset($_SESSION['image_name1']) || $_SESSION['image_name1'] == '') {
	$textes .= '  imageCover vide';	
}
else if($photo_couverture != 'pulication_img/standard_cover.svg') {
	$textes .= '  cover ok';
	toCorbeille($photo_couverture,$bdd);
	$photo_couverture = $_SESSION['image_name1'];
}
else {
	$textes .= '  cover ok';
	$photo_couverture = $_SESSION['image_name1'];
}

// ---------- la  description ----------------------------
if($rp['description'] != '' ) { $description = $rp['description']; }


$req = $bdd->prepare('UPDATE Personne SET pseudo = ?, image = ?, photo_couverture = ?, photo_profile = ? WHERE id = ?');
$req->execute(array($description, $image, $photo_couverture, $photo_profile, $rp['id']));

// vidage...
$req->closeCursor();
echo $textes;
?>