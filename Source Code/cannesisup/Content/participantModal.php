<div class="container">
    <div class="modal fade" id="participantModal" role="dialog" style="width: 100%;">
        <div class="modal-dialog modal-dialog-centered participantModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Détails</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body" v-if="Object.entries(participant).length > 0">
                    <div class="participantInfo">
                        <p>Nom : {{ participant.participantInfo.nom }}</p>
                        <p>Prenom : {{ participant.participantInfo.prenom }}</p>
                        <p>Entreprise : {{ participant.participantInfo.entreprise }}</p>
                        <p>Nuit sur place : {{ participant.participantInfo.dodo }}</p>
                        <p>Lunch pack : {{ participant.participantInfo.lunchpack }}</p>
                        <p>Email : {{ participant.participantInfo.email }}</p>
                        <p>Programme acheté : {{ participant.participantInfo.afterwork }}</p>
                    </div>
                    <table class="participantPlanning">
                        <tr>
                            <th>horaires</th>
                            <th>activités</th>
                        </tr>

                        <tr v-for="participantPlanning in participant.participantPlanning">
                            <td>{{ participantPlanning.times }}</td>
                            <td>{{ participantPlanning.nom }}</td>
                        </tr>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" OnClick="javascript:window.print()">PDF</button>
                </div>
            </div>
        </div>
    </div>
</div>