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
class GestionPeriodeService extends ServiceStub {
    //put your code here
    
	public function getListeActive($p_contexte){
		$reqJourPris = 'SELECT COALESCE(SUM(duree), 0) AS total FROM periode LEFT JOIN jourConges ON periode.user=jourConges.user AND jourConges.jour BETWEEN periode.debut AND periode.fin AND jourConges.typePeriode LIKE CONCAT(periode.typePeriode, \'%\') LEFT JOIN typePeriode ON typePeriode.typePeriode = jourConges.typePeriode WHERE periode.debut=\'$parent->debut\' AND periode.fin=\'$parent->fin\' AND jourConges.jour < CURDATE() GROUP BY debut, fin , nbjour, periode.typePeriode ORDER BY debut';
		$joursPris= new ListDynamicObject();
        $joursPris->name='JoursPris';
        $joursPris->setAssociatedRequest(null, $reqJourPris);
		
		
		$l_requete = 'SELECT idperiode, debut, fin , nbjour, periode.typePeriode, affichage, COALESCE(SUM(duree), 0) AS total FROM periode 
					LEFT JOIN jourConges ON periode.user=jourConges.user AND jourConges.jour BETWEEN periode.debut AND periode.fin 
					AND jourConges.typePeriode LIKE CONCAT(periode.typePeriode, \'%\')
					LEFT JOIN typePeriode ON typePeriode.typePeriode = jourConges.typePeriode 
					WHERE affichage=1
					GROUP BY idperiode, debut, fin , nbjour, periode.typePeriode, affichage ORDER BY debut';
					//CURDATE() <= DATE(periode.fin)
		
		$listePeriodes = new ListDynamicObject();
        $listePeriodes->name = 'ListePeriodes';
		$listePeriodes->setAssociatedKey($joursPris);
        $listePeriodes->request($l_requete);
        $p_contexte->addDataBlockRow($listePeriodes);
	}
	
	public function getListe($p_contexte){
		$l_requete = 'SELECT idperiode, debut, fin , nbjour, periode.typePeriode, affichage FROM periode';
					//CURDATE() <= DATE(periode.fin)
		
		$listePeriodes = new ListDynamicObject();
        $listePeriodes->name = 'ListePeriodes';
		//$listePeriodes->setAssociatedKey($joursPris);
        $listePeriodes->request($l_requete);
        $p_contexte->addDataBlockRow($listePeriodes);
	}
	
	public function getOne($p_contexte){
		$idperiode = $p_contexte->m_dataRequest->getData('idperiode');
		
		$periode = new Periode();
		$periode->idperiode = $idperiode;
		$periode->load();
		$p_contexte->addDataBlockRow($periode);
		
	}
	
    public function create(ContextExecution $p_contexte){
		$periode = new Periode();
        $periode->fieldObject($p_contexte->m_dataRequest);
		$periode->user = $p_contexte->getUser();
        $periode->create();
        $reponse = new ReponseAjax();
        $reponse->status='OK';
        $p_contexte->addDataBlockRow($reponse);
    }
    
	public function update(ContextExecution $p_contexte){
		$idperiode = $p_contexte->m_dataRequest->getData('idperiode');
		
		$periode = new Periode();
		$periode->idperiode = $idperiode;
		$periode->load();
        $periode->fieldObject($p_contexte->m_dataRequest);
		$periode->update();
	}
		
	public function delete(ContextExecution $p_contexte){

	}
	
	public function modifieAffichage(ContextExecution $p_contexte){
		$idperiode = $p_contexte->m_dataRequest->getData('idperiode');
		$affichage = $p_contexte->m_dataRequest->getData('affichage');
		$periode = new Periode();
		$periode->idperiode = $idperiode;
		$periode->load();
		/*if($periode->affichage==''){
			$periode->affichage = 'checked';
		} else {
			$periode->affichage = '';
		}*/
		$periode->affichage = $affichage;
		$periode->update();
	}
}

?>