<!DOCTYPE html>
<html lang="fr">
<head>
<?php include "includes/analytics.php";?>
<meta charset="utf-8">
<title>Cannes Is Up - French Tech Côte d’Azur du bassin Cannois</title>
<meta name="Description" content="Cannes Is Up est l'association Cannoise de la French Tech Côte d’Azur. Cannes Is Up fédére, accélére et fait rayonner les entreprises innovantes et créatives du bassin Cannois par l'organisation d'événements pas comme les autres..." />
<?php include "includes/metas.php";?>
<?php //include "includes/metas-royalslider.php";?>
<!-- Bootstrap : Background Video -->
<script src="framework/bootstrap/js/video-player.min.js"></script>
<script type="text/javascript">
$(document).ready(function () {
    $(".player").mb_YTPlayer();
});
</script>
</head>

<body name="home" id="home">
<header>
<?php include "includes/nav.php";?>
</header>
<!-- Section slide -->
<section class="container-fluid hts-section-slide hts-section-video">
  <section class="content-section row video-section">
      <div class="pattern-overlay">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 text-center hts-section-slide-inter" align="center">
              <img src="images/logo-icone.png" alt="" class="hidden-xs">
              <p>L'association<br class="visible-xs"> French Tech Côte d'Azur<br>du bassin Cannois !</p>
              <a href="#presentation" class="btn btn-default hidden-xs smoothScroll">Découvrez Cannes Is Up</a>
            </div>
            <a id="bgndVideo" class="player" data-property="{videoURL:'https://www.youtube.com/watch?v=_xbHLiMar7U', containment:'.video-section', quality:'large', autoPlay:true, mute:true, opacity:0.7}">bg</a>
          </div>
        </div>
      </div>
  </section>
</section>
<!-- Section Presentation -->
<section class="container-fluid hts-section" name="presentation" id="presentation">
  <div class="container">
    <div class="row">
      <div class="col-sm-12" align="center">
        <h1>Cannes Is Up</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-7">
        <img src="images/logo-french-tech-cote-dazur.png" class="img-responsive" width="100%">
      </div>
      <div class="col-md-5">
        <h3>Cannes Is Up est le 4ème pilier de la French Tech Côte d’Azur</h3>
        <p>Cannes Is Up se positionne aux cotés de Telecom Valley, des Entrepreneurs du Pays de Grasse et de Nice Start(s) Up avec pour mission de <strong>fédérer</strong>, <strong>accélérer</strong> et <strong>faire rayonner</strong> les entreprises innovantes et créatives du bassin Cannois.</p>
        <a href="contact.php" class="btn btn-default">Devenez adhérent</a>
      </div>
    </div>
    <div class="row hts-ligne-50">
      <div class="col-md-8 col-md-offset-2">
        <div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/DSJthgXC300" frameborder="0" allowfullscreen></iframe></div>
      </div>
    </div>
  </div>
</section>
<!-- Section DDA -->
<section class="container-fluid hts-section hts-section-dark hts-section-dda" name="dda" id="dda">
  <div class="container">
    <div class="row">
      <div class="col-sm-12" align="center">
        <h2>DDA îles de Lérins</h2>
      </div>
    </div>
    <div class="row hts-ligne-15">
      <div class="col-md-10 col-md-offset-1 text-center">
        <h3>Cannes Is Up vous invite à participer à son événement majeur : DDA Iles de Lérins, <br class="visible-lg">un événement French Tech « <em>pas comme les autres</em> »...</h3>
        <p>Plus de 250 acteurs innovants du territoires : entrepreneurs, décideurs, investisseurs, institutionnels, journalistes et personnalités se réuniront pour un moment festif, convivial et professionnel.</p>
        <h4>Réservez dés à present votre <u>Vendredi 6 Septembre 2019</u> !</h4>
      </div>
    </div>
    <div class="row hts-ligne-50">
      <div class="col-md-6">
        <div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/FsxeaiYWKKU" frameborder="0" allowfullscreen></iframe></div>
      </div>
      <div class="col-md-6">
        <h3>DDA comme...</h3>
        <h4>Déconnectez-vous</h4>
        <p>On confisque vos téléphones portables pour privilégier des échanges de la vie réelle !</p>
        <h4>Détendez-vous</h4>
        <p>Interdiction de porter un costume, une cravate, des talons ou un tailleur !</p>
        <h4>Amusez-vous</h4>
        <p>Des activités sportives et culturelles à partager entre professionnels !</p>
      </div>
    </div>
    <div class="row hts-ligne-50">
      <div class="col-md-10 col-md-offset-1 text-center">
        <h3>Les inscriptions à DDA Iles de Lérins sont ouvertes !</h3>
        <p>
        <a onclick="ga('send', 'event', 'DDA-IDL', 'click', 'Bouton DDA-IDL');" href="https://cannes-is-up-5bfd076b25298.assoconnect.com/billetterie/offre/105544-u-evenement-d-d-a-ile-de-lerins-edition-2019" class="btn btn-default hts-btn-margin">Je m'inscris a DDA !</a>
        <!--<a href="https://drive.google.com/file/d/10dByBQkjoksKNT5k-gHRcjwFvf43Lz_m/view?usp=sharing" target="_blank" class="btn btn-info hts-btn-margin">Voir la plaquette</a>-->
        <a href="/docs/DDA-brochure-2019.pdf" target="_blank" class="btn btn-info hts-btn-margin">Voir la plaquette</a>
        </p>
      </div>
    </div>
  </div>
