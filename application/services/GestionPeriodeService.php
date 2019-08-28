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

	public function getListeActive($p_contexte){
		$reqJourPris = 'SELECT COALESCE(SUM(duree), 0) AS total FROM periode 
			LEFT JOIN jourconges ON periode.user=jourconges.user AND jourconges.jour BETWEEN periode.debut AND periode.fin AND jourconges.typePeriode LIKE CONCAT(periode.typePeriode, \'%\') 
			LEFT JOIN typeperiode ON typeperiode.typePeriode = jourconges.typePeriode 
			WHERE periode.debut=\'$parent->debut\' AND periode.fin=\'$parent->fin\' AND periode.typePeriode=\'$parent->typePeriode\' AND jourconges.jour < CURDATE()  AND periode.user=\'$parent->user\'
			GROUP BY debut, fin , nbjour, periode.typePeriode 
			ORDER BY debut';
		$joursPris= new ListDynamicObject();
        $joursPris->name='JoursPris';
        $joursPris->setAssociatedRequest(null, $reqJourPris);
		
		//jour pris entre le 01/11 et 31/12
		$reqFrac = 'SELECT COALESCE(SUM(duree), 0) AS total FROM periode 
			LEFT JOIN jourconges ON periode.user=jourconges.user AND jourconges.jour BETWEEN CONCAT(\'$parent->annee\', \'-11-01\') AND periode.fin AND jourconges.typePeriode LIKE CONCAT(periode.typePeriode, \'%\') 
			LEFT JOIN typeperiode ON typeperiode.typePeriode = jourconges.typePeriode 
			WHERE periode.debut=\'$parent->debut\' AND periode.fin=\'$parent->fin\' AND periode.typePeriode=\'$parent->typePeriode\' AND periode.user=\'$parent->user\'
			GROUP BY debut, fin , nbjour, periode.typePeriode 
			ORDER BY debut';
		$joursFrac= new ListDynamicObject();
        $joursFrac->name='JoursFrac';
        $joursFrac->setAssociatedRequest(null, $reqFrac);
		
		$user = $p_contexte->getUser()->userId;
		
		$l_requete = "SELECT idperiode, debut, fin , nbjour, periode.typePeriode, affichage, COALESCE(SUM(duree), 0) AS total, SUBSTR(debut, 1, 4) AS annee, periode.user FROM periode 
			LEFT JOIN jourconges ON periode.user=jourconges.user AND jourconges.jour BETWEEN periode.debut AND periode.fin AND jourconges.typePeriode LIKE CONCAT(periode.typePeriode, '%')
			LEFT JOIN typeperiode ON typeperiode.typePeriode = jourconges.typePeriode 
			WHERE affichage=1 and periode.user='$user'
			GROUP BY idperiode, debut, fin , nbjour, periode.typePeriode, affichage 
			ORDER BY debut";
		
		$listePeriodes = new ListDynamicObject();
        $listePeriodes->name = 'ListePeriodes';
		$listePeriodes->setAssociatedKey($joursPris);
		$listePeriodes->setAssociatedKey($joursFrac);
        $listePeriodes->request($l_requete);
        $p_contexte->addDataBlockRow($listePeriodes);
	}
	
	public function getListe($p_contexte){
		$user = $p_contexte->getUser()->userId;
		$l_requete = "SELECT idperiode, debut, fin , nbjour, periode.typePeriode, affichage FROM periode where periode.user = '$user' ORDER BY fin DESC, typePeriode";
		
		$listePeriodes = new ListDynamicObject();
        $listePeriodes->name = 'ListePeriodes';
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
		$this->getLogger()->debug('user create:'.$p_contexte->getUser()->userId);
		$periode->user = $p_contexte->getUser()->userId;
        $periode->create();
        $p_contexte->ajoutReponseAjaxOK();
    }
    
	public function update(ContextExecution $p_contexte){
		$idperiode = $p_contexte->m_dataRequest->getData('idperiode');
		
		$periode = new Periode();
		$periode->idperiode = $idperiode;
		$periode->load();
        $periode->fieldObject($p_contexte->m_dataRequest);
		
		$nbperiode=PeriodeCommun::controleChevauchement($periode);
		$this->getLogger()->debug('requete nbperiode:'.$nbperiode);
		$reponse = new ReponseAjax();
		if($nbperiode==0) {
			$periode->update();
			$reponse->status = 'OK';
		} else {
			$reponse->status = 'KO';
			$reponse->message = 'Chevauchement avec au moins une autre période';
		}
		$p_contexte->addDataBlockRow($reponse);
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
		$p_contexte->ajoutReponseAjaxOK();
	}
}

?>