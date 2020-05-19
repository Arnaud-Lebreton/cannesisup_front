<?php
$dossier = '../CSV/'; // Dossier où sera stocker le fichier uploadé
$fichier = basename($_FILES['csv']['name']); // Fichier à envoyer
$taille_maxi = 199999900000; // Taille maximum du fichier autorisé à passer sur l'upload en octets
$taille = filesize($_FILES['csv']['tmp_name']); // Taille du fichier
$extensions = array('.csv'); // Tableau contenant les extensions autorisées (CSV ici)
$extension = strrchr($_FILES['csv']['name'], '.');  // Récupèration de la partie de la chaine, à partir du dernier '.' pour connaître l'extension.
//Début des vérifications de sécurité...
// Début du test :
if (!in_array($extension, $extensions)) // Si l'extension n'est pas dans le tableau
{
    $erreur = 'Vous devez uploader un fichier de type ".csv"...';
}
if ($taille > $taille_maxi) // Si la taille du fichier dépasse la taille maximum demandée
{
    $erreur = 'Le fichier est trop gros...';
}
if (!isset($erreur)) // S'il n'y a pas d'erreur, on upload
{
    //On remplace les lettres accentutées par les non accentuées dans $fichier.
    //Et on récupère le résultat dans fichier.
    $fichier = strtr(
        $fichier,
        'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ',
        'AAAAAACEEEEIIIIOOOOOUUUUYaaaaaaceeeeiiiioooooouuuuyy'
    );

    //En dessous, il y a l'expression régulière qui remplace tout ce qui n'est pas une lettre non accentuées ou un chiffre
    //dans $fichier par un tiret "-" et qui place le résultat dans $fichier.
    $fichier = preg_replace('/([^.a-z0-9]+)/i', '-', $fichier);
    if (move_uploaded_file($_FILES['csv']['tmp_name'], $dossier . $fichier)) // Si la fonction renvoie TRUE, c'est que ça a fonctionné...
    {
        print (json_encode(true));
    } else //Sinon (la fonction renvoie FALSE).
    {
        print (json_encode(false));
    }
} else {
	print (json_encode($erreur));
}
