$.fn.singleAndDouble = function(singleClickFunc, doubleClickFunc) {
	var timeOut = 200;
	var timeoutID = 0;
	var ignoreSingleClicks = false;
  
	this.on('click', function(event) {
		if (!ignoreSingleClicks) {
			clearTimeout(timeoutID);

			timeoutID = setTimeout(function() {
				singleClickFunc(event);
			}, timeOut);
		}
	});
  
  this.on('dblclick', function(event) {
    clearTimeout(timeoutID);
    ignoreSingleClicks = true;
    
    setTimeout(function() {
      ignoreSingleClicks = false;
    }, timeOut);
    
    doubleClickFunc(event);
  });
  
};

var singleClickCalled = false;



$(document).ready(function() {
	var tabAnnees = alimentePeriodes();
	peuplerCalendrier(tabAnnees);
	//alert("toto");
	
	//var date = new Date(2016, 1, 31);
	//alert(date.toString() + " "+ isDate(date));
	$( "td[type|='jour']" ).addClass('jour_ouvre');
	$( "td[jour|='S']" ).removeClass();//'jour_ouvre');//.css( "background-color", "grey" );
	$( "td[jour|='S']" ).addClass('jour_ferme');//.css( "background-color", "grey" );
	$( "td[jour|='D']" ).removeClass();//'jour_ouvre');//.css( "background-color", "grey" );
	$( "td[jour|='D']" ).addClass('jour_ferme');//.css( "background-color", "grey" );
	
	$("td[type|='jour']").singleAndDouble(
		function(event) {
			singleClickCalled = true;

			$('#message').html('Single Click Captured');
			modifieCase(event.currentTarget.id, determineTypeConges(1));
			setTimeout(function() {
				singleClickCalled = false;
			}, 300);
		},
		function(event) {
			if (singleClickCalled) {
				// This is actually an error state
				// it should never happen. The timeout would need
				// to be adjusted because it may be too close
				//$('#message').html('Single & Double Click Captured');
			}
			else {
				$('#message').html('Double Click Captured');
				modifieCase(event.currentTarget.id, determineTypeConges(2));
			}
			singleClickCalled = false;
		}
	);
	
	$( "#radio" ).buttonset();

	alimenteJours();
	alimenteJoursFeries();
});





