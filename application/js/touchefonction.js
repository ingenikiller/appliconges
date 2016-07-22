function bloqueTouchesFonctions(e){
	var isIE = (document.all ? true : false);
	if (isIE) {
		document.onhelp = function() {
			return false;
		};
		window.onhelp = function() {
			return false;
		};
	
		window.event.returnValue = false;
		window.event.keyCode = 0;
		//window.status = "Refresh is disabled";
	}
	e.preventDefault();
	e.stopPropagation();
}

$(function() {
	$(document).keydown(function(event){
		//bloqueTouchesFonctions(event);
		var touche = event.which;
		//$("#texte").append(touche);
		//var input = $(document.activeElement);
		//alert(touche);
		switch(touche){
			case 8:
				var focused = $(document.activeElement);
				if(focused[0].tagName=="INPUT"){
					return true;
				} else {
				return false;
				}
				break;
			case 112:
				if(activeF1(event)){
					bloqueTouchesFonctions(event);
					/*if($("div#boiteAideFonction").dialog('isOpen')){
						$("div#boiteAideFonction").dialog('close');
					} else {*/
					//alert($("div#boiteAideFonction").dialog('isOpen'));
						$("div#boiteAideFonction").dialog({
							resizable: false,
							height:250,
							width:300,
							modal: true,
							position: 'center',
							closeOnEscape: true
						});
					//alert($("div#boiteAideFonction").dialog('isOpen'));
					//}
				}
				break;
			case 113:
				activeF2(event);
				break;
			case 114:
				activeF3(event);
				break;
			case 115:
				activeF4(event);
				break;
			case 116:
				activeF5(event);
				break;
			case 117:
				activeF6(event);
				break;
			case 118:
				activeF7(event);
				break;
		}
	});
});

function activeF1(event){
	return false;
}

function activeF2(event){
	return false;
}
function activeF3(event){
	return false;
}
function activeF4(event){
	return false;
}
function activeF5(event){
	return false;
}
function activeF6(event){
	return false;
}
function activeF7(event){
	return false;
}