<?php
require_once "./Database.php";
require_once "./Queries.php";
$database = Database::getInstance();

$idParticipant = intval(file_get_contents("php://input"));

$participantInfo = $database->db_query(Queries::getParticipantInfo($idParticipant), null, 1);
$participantPlanning = $database->db_query(Queries::getParticipantPlanning($idParticipant), null, 5);
$participant = ['participantInfo' => $participantInfo, 'participantPlanning' => $participantPlanning];
print(json_encode($participant));