</section>
<!-- Section actus -->
<section class="container-fluid hts-section hts-section-gris" name="actus" id="actus">
  <div class="container">
    <div class="row">
      <div class="col-sm-12" align="center">
        <h2>Actualités</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="hts-section-block hts-section-block-newsletter" align="center">
          <span>Newsletter</span>
          <p>Recevez par Email toutes nos actualités et invitations aux événements !</p>
          <a href="http://eepurl.com/dxly2b" class="btn btn-default" target="_blank">Je m'abonne !</a>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="hts-section-block hts-section-block-social" align="center">
          <span>Réseaux Sociaux</span>
          <p>Ne loupez plus une info en nous suivant sur vos réseaux préférés !</p>
          <a href="https://www.facebook.com/cannesisup/" target="_blank"><i class="fa fa-4x fa-facebook-square"></i></a>
          <a href="https://www.instagram.com/cannesisup/" target="_blank"><i class="fa fa-4x fa-instagram"></i></a>
          <a href="https://www.youtube.com/channel/UCBIpW614EFQGZrFVl6ARsAw" target="_blank"><i class="fa fa-4x fa-youtube-square"></i></a>
          <a href="https://twitter.com/cannesisup" target="_blank"><i class="fa fa-4x fa-twitter-square"></i></a>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- Section Partenaires -->