var tabJour=["D", 'L', 'M', 'M', 'J', 'V', 'S'];
var tabMois=["Janvier", 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
//var tabCouleur={'inactif': '#FFFFFF', "rtt1":"#A1FF8E", "rtt2":"#4DFE2A",'conges1':"#039FD8", 'conges2':"#7DDAFC"};
var tabCouleur={'inactif': 'jour_ouvre', "rtt1":"rtt_jour", "rtt2":"rtt_demi",'conges1':"conges_jour", 'conges2':"conges_demi"};
var tabCouleurInverse={"green":"rtt", 'blue':"conges"};


/*********************************
 * alimenter le tableau des jours
 *********************************/
function peuplerCalendrier(tabAnnees) {
	var anneeDeb = Number(tabAnnees['debut']);
	var anneeFin = Number(tabAnnees['fin']);
	
	for (var annee=anneeDeb; annee<=anneeFin; annee++){
		
		//génère la première ligne du tableau
		
		$("#tableauCalendrier").append(genereNumeroJour());
		$("#tableauCalendrier").append(premiereLigneAnnee(annee));
		
		for (var mois=1; mois<=11; mois++){
			$("#tableauCalendrier").append(ajouteMois(annee, mois));
		}
	}
	$("#tableauCalendrier").append(genereNumeroJour());
	
	
}

/*********************************
 * génère la ligne de numéros de
 * jour
 *********************************/
function genereNumeroJour(){
	var ligne=$("<tr/>");
	ligne.append($("<td/><td/>"));
	for(var i=1; i<=31; i++) {
		ligne.append( $("<th/>").text(i) );
	}
	return ligne;
}

/*********************************
 * génère la première ligne de
 * l'année avec année et mois
 *********************************/
function premiereLigneAnnee(annee){
	var ligne=$("<tr/>");
	ligne.append($("<th rowspan=12 />").text(annee));
	ligne.append($("<th/>").text(tabMois[0]));
	//alert("ligne "+annee+" "+ligne);
	//$("#tableauCalendrier").append(ligne);
	ajouteJourMois(ligne, annee, 0);
	return ligne;
}

/*********************************
 * génère une ligne de mois
 *********************************/
function ajouteMois(annee, mois){
	var ligne=$("<tr/>");
	//ligne.append($("<td/>").text(annee));
	ligne.append($("<th/>").text(tabMois[mois]));
	//alert("ligne "+annee+" "+ligne);
	//$("#tableauCalendrier").append(ligne);
	ajouteJourMois(ligne, annee, mois);
	return ligne;
}

/*********************************
 * génère la liste des jours d'un
 * mois
 *********************************/
function ajouteJourMois(ligne, annee, mois){
	for(var j=1; j<=31; j++){
		var date = new Date(annee, mois, j);
		//vérifie la génération de la date: si le jour de la date et le jour voulu sont différents, la date n'existe pas
		if(date.getDate() == j){
			var jour = date.getDay();
			ligne.append($("<td id=\""+annee+'-'+pad(mois+1, 2, '0')+'-'+pad(j, 2, '0')+"\" jour=\""+tabJour[jour]+ "\" type=\"jour\" typeConges=\"inactif\"/>").append('<img src="application/images/'+tabJour[jour]+'.png"/>'));//text(tabJour[jour])); //""));
		}
	}
}


/*function isDate (x) 
{ 
	//return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate); 
}*/

/*********************************
 * effectue un pad à gauche sur un
 * nombre
 *********************************/
function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function determineTypeConges(nbClicks){
	var typeJour = $('input[name=radioChoixType]:checked').val();
	
	if(typeJour=='inactif'){
		return 'inactif';
	} else {
		return typeJour+nbClicks;
	}
}


function modifieCase(idCase, typeJour){
	//var typeJour = $('input[name=radioChoixType]:checked').val();//$( "#radio" ).text();
	
	//si le jour est un jour fermé (samedi, dimanche ou férié)

	var jourSemaine = $("td[id|='"+idCase+"']").attr('jour');
	if ($('#'+idCase).hasClass('jour_ferme') || $('#'+idCase).hasClass('jour_ferie')) {
		return false;
	}
	
	//compare la date du jour avec la date sélectionnée
	var dateSelectionnee = new Date(idCase.substring(0,4), Number(idCase.substring(5,7))-1, idCase.substring(8,10));
	var dateJour = new Date();
	if(dateJour > dateSelectionnee) {
		return false;
	}
	
	var typeCongesActuel = $("td[id|='"+idCase+"']").attr('typeConges');
	
	if(typeCongesActuel=='' || typeCongesActuel==undefined){
		majCaseJour(idCase, typeJour);
	} else {
		majCaseJour(idCase, typeJour);
	}
	
	
}

function majCaseJour(idCase, typeJour){
	var typeActuel = $("td[id|='"+idCase+"']").attr('typeConges');
	
	if(typeJour==typeActuel){
		return;
	}
	
	if(typeJour=='inactif'){
		ajaxMajJour(idCase, 'delete', typeJour);
	} else {
		if(typeActuel == 'inactif') {
			ajaxMajJour(idCase, 'create', typeJour);
		} else {
			ajaxMajJour(idCase, 'update', typeJour);
		}
	}
	
	$("td[id|='"+idCase+"']").removeClass();//tabCouleur[typeActuel]);
	//$("td[id|='"+idCase+"']").addClass(tabCouleur[typeJour]);
	//$("td[id|='"+idCase+"']").attr('typeConges', typeJour);
	coloreCase(idCase, typeJour);
	alimentePeriodes();
}

function coloreCase(idCase, typeJour) {
	$("td[id|='"+idCase+"']").addClass(tabCouleur[typeJour]);
	$("td[id|='"+idCase+"']").attr('typeConges', typeJour);
}





function ajaxMajJour(jour, action, typeConges){
	var params="jour="+jour+"&typeConges="+typeConges;
	$.ajax({
	         url: "index.php?domaine=jour&service="+action,
	         async: false,
	         dataType: 'json',
	         data: params
	        }
	    );
}

function alimentePeriodes() {
	var params='';
	var json = $.parseJSON(
	    $.ajax({
	         url: "index.php?domaine=periode&service=getListe",
	         async: false,
	         dataType: 'json',
	         data: params
	        }
	    ).responseText
	);
	
	var nb=json[0].nbLine;
	var tabJson = json[0].tabResult;
	
	var tabAnnees = Array();
	tabAnnees['debut']=(tabJson[0].debut).substr(0, 4);
	tabAnnees['fin']=tabJson[nb - 1].fin.substr(0, 4);
	
	for(i=0; i<nb; i++) {
		var debut = tabJson[i].debut;
		var totalDispo = Number(tabJson[i].nbjour);
		var totalPositionne = Number(tabJson[i].total);
		var totalPris = 0;
		if(tabJson[i].associatedObjet[0].tabResult[0] != null) {
			totalPris = Number(tabJson[i].associatedObjet[0].tabResult[0].total);
		}
		var reste = totalDispo - totalPositionne;
		var styleRow='';
		if(totalDispo == totalPositionne) {
			styleRow='periodeComplete';
		} else {
			if (totalDispo < totalPositionne) {
				styleRow='periodeTropSaisi';
			} else {
				styleRow='periodeIncomplete';
			}
		}
		
		
		if( $("#totalPositionne"+debut).length) {
			$("#totalPositionne"+debut).text(tabJson[i].total);
			$("#reste"+debut).text(reste);
			$('#periode'+debut).removeClass();
			$('#periode'+debut).addClass(styleRow);
		} else {
			var row = $('<tr id="'+'periode'+debut+'" class="'+styleRow+'"/>');
			row.append($("<td/>").text(debut));
			row.append($("<td/>").text(tabJson[i].fin));
			row.append($("<td/>").text(tabJson[i].typeConges));
			row.append($('<td align="right" id="'+"totalDispo"+debut+'"/>').text(totalDispo));
			row.append($('<td align="right" id="'+"totalPositionne"+debut+'"/>').text(totalPositionne));
			row.append($('<td align="right"/>').text(totalPris));
			row.append($('<td align="right" id="'+"reste"+debut+'"/>').text(reste));
			$("#tableauPeriodes").append(row);
		}
		
		/*var caseId = tabJson[i].jour;
		var typeConges = tabJson[i].typeConges;
		majCaseJour(caseId, typeConges);*/
	}
	
	return tabAnnees;
}


function alimenteJours() {
	var params='';
	var json = $.parseJSON(
	    $.ajax({
	         url: "index.php?domaine=jour&service=getListe",
	         async: false,
	         dataType: 'json',
	         data: params
	        }
	    ).responseText
	);
	
	var nb=json[0].nbLine;
	var tabJson = json[0].tabResult;
	for(i=0; i<nb; i++) {
		var caseId = tabJson[i].jour;
		var typeConges = tabJson[i].typeConges;
		coloreCase(caseId, typeConges);
	}
}

function alimenteJoursFeries() {
	var params='';
	var json = $.parseJSON(
	    $.ajax({
	         url: "index.php?domaine=jourferie&service=getListe",
	         async: false,
	         dataType: 'json',
	         data: params
	        }
	    ).responseText
	);
	
	var nb=json[0].nbLine;
	var tabJson = json[0].tabResult;
	for(i=0; i<nb; i++) {
		var caseId = tabJson[i].dateFerie;
		//var typeConges = tabJson[i].typeConges;
		//coloreCase(caseId, typeConges);
		$( "#"+caseId ).removeClass();//'jour_ouvre');//.css( "background-color", "grey" );
		$( "#"+caseId ).addClass('jour_ferie');
	}
}

function activeF1(event){
	bloqueTouchesFonctions(event);
	$('input:radio[name="radioChoixType"][value="inactif"]').click();
	return false;
}

function activeF2(event){
	bloqueTouchesFonctions(event);
	$('input:radio[name="radioChoixType"][value="rtt"]').click();
	return false;
}
function activeF3(event){
	bloqueTouchesFonctions(event);
	$('input:radio[name="radioChoixType"][value="conges"]').click(); //attr('checked', true);
	//$('input[name=radioChoixType]').val('conges')
	return false;
}
