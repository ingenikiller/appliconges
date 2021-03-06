
var hotInstance=null;


var tabTrad={
	previousMonth : 'Mois précédent',
	nextMonth     : 'Next Month',
	months        : ['Janvier','Février','Mars','Avril','Mai','Juin', 'Juillet','Aoùt','Septembre','Octobre','Novembre','Décembre'],
	weekdays      : ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
	weekdaysShort : ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
};


$(document).ready(function() {
	

	
	//alimenterPeriodes();
	$( "#debut" ).datepicker();
	$( "#fin" ).datepicker();
	
	
	var $container = $("#divTablePeriodes");

	$container.handsontable({
		licenseKey: "non-commercial-and-evaluation",
		language: 'fr-FR',
		colHeaders: ['idperiode', 'Date début', 'Date fin', 'Type période', 'Nombre de jours', 'Affichage'],
		tableClassName: [ 'table', 'table-hover', 'table-striped' ],
		/*startRows: 5,
		startCols: 5,
		minRows: 0,
		minCols: 5,*/
		//maxRows: 15,
		//maxCols: 10,
		//rowHeaders: true,
		//colHeaders: true,
		//minSpareRows: 1,
		stretchH: 'last',
		//contextMenu: true,
		colWidths: [1, 100, 100, 120, 100, 90,80],
		columns: [
			//{type: 'checkbox'},
			{data: 'idperiode', readOnly: true, hiddenColumns: true},
			{data: 'debut',
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
			},
			{data: 'fin',
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
			},
			{data: 'typePeriode',
				type: 'dropdown',
				source: ['rtt', 'conges', 'cps', 'cpa']
			},
			{data: 'nbjour', type: 'numeric', pattern: '0,0', culture: 'fr-FR'},
			{data: 'affichage', type: 'checkbox',checkedTemplate: '1', uncheckedTemplate: '0', className: "htCenter"}
		],
		hiddenColumns: {
			// set columns that are hidden by default
			columns: [0],
			// show where are hidden columns
			indicators: true
		},
		/*columnSorting: {
			column: 1,
			sortOrder: true
		},*/
		modifyRowData: function(row) {
			//alert('after');
		},
		afterChange: function (change, source) {
			if(change==null){
				return;
			}
			
			var hotInstance=$("#divTablePeriodes").handsontable('getInstance');
			
			//var indexDate = getColonneIndex(hotInstance, 'dateFerie');
			//var data= hotInstance.getDataAtCell(change[0][0],indexDate);
			var colonne = change[0][1];
			var valeur = change[0][3];
			var idperiode = hotInstance.getDataAtCell(change[0][0],0);
			
			
			//var nom = hotInstance.getDataAtCell(change[0][0],0);

			var params ='idperiode='+idperiode+'&'+colonne+'='+valeur;

			$.ajax({
				url: 'index.php?domaine=periode&service=update',
				dataType: 'json',
				type: 'POST',
				data: params,
				success: function (retour) {
					if(retour[0].status =='KO') {
						alert(retour[0].message);
					}
				}
			});
		
	  }
	  
	});
	hotInstance = $("#divTablePeriodes").handsontable('getInstance');
	
	alimenterPeriodes();
});

/*********************************
 * mise à jour des données 
 * directement dans la liste
 *********************************/
var majPeriode = function(idperiode, nomchamp, nbjour) {
	var params = 'idperiode='+idperiode+'&'+nomchamp+'='+nbjour;
	$.getJSON({ 
		url: "index.php?domaine=periode&service=update",
		data: params,
		success: function(retour) {
			if(traiteRetourAjax(retour)){
				fermeChampEditable(nomchamp+'-'+idperiode);
			}
		}
	});
}

/*********************************
 * recherche et affiche les  
 * périodes de congés/rtt
 *********************************/
function alimenterPeriodes() {

	$.ajax({
		url: "index.php?domaine=periode&service=getliste",
		dataType: 'json',
		success : function(resultat, statut, erreur){
			hotInstance.loadData(resultat[0].tabResult);
			hotInstance.render();
		}
	});
}

function editerPeriode(idperiode) {
	document.periode.service.value='create';
	document.periode.idperiode.value='';
	document.periode.debut.value='';
	document.periode.fin.value='';
	document.periode.typePeriode.value='';
	document.periode.nbjour.value=0;
	
	$('#boiteCreationPeriode').modal({
		backdrop: 'static',
		keyboard: false
	});
	$('#nbjour').focus();
}

function soumettre(form) {
	if(!validForm(form)) {
		return false;
	}
	
	var service = form.service.value;
	$.getJSON({ 
		url: "index.php?domaine=periode&service="+service,
		data: { "idperiode": form.idperiode.value,
				"debut": form.debut.value,
				"fin": form.fin.value,
				"typePeriode": form.typePeriode.value,
				"nbjour": form.nbjour.value
		}, 
		success: function(retour) {
			if (traiteRetourAjax(retour)) {
				$('#boiteCreationPeriode').modal('hide');
				alimenterPeriodes();
			}
			return false;
		} 
	});
	return false;
}




