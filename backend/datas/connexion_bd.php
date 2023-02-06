 <?php
function connexion_bd() {
	try
	{
	$bdd = new PDO('mysql:host=localhost;dbname=LOVE1', 'root', 'root');
	    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	    return $bdd;
	}
	catch (Exception $e)
	{
	die('Erreur : ' . $e->getMessage());
		echo 'echec, ouaiq c\'était le plus probable!';
	}
}
?>
