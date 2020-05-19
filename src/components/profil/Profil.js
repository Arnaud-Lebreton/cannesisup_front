import React, { Component } from 'react';
import "./Profil.css"

//Il faut faire en sorte qu'à l'appuie du button confirmer || modifier certain element disparaissent ou reaparaisse
//Pour cacher plusieur element dans une condition ternaire on peut entourer tout les elements d'une balise
class Profil extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "Ziboni",
            surname: "Vadim",
            society_name : "DTF",
            society_description : "",
            society_activity_sector : "",
            society_adress : "",
            phone_number : "15910654",
            society_website : "",
            email : "vadim@dtc",
            work : "Manager inter-communication de nation",
            work_description : "manger du Cuir",
            isShow : true,
            isDisabled:true,
            image_profil:"../Images/Untitled.png",
            image_fond: "",
            image_logo:"",
            facebook: "",
            twitter: "",
            linkedin: "",
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
                            {!this.state.isDisabled && <button>Ajouter Image</button>}
                            
                        </div>
                        <div id= "image_Logo" >
                            <img src={require("../Images/Untitled.png")}/>
                            {!this.state.isDisabled && <button>Ajouter Image</button>}
                            {!this.state.isDisabled && <button>Ajouter Brochure</button>}
                            {this.state.isDisabled && <a href="../Images/Untitled.png" download="Untitled.png"><button type="button"><img src={require("../Images/download.png")}/><p>Telecharger Brochure</p></button></a>}
                        </div>
                        <div>
                            <input placeholder = "Nom de Votre Societé..." disabled={this.state.isDisabled} name="society_name"/>
                            <textarea placeholder = "Parlez-nous de celle-ci..."  disabled={this.state.isDisabled} name="society_info"/>
                            <input placeholder = "Son Secteur d'Activité..."  disabled={this.state.isDisabled} name="society_sector"/>
                        </div>
                        <div>
                            <h3>Coordonnées : </h3>
                            <label>Email : </label>
                            <input type = "email" placeholder = "Email" disabled={this.state.isDisabled}/>
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
                            <label>Linkedin : </label>
                            <input placeholder="Linkedin..." disabled={this.state.isDisabled}/>
                            <label>Facebook : </label>
                            <input placeholder="Facebook..." disabled={this.state.isDisabled}/>
                            <label>Twitter : </label>
                            <input placeholder="Twitter..." disabled={this.state.isDisabled}/>
                        </div>
                    </div>
                    <div id = "side_bloc">
                        <div id="profil_image">
                            <img src={this.state.image_profil}/>
                            {!this.state.isDisabled && <button>Ajouter Photo</button>}
                            
                        </div>
                        <div>
                            <input placeholder="Nom" disabled={this.state.isDisabled} name="name" value={this.state.name} onChange={this.handleChange}/>
                            <input placeholder="Prenom" disabled={this.state.isDisabled} name="surname" value={this.state.surname} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input placeholder="Profession..." disabled={this.state.isDisabled} name="profession"/>
                        </div>
                        <div>
                            <h3>Parole de membre</h3>
                            <textarea placeholder = "Description..." disabled={this.state.isDisabled} name="description"/>
                        </div>
                        <div id="interaction">
                            {this.state.isDisabled && <button onClick = {() => this.hide(false)} >Modifier</button>}
                            {!this.state.isDisabled && <button type="submit" onClick = {() => this.hide(true)}>Confirmer</button>}
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Profil;