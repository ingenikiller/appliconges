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
class GestionJourFerieService extends ServiceStub {
    //put your code here

	public function getListePeriode($p_contexte){
		//$requete="SELECT * FROM jourConges";
		
		$anneeDebutPeriode=$p_contexte->m_dataRequest->getData('anneeDebutPeriode');
		$anneeFinPeriode=$p_contexte->m_dataRequest->getData('anneeFinPeriode');
		$l_clause="dateFerie BETWEEN CONCAT($anneeDebutPeriode,'-01-01') AND CONCAT($anneeFinPeriode,'-12-31')";
		$listeJour = new ListObject();
        $listeJour->name='ListeJourFerie';
		$listeJour->requestNoPage('JourFerie', $l_clause);
		$p_contexte->addDataBlockRow($listeJour);
		
	}
	
	public function getListe($p_contexte){
		//$requete="SELECT * FROM jourConges";
		
		//$anneeDebutPeriode=$p_contexte->m_dataRequest->getData('anneeDebutPeriode');
		//$anneeFinPeriode=$p_contexte->m_dataRequest->getData('anneeFinPeriode');
		//$l_clause="dateFerie BETWEEN CONCAT($anneeDebutPeriode,'-01-01') AND CONCAT($anneeFinPeriode,'-12-31')";
		$page=1;
        $numeroPage=$p_contexte->m_dataRequest->getData('numeroPage');
        if($numeroPage!=null && $numeroPage!=''){
        	$page=$numeroPage;
        }
		$listeJour = new ListObject();
        $listeJour->name='ListeJourFerie';
		$listeJour->request('JourFerie', null, $page);
		$p_contexte->addDataBlockRow($listeJour);
		
	}

	public function delete($p_contexte){
		$date=$p_contexte->m_dataRequest->getData('date');
		$jour = new JourFerie();
		$jour->dateFerrie = $date;
		$jour->load();
		$jour->delete();
	}


}

?>
