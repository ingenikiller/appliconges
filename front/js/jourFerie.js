


var tabTrad={
	previousMonth : 'Mois précédent',
	nextMonth     : 'Next Month',
	months        : ['Janvier','Février','Mars','Avril','Mai','Juin', 'Juillet','Aoùt','Septembre','Octobre','Novembre','Décembre'],
	weekdays      : ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
	weekdaysShort : ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
};

$(document).ready(function() {
	alimenterListeAnnees();
	var $container = $("#divTableJoursFeries");

	$container.handsontable({
		licenseKey: "non-commercial-and-evaluation",
		colHeaders: ['Libellé', 'Date'],
		stretchH: 'last',
		columns: [
			//{type: 'checkbox'},
			{data: 'nom', readOnly: true},
			{data: 'dateFerie',
				type: 'date',
				dateFormat: 'YYYY-MM-DD',
				correctFormat: true,
				datePickerConfig: {
					// First day of the week (0: Sunday, 1: Monday, etc)
					firstDay: 1,
					showWeekNumber: true,
					numberOfMonths: 1,
					i18n: tabTrad,
					disableDayFn: function(date) {
					// Disable Sunday and Saturday
					return date.getDay() === 0 || date.getDay() === 6;
					}
				}
			
			
			}
		],
		columnSorting: {
			column: 1,
			sortOrder: true
		},
		modifyRowData: function(row) {
			//alert('after');
		},
		afterChange: function (change, source) {
			if(change==null){
				return;
			}
			
			var hotInstance=$("#divTableJoursFeries").handsontable('getInstance');
			
			var indexDate = getColonneIndex(hotInstance, 'dateFerie');
			var data= hotInstance.getDataAtCell(change[0][0],indexDate);
			var colonne = change[0][1];
			var valeur = change[0][3];
			
			var nom = hotInstance.getDataAtCell(change[0][0],0);

			//var params ='dateFerie='+valeur+'&annee='+$('#listeAnnee').val()+'&nom='+nom ;
			var dataJson=new Object();
			dataJson.dateFerie=valeur;
			dataJson.annee=$('#listeAnnee').val()
			dataJson.nom=nom;

			$.ajax({
				url: 'index.php?domaine=jourferie&service=update',
				dataType: 'json',
				type: "POST",
				data: {jourFerie: JSON.stringify(dataJson)},
				success: function () {
				}
			});
		
	  }
	  
	});
	var hotInstance = $("#divTableJoursFeries").handsontable('getInstance');
});



function alimenterListeAnnees() {
	$.ajax({
		url: "index.php?domaine=jourferie&service=getlisteannee",
		dataType: 'json',
		success : function(resultat, statut, erreur){
			var nomChamp = 'listeAnnee';
			$('#'+nomChamp).empty();
			$('#'+nomChamp).append(new Option('','',true,true));
			
			var nb=resultat.racine.ListeAnnees.totalLigne;
			var tabJson = resultat.racine.ListeAnnees.data;
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
			$('#divListe').show();
			$("#divTableJoursFeries").handsontable('getInstance').loadData(resultat.racine.ListeJourFerie.data);
			$("#divTableJoursFeries").handsontable('getInstance').render();
		}
	});
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

