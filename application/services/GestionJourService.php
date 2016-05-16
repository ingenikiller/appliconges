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
class GestionJourService {
    //put your code here
    
	public function getListe($p_contexte){
		//$requete="SELECT * FROM jourConges";
		$l_clause='';
		$listeJour = new ListObject();
        $listeJour->name='ListeJour';
		$listeJour->requestNoPage('JourConges', $l_clause);
		$p_contexte->addDataBlockRow($listeJour);
		
	}
	
	
    public function create(ContextExecution $p_contexte){
        $jour = new JourConges();
        $jour->fieldObject($p_contexte->m_dataRequest);
		$jour->user = $p_contexte->getUser();
		$jour->create();
    }
    
	public function update(ContextExecution $p_contexte){
		$jour = new JourConges();
        $jour->fieldObject($p_contexte->m_dataRequest);
		$jour->user = $p_contexte->getUser();
		$jour->update();
	}
	
	
	public function delete(ContextExecution $p_contexte){
		$jour = new JourConges();
        $jour->fieldObject($p_contexte->m_dataRequest);
		$jour->user = $p_contexte->getUser();
		$jour->delete();
	}
	
}

?>
