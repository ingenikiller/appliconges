<?php

class PeriodeCommun {
    
    /*************************************************************
	 *
	 * permet de vérifier qu'une période est unique
	 *
	 *************************************************************/
    public static function controleChevauchement(Periode $periode) {
		//recherche d'une période dont les dates et le type de conges correspond à celle passée en paramètre
		$requete = "SELECT idperiode FROM periode WHERE ";
		if($periode->idperiode!='') {
			$requete.="idperiode<>$periode->idperiode AND ";
		}
		
		$requete.="typePeriode='$periode->typePeriode' and user=$periode->user
				AND (debut BETWEEN '$periode->debut' AND '$periode->fin' OR fin BETWEEN '$periode->debut' AND '$periode->fin')";
		
		$list = new ListDynamicObject('periode');
        $list->request($requete);
		return $list->getNbLineTotal();
	}
    
}

?>
