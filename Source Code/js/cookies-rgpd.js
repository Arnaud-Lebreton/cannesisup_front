// Fonctions RGPD Cookies
function oft_setCookie(cname) {
    var d = new Date();
    d.setTime(d.getTime() + 30660000000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=y; " + expires;
}

function oft_getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function oft_checkCookie() {
    var check = oft_getCookie("oft_cookieConsent");
    if (check != "y") $('#oft_cookieConsent').show();
	else $('#oft_cookieConsent').hide();
}

function oft_cookieConsent() {
	$("body").append('<div id="oft_cookieConsent" class="container-fluid hts-rgpd" style="display:none;"><div class="container"><div class="row"><div class="col-xs-10 hts-rgpd__txt">En poursuivant votre navigation, vous acceptez nos cookies et notre <a href="mentions-legales.php#cookies" class="hts-rgpd__txt--lien">politique de confidentialité</a> pour améliorer votre expérience sur notre site.</div><div class="col-xs-2 hts-rgpd__bouton"><button id="oft_cookieConsent_valid" class="btn btn-default hts-rgpd__bouton--btn-default">OK</button></div></div></div></div>');
	oft_checkCookie();
	$('#oft_cookieConsent_valid').on('click', function(){
		oft_setCookie("oft_cookieConsent");
		$('#oft_cookieConsent').hide();
	});
}
oft_cookieConsent();