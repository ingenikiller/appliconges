


$(document).ready(function() {
	alimenterPeriodes();
	/*$( "#debut" ).datepicker();
	$( "#fin" ).datepicker();*/
});



/*********************************
 * recherche et affiche les  
 * périodes de congés/rtt
 *********************************/
function alimenterPeriodes() {
	var params ='';
	
	$.ajax({
		url: "index.php?domaine=jourferie&service=getliste",
		dataType: 'json',
		data: params,
		success : function(resultat, statut, erreur){
			tab = document.getElementById('tableauResultat');
			$('tr[typetr=periode]').remove();
			
			var total = resultat[0].nbLineTotal;
			var nbpage = Math.ceil(total/resultat[0].nbLine);
			
			
			var nb=resultat[0].nbLine;
			var tabJson = resultat[0].tabResult;
			var i=0;
			for(i=0; i<nb; i++) {
				var row = $('<tr typetr="periode"/>');
				row.append($('<td  class="text-center"/>').text(tabJson[i].dateFerie));
				row.append($("<td/>").text(tabJson[i].nom));
				/*row.append($('<td align="right"/>').text(tabJson[i].nbjour));
				var affichage =$('<input type="checkbox" id="affichage-'+tabJson[i].idperiode+'" value="'+tabJson[i].idperiode+'"/>');
				$( affichage ).change(function() {
					$.ajax({
						url: "index.php?domaine=periode&service=modifieaffichage",
						dataType: 'json',
						data: "idperiode="+$(this).val()+"&affichage="+$(this).is(':checked')
					});
				});
				if (tabJson[i].affichage==1) {
					$(affichage).attr('checked', 'checked');
				}
				row.append($('<td align="right"/>').append(affichage));//text(tabJson[i].affichage));*/
				
				row.append($('<td class="text-center"/>').append('<a href="#" onclick="supprimeJourFerie(\''+ tabJson[i].dateFerie +'\')"><span class="glyphicon glyphicon-trash"/></a>'));
				
				$("#tbodyResultat").append(row);
			}
		}
	});
}

function supprimeJourFerie(date) {

	var params = "date="+date;
	
	
	$.getJSON(
		"index.php?domaine=jourferie&service=delete",
		data=params,
		function(json){
			alimenterPeriodes();
		}
	);
}

function soumettre(form) {
	if(!validForm(form)) {
		return false;
	}
	
	var service = form.service.value;
	$.ajax({ 
		url: "index.php?domaine=periode&service="+service,
		data: { "idperiode": form.idperiode.value,
				"debut": form.debut.value,
				"fin": form.fin.value,
				"typePeriode": form.typePeriode.value,
				"nbjour": form.nbjour.value
		}, 
		success: function(retour) {
			//getSoldeCompte(form.noCompte.value, 'solde');
			//si on est en création, on garde la popup ouverte, sinon, on la ferme
			if(service=='create') {
				form.idperiode.value='';
				form.debut.value='';
				form.fin.value='';
				form.typePeriode.value='';
				form.nbjour.focus();
			} else {
				$("div#boitePeriode").dialog('close');
			}
			
			//maj de la liste des opérations
			//pagination('recherche');
			alimenterPeriodes();
			return false;
		} 
	});
	return false;
}