<!doctype html>
<html lang="fr">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>cannes_is_up</title>
	<!-- Custom styles for this template -->
	<link rel="stylesheet" href="../CSS/style.css">

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

	<!-- Bootstrap -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>

	<!-- Tableau final avec le PDF en Telechargement -->
	<header>
		<img src="../Images/cannesisup-logo.png" alt="" class="pageresult">
	</header>

	<section id="content">

		<?php include "participantModal.php" ?>


		<!-- Filtre -->
		<div id="filter" class="input-group">
			<div class="input-group-prepend">
				<span class="input-group-text">Filtre</span>
			</div>
			<input type="text" class="form-control" placeholder="Example: Nom" v-model="filteringValue" v-on:keyup="onChangeFilter()">
		</div>






		<table class="table table-striped table-hover border mt-3">
			<!-- Tableau contenant les participants -->

			<!-- En-têtes -->
			<thead>
				<tr class="text-primary">

					<th scope="col" class="text-center">NOM</th>
					<th scope="col" class="text-center text-nowrap">PRENOM</th>
					<th scope="col" class="text-center">SOCIETE</th>


				</tr>
			</thead>

			<!-- Liste des participants -->
			<tbody>
				<tr v-for="participant in participants" @click="showDetails($event)" :value="participant.id" class="participant_line" data-target="#participantModal" data-toggle="modal">

					<td class="text-center">{{participant.nom}}</td>
					<td class="text-center">{{participant.prenom}}</td>
					<td class="text-center">{{participant.entreprise}}</td>

				</tr>
			</tbody>
		</table>
	</section>

	<!-- jQuery requis pour Bootsrap -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

	<!-- Popper JS requis pour Bootsrap -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

	<!-- Bootstrap JS -->
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script src="../js/Classes/DomManager.js"></script>
	<script src="../js/main.js"></script>
	<script src="../js/displayVue.js"></script>
</body>

</html>