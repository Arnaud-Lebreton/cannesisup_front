import React, { Component } from 'react';
import "./Profil.css"
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
            isDisabled:false,
        };

        this.handleChange = this.handleChange.bind(this);
    }
    hide(a){
        this.setState({isDisabled : a});
    }
    handleChange(event){
        this.setState({value : event.target.value});
    }
    render(){
        return (
            <div>
                <div id="body">
                    <div id = "middle_bloc">
                        <div id="image_fond">
                            <img />
                            <button>Ajouter Image</button>
                        </div>
            
                        <div id= "image_Logo" >
                            <img src={require("../Images/Untitled.png")}/>
                            <button>Ajouter Image</button>
                        </div>
                        <div>
                            <h2>{this.state.society_name}</h2>
                            <input placeholder = "Nom de Votre Societé..." disabled={this.state.isDisabled}/>
                            <textarea placeholder = "Parlez-nous de celle-ci..."  disabled={this.state.isDisabled}/>
                            <input placeholder = "Son Secteur d'Activité..."  disabled={this.state.isDisabled}/>
                        </div>
                        <div>
                            <h2>Coordonnées : </h2>
                            <input type = "email" placeholder = "Email" disabled={this.state.isDisabled} />
                            <input type = "text" placeholder = "Adresse" disabled={this.state.isDisabled} />
                            <input type = "tel" placeholder = "Telephone" disabled={this.state.isDisabled}/>
                            <a href = {this.state.society_website}></a>
                            <input type = "text" placeholder = "Site" disabled={this.state.isDisabled} />
                        </div>
                        <div>
                            <h2>Reseaux Sociaux : </h2>
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
                            <h2>{this.state.name}</h2>
                            <input placeholder="Nom et Prenom" disabled={this.state.isDisabled}/>
                        </div>
                        <div>
                            <h2>{this.state.work} </h2>
                            <input placeholder="Profession" disabled={this.state.isDisabled}/>
                        </div>
                        <div>
                            <h2>{this.state.work_description}</h2>
                            <textarea placeholder = "Description..." disabled={this.state.isDisabled} />
                        </div>
                        <div id="interaction">
                            <button onClick = {() => this.hide(false)}>Modifier</button>
                            <button onClick = {() => this.hide(true)}>Confirmer</button>
                        </div>
                        
                    </div>
                </div>  
            </div>
        )
    }
}

export default Profil;