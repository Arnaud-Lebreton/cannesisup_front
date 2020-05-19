<?php
require_once "./classes/ParticipantsFromCsv.php";
require_once "./classes/StringManager.php";
require_once "./Database.php";
require_once "./Queries.php";
$data = file_get_contents("php://input");
$database = Database::getInstance();
$urlCSV = "../CSV/$data";


/**
 * @description reset tables resultats and participants and reset their index to 1;
 * @param $database
 */
function resetTables($database) {
	$database->db_execute(Queries::TRUNCATE_RESULTATS);
	$participantsId = $database->db_query("SELECT id FROM participants ORDER BY id DESC");
	$idMax = intval($participantsId[0]->id);
	for ($id = 1; $id <= $idMax; $id++) {
		$database->db_execute("DELETE FROM participants WHERE id = $id");
	}
	$database->db_execute("ALTER TABLE participants AUTO_INCREMENT = 1");
}

if (fopen($urlCSV, "r")) {

	resetTables($database);

    $csv = fopen($urlCSV, "r");
    $csvFile = file($urlCSV);
    $count = count($csvFile);
    $participants = [];

    for ($i = 0; $i < $count-3; $i++) {

        $participant = fgetcsv($csv, 0, ";");


	    if ($i > 0) { // pour éviter la ligne des titres

	        $prenom = StringManager::cleaner($participant[2]);
	        $nom = StringManager::cleaner($participant[3]);
	        $afterwork = StringManager::cleaner($participant[7]);
	        $email = StringManager::cleaner($participant[12]);
	        $dodo = StringManager::cleaner($participant[16]);
	        $entreprise = StringManager::cleaner($participant[23]);
	        $lunchPack = StringManager::cleaner($participant[26]);
	        $participantChoicesFromCsv = [25, 30, 31, 32, 35];
	        $choix1 = $choix2 = $choix3 = $choix4 = $choix5 = null;

	        for ($choice = 0; $choice < count($participantChoicesFromCsv); $choice++) {
	            if (empty($participant[$participantChoicesFromCsv[$choice]])) { // si le choix activité est vide dans le csv
	                ${'choix' . ($choice+1)} = "NULL"; // construction dynamique de la variable $choixN ($choix1, $choix2, etc...)
                } else {
		            ${'choix' . ($choice+1)} = intval($database->db_query(Queries::getIdActivites(StringManager::cleaner($participant[$participantChoicesFromCsv[$choice]])), null, 1)->id);
                }
            }

		    $participantFromCsv = new ParticipantsFromCsv(
			    $prenom,
			    $nom,
			    $afterwork,
			    $email,
			    $dodo,
			    $entreprise,
			    $lunchPack,
			    $choix1,
			    $choix2,
			    $choix3,
			    $choix4,
			    $choix5
            );

		    $participants[] = $participantFromCsv;
            $database->db_execute(Queries::setParticipants(
                $participantFromCsv->getPrenom(),
                $participantFromCsv->getNom(),
                $participantFromCsv->getAfterwork(),
                $participantFromCsv->getEmail(),
                $participantFromCsv->getDodo(),
                $participantFromCsv->getEntreprise(),
                $participantFromCsv->getLunchPack(),
                $participantFromCsv->getChoix1(),
                $participantFromCsv->getChoix2(),
                $participantFromCsv->getChoix3(),
                $participantFromCsv->getChoix4(),
                $participantFromCsv->getChoix5()
            ));
        }
    }
	fclose($csv);
	print (json_encode(true));
} else (json_encode(false));


