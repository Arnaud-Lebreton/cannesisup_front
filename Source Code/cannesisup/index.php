<?php session_start(); ?>
<!doctype html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Cannes is Up</title>

    <!-- Google Fonts -->
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto&display=swap">

    <!-- Materialize -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="./CSS/style.css">
</head>

<body>

    <div id="page">
        <header>
        </header>

        <?php error_reporting(E_ALL) ?>

        <section id="content">
            <?php include "Content/Upload.php" ?>
            <section id="loader" style="display: none">
                <img src="Images/loader.gif" alt="">
            </section>
            <section id="buttons">
                <div class="">
                    <button class="btn-large black waves-effect waves-light btn-result" @click="generateParticipantsTable()">Générer la table participants</button>
                    <p class="center-align etape">1re Etape</p>
                </div>
                <div class="">
                    <button class="btn-large black waves-effect waves-light btn-result" @click="generateResultsTable()">Générer la table resultats</button>
                    <p class="center-align etape">2eme Etape</p>
                </div>
                <div class="">
                    <form action="./Content/display.php" method="post" id="display"></form>
                    <button form="display" type="submit" class="btn-large black waves-effect waves-light btn-result">Voir participants</button>
                    <p class="center-align etape">3eme Etape</p>
                </div>
            </section>
        </section>


        <div id="footer">
            <footer>
                <p>Cannes is Up - 2019</p>
            </footer>
        </div>
    </div>


    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="./js/main.js"></script>
    <script src="./js/indexVue.js"></script>
</body>

</html>