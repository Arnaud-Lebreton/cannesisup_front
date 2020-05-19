<?php
require_once "Database.php";

$database = Database::getInstance();
$query = "SELECT id FROM participants";
$participants = $database->db_query($query);
$randoms = [];

for ($i = 0; $i < count($participants); $i++) {
	$randoms = [];
	$idParticipant = intval($participants[$i]->id);
	var_dump($idParticipant);
	for ($j = 1; $j <= 5; $j++) {
		$random = intval(floor(rand(0, 27)));
		$random = $random === 0 ? 'NULL' : $random;
		$randoms[] = $random;
	}
	$update  = "UPDATE participants SET activite_1 = $randoms[0], 
										activite_2 = $randoms[1], 
										activite_3 = $randoms[2], 
										activite_4 = $randoms[3], 
										activite_5 = $randoms[4] 
					WHERE id = $idParticipant";
	var_dump($update);
}



