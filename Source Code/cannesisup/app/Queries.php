<?php


class Queries
{
	public const ACTIVITES = "SELECT id, nom, nbre_max FROM activites";

	public const TIMES = "SELECT id, times FROM plages_horaires WHERE status = 'true'";

	public const PARTICIPANTS = "SELECT id, prenom, nom, entreprise FROM participants";

	public const TRUNCATE_NB_PLACES = "TRUNCATE activites_plageshoraires_nbplaces";

	public const TRUNCATE_RESULTATS =  "TRUNCATE resultats";

	public const TRUNCATE_PARTICIPANTS = "TRUNCATE participants";

	public static function getParticipantInfo ($idParticipant) {
		return "SELECT id, prenom, nom, afterwork, email, dodo, entreprise, lunchpack
				FROM participants
				WHERE id = $idParticipant";
	}

	public static function getParticipantPlanning ($idParticipants) {
		return "SELECT resultats.id_activite, activites.nom, resultats.id_plages_horaires, plages_horaires.times, resultats.id_participant 
				FROM resultats 
				INNER JOIN activites
				ON activites.id = resultats.id_activite
				INNER JOIN plages_horaires
				ON plages_horaires.id = resultats.id_plages_horaires
				WHERE id_participant = $idParticipants
				ORDER BY resultats.id_plages_horaires";
	}

	public static function getAllParticipants() {
		return "SELECT  id, prenom, nom,entreprise FROM participants";
	}

	public static function getParticipants ($id) {
		return "SELECT id, nom FROM participants WHERE id = {$id}";
	}

	public static function setActivitesPlagesHoraires ($idActivites, $idPlagesHoraires, $nbPlaces) {
		return "INSERT INTO activites_plageshoraires_nbplaces (idActivites, idPlages_horaires, nbPlaces) 
				VALUES ($idActivites, $idPlagesHoraires, $nbPlaces)
				ON DUPLICATE KEY UPDATE nbPlaces = $nbPlaces";
	}

	public static function getNbPlaces ($idActivites, $idPlagesHoraires) {
		return "SELECT nbPlaces FROM activites_plageshoraires_nbplaces WHERE idActivites = $idActivites AND idPlages_horaires = $idPlagesHoraires";
	}

	public static function updateNbPlaces ($idActivites, $idPlagesHoraires) {
		return "UPDATE activites_plageshoraires_nbplaces
				SET nbPlaces = nbPlaces - 1 
				WHERE idActivites = $idActivites 
				AND idPlages_horaires = $idPlagesHoraires";
	}

	public static function setParticipants (
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
	){

		return "INSERT INTO participants (
		prenom, 
		nom, 
		afterwork, 
		email, 
		dodo, 
		entreprise, 
		lunchPack, 
		activite_1, 
		activite_2, 
		activite_3, 
		activite_4, 
		activite_5
		) VALUES (
		'$prenom',
		'$nom',
		'$afterwork',
		'$email',
		'$dodo',
		'$entreprise',
		'$lunchPack',
		$choix1,
		$choix2,
		$choix3,
		$choix4,
		$choix5
		)";
	}

	public static function getIdActivites ($activiteStr) {
		return "SELECT id FROM activites WHERE nom = '{$activiteStr}'";
	}

	public static function getParticipantsActivite ($activiteNum, $idActivite) {
		return "SELECT id FROM participants WHERE activite_{$activiteNum} = {$idActivite}";
	}

	public static function setResults ($idParticipant, $idActivite, $idPlages_horaires) {
		return "INSERT INTO resultats (id_participant, id_activite, id_plages_horaires)
				VALUES ($idParticipant, $idActivite, $idPlages_horaires)
				ON DUPLICATE KEY UPDATE 
				id_participant = $idParticipant,
				id_activite = $idActivite,
				id_plages_horaires = $idPlages_horaires";
	}

	public static function getParticipantActiviteTime ($idParticipants, $idPlagesHoraires) {
		return "SELECT id_activite, id_plages_horaires, id_participant FROM resultats WHERE id_participant = $idParticipants AND id_plages_horaires = $idPlagesHoraires";
	}
}