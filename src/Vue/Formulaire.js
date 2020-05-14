import React from 'react';


// Objectif :> 
// 1-> Enregistrer les données avec un register
// 2-> Envoyer un mail lors de la creation du compte
/* 3-> Possibilité de modifier le profil en cliquant sur un boutton:
        1-> Sur un hover sur l'info en question, l
        2-> Possibilitté d'enregistrer le logo d'entreprise via la modification
*/
function Profil() {
    
    return (
    <div>
        {/* Bloc du milieu avec :> 
        image de fond, 
        icone si existante, 
        button pour telecharger logo,
        Description, 
        Secteur d'activité,
        Coordonnées,
        Reseaux
        */}
        <div id = "middle_bloc">
            <img {/* Background */}/>
            <img {/* Logo societé */}/>
            <button {/* Telecharger brochure */}/>
            <h2>{/* nom de societé */}</h2>
            <p>{/* Description si existant sinon mettre un button pour ajouter une description*/}</p>
            <p>{/* Secteur d'activité */}</p>
            <p>{/* Coordonnées */}</p>
            <p>{/* Reseaux si existant*/}</p>
        </div>
        {/* Bloc de droite avec :> 
        PDP,
        Profession,
        Nom,
        Description
        */}
        <div id = "side_bloc">
            <img  {/* Photo de profil */}/>
            <h2> {/* Profession */}</h2>
            <p> {/* Nom */}</p>
            <h2> {/* Description */}</h2>
            <p>{/* Description */}</p>
        </div>
    </div>
    );
}

export default App;