<section class="container-fluid hts-section hts-section-partenaires" name="partenaires" id="partenaires">
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12" align="center">
        <h2>Nos Partenaires</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12" align="center">
        <h3>- PARTENAIRES MAJEURS -</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-md-offset-4 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_majeurs_01.jpg" alt="Communauté d'Agglomération Cannes Pays de Lérins" title="Communauté d'Agglomération Cannes Pays de Lérins" class="img-responsive" width="100%">
        <a class="btn btn-link" href="http://www.paysdelerins.fr/" target="_blank" rel="nofollow">paysdelerins.fr</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_majeurs_02.jpg" alt="Ville de Cannes" title="Ville de Cannes" class="img-responsive" width="100%">
        <a class="btn btn-link" href="http://www.cannes.com/" target="_blank" rel="nofollow">cannes.com</a>
      </div>
    </div>
    <hr class="hts-ligne-50">
    <div class="row">
      <div class="col-sm-12" align="center">
        <h3>- PARTENAIRES OFFICIELS -</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-md-offset-4 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_officiels_01.jpg" alt="CIS Îles de Lérins - Cannes Jeunesse" title="CIS Îles de Lérins - Cannes Jeunesse" class="img-responsive" width="100%">
        <a class="btn btn-link" href="http://www.cannes-jeunesse.fr/cis/presentation.html" target="_blank" rel="nofollow">cannes-jeunesse.fr/cis</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_officiels_02.jpg" alt="French Tech Côte d'Azur" title="French Tech Côte d'Azur" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://www.frenchtechcotedazur.fr/" target="_blank" rel="nofollow">frenchtechcotedazur.fr</a>
      </div>
    </div>
    <hr class="hts-ligne-50">
    <div class="row">
      <div class="col-sm-12" align="center">
        <h3>- SPONSORS -</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_sponsors_01.jpg" alt="VENTURY Avocats - EY" title="VENTURY Avocats - EY" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://www.ey-avocats.com/ft/fr/services/ey-ventury-avocats" target="_blank" rel="nofollow">ey-avocats.com</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_sponsors_02.jpg" alt="Audit Consulting Group" title="Audit Consulting Group" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://www.audit-consulting-group.com/" target="_blank" rel="nofollow">audit-consulting-group.com</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_sponsors_03.jpg" alt="GAN Assurences - Cabinet Chrystel Dubreuil" title="GAN Assurences - Cabinet Chrystel Dubreuil" class="img-responsive" width="100%">
        <a class="btn btn-link" href="http://www.grasse-assurance.fr/" target="_blank" rel="nofollow">grasse-assurance.fr</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_sponsors_04.jpg" alt="Corporate Assistance" title="Corporate Assistance" class="img-responsive" width="100%">
        <a class="btn btn-link" href="http://corporate-assistance.com/" target="_blank" rel="nofollow">corporate-assistance.com</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_sponsors_05.jpg" alt="INRIA" title="INRIA" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://www.inria.fr/" target="_blank" rel="nofollow">inria.fr</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_sponsors_06.jpg" alt="Vinci Autoroutes" title="Vinci Autoroutes" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://www.vinci-autoroutes.com/fr" target="_blank" rel="nofollow">vinci-autoroutes.com</a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-md-offset-3 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_sponsors_07.jpg" alt="Amadeus" title="Amadeus" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://amadeus.com/fr" target="_blank" rel="nofollow">amadeus.com</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_sponsors_08.jpg" alt="E.Leclerc Le Cannet" title="E.Leclerc Le Cannet" class="img-responsive" width="100%">
        <a class="btn btn-link" href="http://www.e-leclerc.com/le-cannet" target="_blank" rel="nofollow">e-leclerc.com</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_sponsors_09.jpg" alt="La Plage du Festival Cannes" title="La Plage du Festival Cannes" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://www.plage-festival-cannes.com/index.php/fr/" target="_blank" rel="nofollow">plage-festival-cannes.com</a>
      </div>
    </div>
    <hr class="hts-ligne-50">
    <div class="row">
      <div class="col-sm-12" align="center">
        <h3>- PARTENAIRES RESEAUX -</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-md-offset-1 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_reseaux_01.jpg" alt="Telecom Valley" title="Telecom Valley" class="img-responsive" width="100%">
        <a class="btn btn-link" href="http://www.telecom-valley.fr/" target="_blank" rel="nofollow">telecom-valley.fr</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_reseaux_02.jpg" alt="Club des Entrepreneurs du Pays de Grasse" title="Club des Entrepreneurs du Pays de Grasse" class="img-responsive" width="100%">
        <a class="btn btn-link" href="http://club-entrepreneurs-grasse.com/site/" target="_blank" rel="nofollow">club-entrepreneurs-grasse.com</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_reseaux_03.jpg" alt="Nice Start(s) Up" title="Nice Start(s) Up" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://www.nicestartsup.com/" target="_blank" rel="nofollow">nicestartsup.com</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_reseaux_04.jpg" alt="UPE 06" title="UPE 06" class="img-responsive" width="100%">
        <a class="btn btn-link" href="http://www.upe06.com/" target="_blank" rel="nofollow">upe06.com</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_reseaux_05.jpg" alt="Réseau Entreprendre" title="Réseau Entreprendre" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://www.reseau-entreprendre.org/fr/accueil/" target="_blank" rel="nofollow">reseau-entreprendre.org</a>
      </div>
    </div>
    <hr class="hts-ligne-50">
    <div class="row">
      <div class="col-sm-12" align="center">
        <h3>- PARTENAIRES MEDIAS -</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-md-offset-1 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_medias_01.jpg" alt="Cannes Radio" title="Cannes Radio" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://www.cannesradio.com/" target="_blank" rel="nofollow">cannesradio.com</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_medias_02.jpg" alt="Tribune Bulletin Côte d'Azur" title="Tribune Bulletin Côte d'Azur" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://tribuca.net/" target="_blank" rel="nofollow">tribuca.net</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_medias_03.jpg" alt="Sophia Mag - Métropole Mag" title="Sophia Mag - Métropole Mag" class="img-responsive" width="100%">
        <a class="btn btn-link" href="http://sophia-mag.com/" target="_blank" rel="nofollow">sophia-mag.com</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_medias_04.jpg" alt="Les Petites Affiches" title="Les Petites Affiches" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://www.petitesaffiches.fr/" target="_blank" rel="nofollow">petitesaffiches.fr</a>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-6" align="center">
        <img src="images/partenaires/logos_medias_05.jpg" alt="La Tribune PACA" title="La Tribune PACA" class="img-responsive" width="100%">
        <a class="btn btn-link" href="https://marseille.latribune.fr/" target="_blank" rel="nofollow">latribune.fr</a>
      </div>
    </div>
  </div>
</section>
<!-- End Section -->
<?php include "includes/footer.php";?>
<?php include "includes/metas-footer.php";?>
</body>
</html>