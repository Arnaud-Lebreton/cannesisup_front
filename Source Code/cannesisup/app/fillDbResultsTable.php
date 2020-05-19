<?php
set_time_limit(1000);
require_once "./Database.php";
require_once "./Queries.php";

$database = Database::getInstance();

$activites = $database->db_query(Queries::ACTIVITES,'Activites');
$times = $database->db_query(Queries::TIMES, 'Times');

$database->db_execute(Queries::TRUNCATE_NB_PLACES);
$database->db_execute(Queries::TRUNCATE_RESULTATS);

foreach ($activites as $activite) { // pour remplir la table de jointure activites_plageshoraires_nbplaces avec le nombre de place de chaque activite pour chaque créneau horaire
	$idActivite = $activite->getId();
	$nbreMax = $activite->getNbreMax();
	foreach ($times as $time) {
		$idTime = $time->getId();
		$database->db_execute(Queries::setActivitesPlagesHoraires($idActivite, $idTime, $nbreMax));
	}
}

// loop choix
for ($activiteNum = 0; $activiteNum < 5; $activiteNum++) {

	foreach ( $activites as $activite ) {
		$idActivite = $activite->getId();
		// tableau de participants de l'activité ($idActivite)
		$participantsActivite = $database->db_query(Queries::getParticipantsActivite($activiteNum+1, $idActivite));
		// loop on $participantsActivite to fill result with idParticipant
		for ($participant = 0; $participant < count($participantsActivite); $participant++) {

			$idParticipant = $participantsActivite[$participant]->id;

			for ($time = 0; $time < count($times); $time++) {
				$idTime = $times[$time]->getId();
				// check if participant is already booked
				$resultExists = $database->db_query(Queries::getParticipantActiviteTime($idParticipant, $idTime), null, 1);
				if ($resultExists) {
					continue;
				}

				$placesRemaining = intval($database->db_query(Queries::getNbPlaces($idActivite, $idTime), null, 1)->nbPlaces);
				if ($placesRemaining === 0) {
					continue;
				}

				// var_dump("choix : $activiteNum / participant : $idParticipant / plages horaires : $idTime / activité : $idActivite");
				$database->db_execute(Queries::setResults($idParticipant, $idActivite, $idTime));
				$database->db_execute(Queries::updateNbPlaces($idActivite, $idTime));
				break;
			}
		}
	}
}

print (json_encode(true));