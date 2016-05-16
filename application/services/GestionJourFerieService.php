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
		$l_clause='';
		$listeJour = new ListObject();
        $listeJour->name='ListeJourFerie';
		$listeJour->requestNoPage('JourFerie', $l_clause);
		$p_contexte->addDataBlockRow($listeJour);
		
	}
	
	
    
	
}

?>
