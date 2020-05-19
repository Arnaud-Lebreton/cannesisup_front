// Composant principal 
var indexVue = new Vue({

    // Id du body
    el: "#content",
    /*
          Defines the data used by the component
        */
    data(){
        return {
            file: ''
        }
    },

    methods: {
        /*
          Submits the file to the server
        */
        submitFile(){
            /*
                    Initialize the form data
                */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);

            /*
              Make the request to the POST /single-file URL
            */
            axios.post( './CSV',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function(){
                console.log('SUCCESS!!');
            })
                .catch(function(){
                    console.log('FAILURE!!');
                });
        },

        /*
          Handles a change on the file upload
        */
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },

        /*
          Generate participants table in database
        */
        generateParticipantsTable () {
            let csvName = document.getElementById('csvName').value;
            console.log(csvName);
            axios.post('./app/fillDbFromCsv.php', csvName)
                .then((response)=> {
                    if(response.data) {
                        alert("Génération terminée");
                    } else {
                        alert("Attention : échec de la génération");
                    }
                });
        },

        /*
          Generate resultats table in database
        */
        generateResultsTable() {
            $("#loader").show();
            $("#buttons").hide();
            axios.get('./app/fillDbResultsTable.php')
                .then((response) => {
                    $("#loader").hide();
                    $("#buttons").show();
                    if (response.data) {
                        alert("Génération terminée");
                    } else {
                        alert("Attention : échec de la génération");
                    }
                });
        }
    }
});