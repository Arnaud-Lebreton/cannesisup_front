import React, { Component } from 'react';
import "./formulaire.css"

class inscrip extends Component{
    constructor(props){
        super(props);
        this.state = {
            Nom : "",
            Prenom: "",
            Nom_Societe : "",
            Description_Societe : "",
            Activité_Societe : "",
            Adresse_Societe : "",
            Site_web_Societe : "",
            Email_Societe: "",
            
            Telephone : "",
            email : "",
            work : "",
            work_description : "",
            isShow : true,
            image_profil:"",
            image_fond: "",
            image_logo:"",
            facebook: "",
            twitter: "",
            linkedin: "",
        }
    }
    render(){
        return(
            <div id="formulaire">

                <div id="bande" style={{backgroundImage: "url(" + "Images/fond_contact.jpg" + ")"}}>
                    <h1>Inscription</h1>
                </div>
                <form> 
                    <h3>Infos Personnel</h3>
                    <label>Nom : </label>
                    <input type="text" placeholder="Nom..." required/>
                    <label>Prenom : </label>
                    <input type="text" placeholder="Prenom..." required/>
                    <label>Fonction : </label>
                    <input type="text" placeholder="Fonction..." required/>
                    <label>Email Privé : </label>
                    <input type="email" placeholder="Email..." required/>
                    <label>Mot de passe : </label>
                    <input type="pass" placeholder="Password..." required/>
                    <label>Photo portrait : </label>
                    <input type="file" placeholder="Photo..." required/>
                    <label>Previsualisation : </label>
                    <img/>
                    
                    <br/>
                    <h3>Infos Societé</h3>
                    <label>Adresse : </label>
                    <input type="text" placeholder="Adresse..." required/>
                    <label>Code Postal : </label>
                    <input type="number" placeholder="Code Postal..." required/>
                    <label>Secteur d'activité : </label>
                    <input type="text" placeholder="Secteur d'activité..."required/>
                    <label>Description d'activité : </label>
                    <textarea type="text" placeholder="Description d'activité..." rows="10" cols="33" required />
                    <label>Dossier de presentation en pdf : </label>
                    <input type="file" placeholder="Presentation..." required/>
                    <label>Logo de la societé : </label>
                    <input type="file" placeholder="Societé..." required/>
                    <label>Previsualisation : </label>
                    <img />
                    <br/ >
                    <label>Ville : </label>
                    <input type="text" placeholder="Ville..." required/>
                    <label>Telephone : </label>
                    <input type="number" placeholder="Adresse..."required />
                    <label>Email de la Societé : </label>
                    <input type="email" placeholder="Email..."required/>
                    <br/>
                    <label>Mode de payement : </label>
                    <select required >
                        <option>Carte Bancaire</option>
                        <option>Virement</option>
                    </select>
                    {/* Si carte bancaire choisis affiche les input concernant la CB, si virement envoie mail avec RIB */}
                    <br/>
                    <input type="checkbox" required/>
                    <p>Je conscent</p>
                    <br/>
                    <input type="checkbox" required/>
                    <p>Je conscent</p>
                    <br/>
                    <input type="submit" value="Confirmer" id="submit_but"/>
                    
                    
                </form>
            </div>
        )
    };
}

export default inscrip;