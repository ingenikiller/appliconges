<?php

class UtilsRequete {
	
	public static function requeteListe($p_requete) {
		$listePeriodes = new ListDynamicObject();
        $listePeriodes->name = 'Liste';
		$listePeriodes->request($p_requete);
        return $listePeriodes;
	}
	
}

?>