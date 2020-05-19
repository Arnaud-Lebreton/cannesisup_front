<?php
require_once "./Database.php";
require_once "./Queries.php";
$database = Database::getInstance();

// Vérifier la requête si elle est HTTP GET : fournir la liste des participants
if ($_SERVER['REQUEST_METHOD'] === 'GET') {


    $resultat = $database->db_query(Queries::getAllParticipants());


    header('Content-Type: application/json');

    // Réponse qui devra contenir les participants format JSON
    echo json_encode($resultat);

    exit;
}
