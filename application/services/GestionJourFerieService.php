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
class GestionJourFerieService {
    //put your code here

	public function getListe($p_contexte){
		//$requete="SELECT * FROM jourConges";
		
		$anneeDebutPeriode=$p_contexte->m_dataRequest->getData('anneeDebutPeriode');
		$anneeFinPeriode=$p_contexte->m_dataRequest->getData('anneeFinPeriode');
		$l_clause="dateFerie BETWEEN CONCAT($anneeDebutPeriode,'-01-01') AND CONCAT($anneeFinPeriode,'-12-31')";
		$listeJour = new ListObject();
        $listeJour->name='ListeJourFerie';
		$listeJour->requestNoPage('JourFerie', $l_clause);
		$p_contexte->addDataBlockRow($listeJour);
		
	}




}

?>
