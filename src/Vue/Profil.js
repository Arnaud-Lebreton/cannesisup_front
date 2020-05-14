import React from 'react';

function profil() {
    
    return (
    <div>
        <div id = "middle_bloc">
            {/* Lorsque l'utilisateur clique a un autre endroit que le champ input, Ce qui y est ecrit est automatiquement sauvegardé */}
            <div>
                <img id= "image_Fond"/>
                <a onClick = {/* Ouvre l'explorateur pour recuperer l'image puis l'envoyer a un id */}>Changer le fond</a>
            </div>

            <div>
                <img source={/* Charger l'image a partir de celle envoyé*/} id= "image_Logo" />
                <button onClick = {/* Ouvre l'explorateur pour recuperer l'image puis l'envoyer a un id */}>Telecharger Brochure</button>
            </div>
            <div>
                <h2>Nom de Société</h2>
                <input  placeholder = "Nom de Votre Societé..." />
                <input placeholder = "Parlez-nous de celle-ci..." />
                <input placeholder = "Son Secteur d'Activité..." />
            </div>
            <div>
                <h2>Coordonnées : </h2>
                <p>{/*Placer le mail input*/}</p>
                <input type = "email" placeholder = "Email" />
                <p>{/*Placer le adresse input*/}</p>
                <input type = "text" placeholder = "Adresse" />
                <p>{/*Placer le Telephone input*/}</p>
                <input type = "tel" placeholder = "Telephone" />
                <a href = {/*Input result */}></a>
                <input type = "text" placeholder = "Site" />
            </div>
            <div>
                <h2>Reseaux Sociaux : </h2>
                <a>href = {/*Dupliquer si plusieurs et mettre lien*/}</a>
            </div>
        </div>
        <div id = "side_bloc">
            <div>
                <img id = "image_Profil"/>
                <a onClick = {/* Ouvre l'explorateur pour recuperer l'image puis l'envoyer a un id */} >Ajouter une Photo de Profil</a>
            </div>
            <div>
                <h2>{/*Placer le texte input*/}</h2>
                <input placeholder="Nom et Prenom" />
            </div>
            <div>
                <h2>{/*Placer le texte input*/}</h2>
                <input placeholder="Profession" />
            </div>
            <div>
                <h2>Paroles de membre</h2>
                <textarea placeholder = "Description..." />
            </div>
        </div>
        {/* Confirmation des infos */}
        <button>Confirmer</button>
    </div>
    );
}

export default profil;