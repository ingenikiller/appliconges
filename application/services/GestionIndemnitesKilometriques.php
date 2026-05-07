<?php

namespace Application\Services;

use Core\ServiceStub;

class GestionIndemnitesKilometriques extends ServiceStub {



    public function genereMois($p_contexte) {

        $l_mois="";
        $l_userid=$p_contexte->getUser()->userId;

        //vérifier qu'il n'y a pas une feuille existante
        $l_exist = new IKEntete();
        $l_exist->mois=$l_mois;
        $l_exist->userid = $l_userid;
        $l_exist->load();


        //création entete
        $entete = new IKEntete();
        $entete->mois=$l_mois;
        $entete->userid = $l_userid;


        //creation lignes
        $l_requete="with recursive t(i, d) as 
        (
        select  1, str_to_date('$l_mois-01', '%Y-%m-%d')
        union all
        select i + 1, date_add(d, interval 1 day)
        from t
        where i < 31
        )
        select t.d as jour from t
        left join jourferie j on j.dateFerie=t.d
        where DAyofweek(d) not in (7,1)
        and d like '$l_mois%'
        and j.dateFerie is null"
        ;

        
        $listeJours = ((UtilsRequete::requeteListe($l_requete))->getData());
        for($i=0; $i<count($listeJours); $i++) {
            $jour = new Ikligne();
            $jour->mois = $l_mois;
            $jour->jour = $listeJours[$i]->jour;
            $jour->userid = $l_userid;
            $jour->create();
        }


    }
}

?>