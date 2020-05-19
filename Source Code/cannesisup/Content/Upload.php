<img src="Images/cannesisup-logo.png" alt="" class="pageupload img-fluid">
<div class="container">
    <div class="row">
        <form action="Content/functionUpload.php" method="POST" enctype="multipart/form-data" @submit.prevent="">
            <input type="hidden" name="MAX_FILE_SIZE" value="199999900000">
            <div class="file-field input-field">
                <div class="btn btn-file blue lighten-1">
                    <span>Fichier</span>
                    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" name="csv">
                </div>
                <div class="file-path-wrapper ">
                    <input class="file-path validate" name="name" id="csvName" type="text">
                </div>
            </div>
            <input type="submit" name="uploadCSVConfirm" value="Envoyer le fichier" class="sendfile"  @click="submitFile()">
        </form>
    </div>
</div>