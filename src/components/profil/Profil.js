import React, { Component } from 'react';

class Profil extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            society_name : "",
            society_description : "",
            society_activity_sector : "",
            society_adress : "",
            phone_number : "",
            society_website : "",
            email : "",
            work : "",
            work_description : "",
            isShow : true,
        }

        this.handleChange = this.handleChange.bind(this);
    }
    hide_show(){
        {/* Fonction qui cache ou montre un element */}   
    }
    handleChange(event){
        this.setState({value : event.target.value})
    }
    {/*Faire en sorte que lors du click du button confirmer, les valeurs change puis les inputs disparaissent */}
    render(){
        return (
            <div>
                <div id = "middle_bloc">
                    {/* Lorsque l'utilisateur clique a un autre endroit que le champ input, Ce qui y est ecrit est automatiquement sauvegardé */}
                    <div>
                        <img id= "image_Fond"/>
                        <input type="file" />
                    </div>
        
                    <div>
                        <img source={/* Charger l'image a partir de celle envoyé*/} id= "image_Logo" />
                        <input type="file" />
                    </div>
                    <div>
                        <h2>{this.state.society_name}</h2>
                        <input placeholder = "Nom de Votre Societé..." value= {this.state.society_name} />
                        <textarea placeholder = "Parlez-nous de celle-ci..." value= {this.state.society_description} />
                        <input placeholder = "Son Secteur d'Activité..." value= {this.state.society_activity_sector} />
                    </div>
                    <div>
                        <h2>Coordonnées : </h2>
                        <p>{this.state.email}</p>
                        <input type = "email" placeholder = "Email" value= {this.state.email} />
                        <p>{this.state.society_adress}</p>
                        <input type = "text" placeholder = "Adresse" value= {this.state.society_adress} />
                        <p>{this.state.phone_number}</p>
                        <input type = "tel" placeholder = "Telephone" value= {this.state.phone_number}/>
                        <a href = {this.state.society_website}></a>
                        <input type = "text" placeholder = "Site" value= {this.state.society_website} />
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
                        <h2>{this.state.name}</h2>
                        <input placeholder="Nom et Prenom" value={this.state.name} />
                    </div>
                    <div>
                        <h2>{this.state.work} </h2>
                        <input placeholder="Profession" value= {this.state.work} />
                    </div>
                    <div>
                        <h2>{this.state.work_description}</h2>
                        <textarea placeholder = "Description..." value= {this.state.work_description} />
                    </div>
                    <button onClick = {hide_show()}>Modifier</button>
                </div>
                <button onClick = {hide_show()}>Confirmer</button>
            </div>
        )
    }
}

export default profil;