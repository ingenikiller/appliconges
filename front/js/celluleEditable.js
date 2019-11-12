
/**
 *
 * nomchamp
 * idfonctionnel
 * valeur
 * fonctionUpdate
 * type
 * 
 **/
function creerCelluleEditable(nomchamp, idfonctionnel, valeur, fonctionUpdate, type) {
	//crée la ligne
	var tdnbjour = $('<td align="right" id="td'+nomchamp+'-'+idfonctionnel+'" nomchamp="'+nomchamp+'" idfonctionnel="'+idfonctionnel+'"/>').text(valeur);
	
	//ajoute la gestion du double click pour éditer la cellule
	$(tdnbjour).dblclick(function(){
		if($(this).attr('editencours') == true){
			return true;
		}
		
		var valeur = $(this).text();
		var idfonctionnel = $(this).attr('idfonctionnel');
		var nomchamp = $(this).attr('nomchamp');
		$(this).attr('editencours', true);
		
		//crée le champ d'édition
		var input = $('<input type="text" id="'+nomchamp+'-'+idfonctionnel+'" idfonctionnel="'+idfonctionnel+'" nomchamp="'+nomchamp+'" valeurdebase="'+valeur+'" type="'+type+'"/>');
		$(input).val(valeur);
		
		if(type=='date') {
			$(input).datepicker();
		}
		
		
		//en sortie de champ
		if(type!='date') {
			$(input).on("focusout", function() {
				sortieChamp(this, fonctionUpdate);
			});
		}
		//utilisation de la touche Entrée
		$(input).on("keyup", function(event) {
			if(event.keyCode==13) {
				sortieChamp(this, fonctionUpdate);
			} else if(event.keyCode==27) {
				$(this).val($(this).attr('valeurdebase'));
				fermeChampEditable($(this).attr('id'));
			}
		});
		
		//suppression du texte de la cellule
		$(this).text('');
		
		//ajout de l'input dans la cellule
		$(this).append(input);
		
		//focus sur le champ
		$(input).focus();
	});
	
	return tdnbjour;
}

function sortieChamp(champ, fonctionUpdate) {
	var idfonctionnel = $(champ).attr('idfonctionnel');
	var nomchamp = $(champ).attr('nomchamp');
	var valeurdebase = $(champ).attr('valeurdebase');
	var type = $(champ).attr('type');
	var valeur = $(champ).val();
	var td = $(champ).parent();
	var controle=true;
	if(valeurdebase!=valeur) {
		if(type=='numerique') {
			if(!$.isNumeric(valeur)) {
				alert("La saisie n'est pas un nombre");
				$(champ).focus();
			} else {
				return fonctionUpdate(idfonctionnel, nomchamp, valeur);
			}
		} else {
			fonctionUpdate(idfonctionnel, nomchamp, valeur);
		}
	} else {
		fermeChampEditable($(champ).attr('id'));
	}
}


function fermeChampEditable(champ) {
	var idperiode = $('#'+champ).attr('id');
	var valeur = $('#'+champ).val();
	var td = $('#'+champ).parent();
	$(td).attr('editencours', false);
	$(td).text(valeur);
}