
function getColonneIndex(hotInstance, nomColonneData) {
	var index = -1;
	for(i=0; i<hotInstance.countCols(); i++) {
		if(hotInstance.colToProp(i)==nomColonneData) {
			index=i;
		}
	}
	return index;
}