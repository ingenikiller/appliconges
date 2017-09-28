<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PeriodeCommun
 *
 * @author ingeni
 */
class PeriodeCommun {
    //put your code here
    
    public static function controleChevauchement(Periode $periode) {
		//recherche d'une période dont les dates et le type de conges correspond à celle passée en paramètre
		$requete = "SELECT idperiode FROM periode WHERE ";
		if($periode->idperiode!='') {
			$requete.="idperiode<>$periode->idperiode AND ";
		}
		
		$requete.="typePeriode='$periode->typePeriode' 
				AND (debut BETWEEN '$periode->debut' AND '$periode->fin' OR fin BETWEEN '$periode->debut' AND '$periode->fin')";
		
		$list = new ListDynamicObject();
        $list->name='periode';
        $list->request($requete);
		return $list->nbLineTotal;
	}
    
}

?>
