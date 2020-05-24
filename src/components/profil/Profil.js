import React, { Component } from 'react';
import "./Profil.css";
import ProfilJson from "../fictivesdata/membershipData.json";

//Il faut faire en sorte qu'à l'appuie du button confirmer || modifier certain element disparaissent ou reaparaisse
//Pour cacher plusieur element dans une condition ternaire on peut entourer tout les elements d'une balise
class Profil extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            surname: "",
            society_name : "",
            society_description : "",
            society_activity_sector : "",
            society_adress : "",
            phone_number : "",
            society_website : "",
            email : "",
            work : "",
            work_description : "",
            isDisabled:true,
            image_profil:"",
            image_fond: "",
            image_logo:"",
            facebook: "",
            twitter: "",
            linkedin: "",
            border: "none",
            background_color : "none",
        };

        this.handleChange = this.handleChange.bind(this);
    }
    hide(a){
        this.setState({isDisabled : a});
        if(this.state.isDisabled){
            this.setState({background_color: "rgb(188, 229, 255)"})
        }
        else{
            this.setState({border : "none"  , background_color: "white"})
        }
    }
    handleChange(event){
        this.setState({name : event.target.value});
    } 
    componentDidMount(){
        this.datimport();
    }
    datimport(){

        const option = {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
            mode:"cors",
        };
        fetch("http://localhost:8080/profil/upload?id=5ec686436bbe21510463a1ad", option)
        .then(res => res.json())
        .then(data => {
            this.setState({
                name :data[0].compagnyRepresentName,
                surname: data[0].compagnyRepresentLastname,
                society_name : data[0].compagnyName,
                society_description : data[0].compagnyPresentationFile,
                society_activity_sector : data[0].compagnyActivityArea,
                society_adress : data[0].compagnyAdress,
                phone_number : data[0].compagnyTelephon,
                society_website : data[0].compagnyWebside,
                email : data[0].compagnyEmail,
                work : data[0].compagnyRepresentFunction,
                work_description : data[0].compagnyRepresentQuote,
                image_profil:data[0].compagnyRepresentPhoto,
                image_fond: data[0].compagnyCoverPhoto,
                image_logo:data[0].compagnyLogo,
                facebook: data[0].compagnyFacebook,
                twitter: data[0].compagnyTwitter,
                linkedin: data[0].compagnyLinkedin,
            });
        });
    }
    
    render(){
        return (
            <div>
                <div id="body">
                    <div id = "middle_bloc" >
                        <div id="image_fond" style={{backgroundImage: "url(" + this.state.image_fond + ")"}}>
                            {!this.state.isDisabled && <button >Ajouter Image</button>}
                            
                        </div>
                        <div id= "image_Logo" className="paddingthis">
                            <img id="logo_ent" src={this.state.image_logo}/>
                            {!this.state.isDisabled && <button>Ajouter Image</button>}
                            {!this.state.isDisabled && <button>Ajouter Brochure</button>}
                            {this.state.isDisabled && <button id="download" type="button">Telecharger Brochure <img src="Images/Icones/download.png"/></button>}
                        </div>
                        <div className="paddingthis">
                            <input style={{border: this.state.border , backgroundColor: this.state.background_color}} placeholder = "Nom de Votre Societé..." disabled={this.state.isDisabled} name="society_name" value={this.state.society_name}/>
                            <textarea style={{border: this.state.border , backgroundColor: this.state.background_color}} placeholder = "Parlez-nous de celle-ci..."  disabled={this.state.isDisabled} name="society_info" value={this.state.society_description}/>
                            <input style={{border: this.state.border , backgroundColor: this.state.background_color}} placeholder = "Son Secteur d'Activité..."  disabled={this.state.isDisabled} name="society_sector" value={this.state.society_activity_sector}/>
                        </div>
                        <div className="paddingthis">
                            <h3>Coordonnées : </h3>
                            <label>Email de la Societé : </label>
                            <input style={{border: this.state.border , backgroundColor: this.state.background_color}} type = "email" placeholder = "Email" disabled={this.state.isDisabled} value={this.state.email}/>
                            <label>Adresse : </label>
                            <input style={{border: this.state.border , backgroundColor: this.state.background_color}} type = "text" placeholder = "Adresse" disabled={this.state.isDisabled} value={this.state.society_adress} />
                            <label>Telephone : </label>
                            <input style={{border: this.state.border , backgroundColor: this.state.background_color}} type = "decimal" placeholder = "Telephone" disabled={this.state.isDisabled} value={this.state.phone_number}/>
                            <label>Site : </label>
                            <a href = {this.state.society_website}></a>
                            <input style={{border: this.state.border , backgroundColor: this.state.background_color}} type = "text" placeholder = "Site" disabled={this.state.isDisabled}  value={this.state.society_website}/>
                        </div >
                        <div id="social" className="paddingthis" >
                            <h3>Reseaux Sociaux : </h3>
                            <label>Linkedin : </label>
                            <input style={{border: this.state.border  , backgroundColor: this.state.background_color}} placeholder="Linkedin..." disabled={this.state.isDisabled} value={this.state.linkedin}/>
                            <label>Facebook : </label>
                            <input style={{border: this.state.border , backgroundColor: this.state.background_color}} placeholder="Facebook..." disabled={this.state.isDisabled} value={this.state.facebook}/>
                            <label>Twitter : </label>
                            <input style={{border: this.state.border , backgroundColor: this.state.background_color}} placeholder="Twitter..." disabled={this.state.isDisabled} value={this.state.twitter}/>
                        </div>
                    </div>
                    <div id = "side_bloc">
                        <div id="profil_image">
                            <img src={this.state.image_profil}/>
                            {!this.state.isDisabled && <button>Ajouter Photo</button>}
                        </div>
                        <div>
                            <input style={{border: this.state.border , backgroundColor: this.state.background_color}} placeholder="Nom" disabled={this.state.isDisabled} name="name" value={this.state.name} onChange={this.handleChange}/>
                            <input style={{border: this.state.border , backgroundColor: this.state.background_color}} placeholder="Prenom" disabled={this.state.isDisabled} name="surname" value={this.state.surname} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input style={{border: this.state.border , backgroundColor: this.state.background_color}} placeholder="Profession..." disabled={this.state.isDisabled} name="profession" value={this.state.work}/>
                        </div>
                        <div>
                            <h3>Parole de membre</h3>
                            <textarea style={{border: this.state.border , backgroundColor: this.state.background_color}} placeholder = "Description..." disabled={this.state.isDisabled} name="description" value={this.state.work_description}/>
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