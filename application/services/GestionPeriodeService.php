<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of GenrateurService
 *
 * @author ingeni
 */
class GestionPeriodeService {
    //put your code here
    
	public function getListe($p_contexte){
		$reqJourPris = 'SELECT COALESCE(SUM(duree), 0) AS total FROM periode LEFT JOIN jourConges ON periode.user=jourConges.user AND jourConges.jour BETWEEN periode.debut AND periode.fin AND jourConges.typeConges LIKE CONCAT(periode.typeConges, \'%\') LEFT JOIN typeConges ON typeConges.typeConges = jourConges.typeConges WHERE periode.debut=\'$parent->debut\' AND periode.fin=\'$parent->fin\' AND jourConges.jour < CURDATE() GROUP BY debut, fin , nbjour, periode.typeConges ORDER BY debut';
		$joursPris= new ListDynamicObject();
        $joursPris->name='JoursPris';
        $joursPris->setAssociatedRequest(null, $reqJourPris);
		
		
		$l_requete = 'SELECT debut, fin , nbjour, periode.typeConges, COALESCE(SUM(duree), 0) AS total FROM periode 
					LEFT JOIN jourConges ON periode.user=jourConges.user AND jourConges.jour BETWEEN periode.debut AND periode.fin 
					AND jourConges.typeConges LIKE CONCAT(periode.typeConges, \'%\')
					LEFT JOIN typeConges ON typeConges.typeConges = jourConges.typeConges 
					WHERE YEAR(CURDATE()) <= YEAR(periode.fin)
					GROUP BY debut, fin , nbjour, periode.typeConges ORDER BY debut';
		
		$listePeriodes = new ListDynamicObject();
        $listePeriodes->name = 'ListePeriodes';
		$listePeriodes->setAssociatedKey($joursPris);
        $listePeriodes->request($l_requete);
        $p_contexte->addDataBlockRow($listePeriodes);
	}
	
	
    public function create(ContextExecution $p_contexte){

    }
    
	public function update(ContextExecution $p_contexte){

	}
		
	public function delete(ContextExecution $p_contexte){

	}
	
}

?>
