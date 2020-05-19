// Composant principal 
var displayVue = new Vue({

    // Id du body
    el: "#content",

    // Variables utilisées dans le composant
    data: {

        test: "test",

        participants: [],

        // Mise en cache des participants pour l'utilisation dans le filtrage
        participantsCache: [],

        // Valeur du filtre pour les noms et prenoms du participants
        filteringValue: '',

        participant: {},

    },

    /**
     * Fonction qui s'exécute toute seule après que le composant soit créé
     */
    created: function () {


        this.getAllParticipants();

    },


    // Fonctions utilisées dans le composant
    methods: {

        /**
         * Filtrer les jeux vidéos sur chaque saisie d'un caractère par l'utilisateur
         */
        onChangeFilter: function () {

            // Si la valeur du filtre est vide alors on affecte les copies originaux des participants à la variable affichée

            if (this.filteringValue.length == 0) {
                this.participants = this.participantsCache;
            } else {
                this.participants = this.participantsCache.filter(participant => {

                    // On crée ici une table qui contient les champs sur lesquels on applique le filtre
                    var filteredProperties = [participant.nom, participant.prenom, participant.entresprise];

                    // .some() -> Si au moins un des champs respecte la condition alors cette fonction retourne vrai. Sinon faux
                    return filteredProperties.some(value => {
                        if (value == null) {
                            return false;
                        } else {
                            return value.toLowerCase().includes(this.filteringValue.toLowerCase());
                        }
                    });
                });
            }
        },


        /**
         * Récuperer la liste des participants
         */
        getAllParticipants: function () {

            // Appel en GET
            axios.get('../app/participantsController.php').then(function (response) {
                displayVue.participantsCache = response.data;
                displayVue.participants = response.data;
                displayVue.onChangeFilter();
            });



        },
        showDetails: function(event) {
            let idParticipant = Number(event.target.parentElement.attributes.value.value);
            console.log(idParticipant);

            axios.post("../app/participantInfoController.php", idParticipant)
                .then((response) => {
                    this.participant = response.data;
                });
        }
    }
})