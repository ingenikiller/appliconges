


$(document).ready(function() {
	alimenterPeriodes();
	$( "#debut" ).datepicker();
	$( "#fin" ).datepicker();
});



/*********************************
 * recherche et affiche les  
 * périodes de congés/rtt
 *********************************/
function alimenterPeriodes() {

	$.ajax({
		url: "index.php?domaine=periode&service=getliste",
		dataType: 'json',
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
				row.append($('<td/>').text(tabJson[i].debut));
				row.append($('<td  class="text-center"/>').text(tabJson[i].fin));
				row.append($("<td/>").text(tabJson[i].typePeriode));
				var tdnbjour = $('<td align="right"/>').text(tabJson[i].nbjour);
				/*$(tdnbjour).dblclick(function(){
					transformeNbJourEditable(this);
				});*/
				
				row.append(tdnbjour);
				
				//row.append($('<label for="affichage-'+tabJson[i].idperiode+'"></label>'));
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
				row.append($('<td align="right"/>').append(affichage).append($('<label for="affichage-'+tabJson[i].idperiode+'"></label>')));//text(tabJson[i].affichage));
				
				row.append($('<td class="text-center"/>').append('<a href="#" onclick="editerPeriode(\''+ tabJson[i].idperiode +'\')"><span class="glyphicon glyphicon-pencil"/></a>'));
				
				$("#tbodyResultat").append(row);
				$( affichage ).checkboxradio({
					icon: {primary:'ui-icon-home'},
					text: false
				});
			}
		}
	});
}

function editerPeriode(idperiode) {
	var hauteur = 300;
	var largeur = 620;
	
	if(idperiode!='') {
		var params = "idperiode="+idperiode;
	
	
		$.getJSON(
			"index.php?domaine=periode&service=getone",
			data=params,
			function(json){
				document.periode.service.value='update';
				document.periode.idperiode.value=json[0].idperiode;
				document.periode.debut.value=json[0].debut;
				document.periode.fin.value=json[0].fin;
				document.periode.nbjour.value=json[0].nbjour.replace(',','');
				
				$("div#boitePeriode").dialog({
					resizable: false,
					height:hauteur,
					width:largeur,
					modal: true
				});
				$('#nbjour').select();
				$('#nbjour').focus();
			}
		);
	} else {
		document.periode.service.value='create';
		document.periode.idperiode.value='';
		document.periode.debut.value='';
		document.periode.fin.value='';
		document.periode.nbjour.value=0;
		//document.operation.date.value=;
		
		$("div#boitePeriode").dialog({
			resizable: false,
			height:hauteur,
			width:largeur,
			modal: true
		});
		$('#nbjour').focus();
	}
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

function transformeNbJourEditable(td) {
	var valeur = $(td).text();
	var input = $('<input type="text" />');
	$(input).val(valeur);
	$(td).text('');
	$(td).append(input);
}
