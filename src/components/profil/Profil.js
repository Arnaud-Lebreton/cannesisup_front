import React, { Component } from 'react';
import "./Profil.css"

//Il faut faire en sorte qu'à l'appuie du button confirmer || modifier certain element disparaissent ou reaparaisse
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
            isDisabled:true,
            image_profil:"",
            image_fond: "",
            image_logo:"",
        };

        this.handleChange = this.handleChange.bind(this);
    }
    hide(a){
        this.setState({isDisabled : a});
    }
    handleChange(event){
        this.setState({name : event.target.value});
    }
    render(){
        return (
            <div>
                <div id="body">
                    <div id = "middle_bloc">
                        <div id="image_fond">
                            <img src={this.state.image_fond}/>
                            <button>Ajouter Image</button>
                        </div>
                        <div id= "image_Logo" >
                            <img src={require("../Images/Untitled.png")}/>
                            <button>Ajouter Image</button>
                        </div>
                        <div>
                            <input placeholder = "Nom de Votre Societé..." disabled={this.state.isDisabled} name="society_name"/>
                            <textarea placeholder = "Parlez-nous de celle-ci..."  disabled={this.state.isDisabled} name="society_info"/>
                            <input placeholder = "Son Secteur d'Activité..."  disabled={this.state.isDisabled} name="society_sector"/>
                        </div>
                        <div>
                            <h3>Coordonnées : </h3>
                            <label>Email : </label>
                            <input type = "email" placeholder = "Email" disabled={this.state.isDisabled} />
                            <label>Adresse : </label>
                            <input type = "text" placeholder = "Adresse" disabled={this.state.isDisabled} />
                            <label>Telephone : </label>
                            <input type = "tel" placeholder = "Telephone" disabled={this.state.isDisabled}/>
                            <label>Site : </label>
                            <a href = {this.state.society_website}></a>
                            <input type = "text" placeholder = "Site" disabled={this.state.isDisabled} />
                        </div>
                        <div>
                            <h3>Reseaux Sociaux : </h3>
                            <a>{this.state.society_website}</a>
                            <button>Ajouter Reseaux</button>
                        </div>
                    </div>
                    <div id = "side_bloc">
                        <div id="profil_image">
                            <img src={require("../Images/img_avatar.png")}/>
                            <button>Ajouter Photo</button>
                        </div>
                        <div>
                            <input placeholder="Nom et Prenom..." disabled={this.state.isDisabled} name="name" value={this.state.name} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input placeholder="Profession..." disabled={this.state.isDisabled} name="profession"/>
                        </div>
                        <div>
                            <h3>Parole de membre</h3>
                            <textarea placeholder = "Description..." disabled={this.state.isDisabled} name="description" />
                        </div>
                        <div id="interaction">
                            {this.state.isDisabled && <button onClick = {() => this.hide(false)} >Modifier</button>}
                            {!this.state.isDisabled && <button type="submit" onClick = {() => this.hide(true)}>Confirmer</button>}
                        </div>
                        <p>{this.state.name}</p>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Profil;