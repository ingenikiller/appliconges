

$(document).ready(function() {
	alimenterListeAnnees();
});


function alimenterListeAnnees() {
	$.ajax({
		url: "index.php?domaine=jourferie&service=getlisteannee",
		dataType: 'json',
		success : function(resultat, statut, erreur){
			var nomChamp = 'listeAnnee';
			$('#'+nomChamp).empty();
			$('#'+nomChamp).append(new Option('','',true,true));
			
			var nb=resultat[0].nbLine;
			var tabJson = resultat[0].tabResult;
			var i=0;
			for(i=0; i<nb; i++) {
				if(i==0) {
					//alimentation future année
					$('#nouvelleAnnee').val(Number(tabJson[i].annee) + 1);
				}
				$('#'+nomChamp).append(new Option(tabJson[i].annee, tabJson[i].annee, false, false));
			}
		}
	});
}


/*********************************
 * recherche et affiche les  
 * périodes de congés/rtt
 *********************************/
function rechercheanneejoursferies(annee) {
	var params ='annee='+annee;
	
	if(annee=='') {
		$('#divListe').hide();
		return false;
	}
	
	$.ajax({
		url: "index.php?domaine=jourferie&service=getlistejourannee",
		dataType: 'json',
		data: params,
		success : function(resultat, statut, erreur){
			tab = document.getElementById('tableauResultat');
			$('tr[typetr=periode]').remove();
			
			var total = resultat[0].nbLineTotal;
			var nbpage = Math.ceil(total/resultat[0].nbLine);
			
			$('#anneeModif').val(annee);
			var nb=resultat[0].nbLine;
			var tabJson = resultat[0].tabResult;
			var i=0;
			for(i=0; i<nb; i++) {
				var row = $('<tr typetr="periode"/>');
				row.append($("<td/>").text(tabJson[i].nom));
				row.append($("<td/>").append('<input type="hidden" class="form-control" id="nom-'+i+'" value="'+tabJson[i].nom+'" "/><input type="date" class="form-control" id="dateFerie-'+i+'" value="'+tabJson[i].dateFerie+'"/>'));
				$("#tbodyResultat").append(row);
			}
			$('#divListe').show();
		}
	});
}


function modificationJourFerie() {
	var params='annee='+$('#anneeModif').val();
	var i=0;
	for(var i=0; i<11; i++) {
		params+='&nom-'+i+'='+$('#nom-'+i).val()+'&dateFerie-'+i+'='+$('#dateFerie-'+i).val();
	}
	
	$.ajax({
		url: "index.php?domaine=jourferie&service=majjoursferies",
		dataType: 'json',
		data: params,
		success : function(resultat, statut, erreur){
			$('#divListe').hide();
		}
	});
	return false;
}


function creerAnnee() {
	var params = "anneeacreer="+$('#nouvelleAnnee').val();
	$.ajax({
		url: "index.php?domaine=jourferie&service=creerjourannee",
		dataType: 'json',
		data: params,
		success : function(resultat, statut, erreur){
			//
			var nannee=$('#nouvelleAnnee').val();
			alimenterListeAnnees();
			$('#listeAnnee').val(nannee);
			rechercheanneejoursferies(nannee);
		}
	});
	return false;
}

