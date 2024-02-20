<?php
class Periode extends SavableObject {
	static private $key='idperiode';
	public function getPrimaryKey(){
		return self::$key;
	}
	public $idperiode=NULL;
	
	public $user;
	
	public $debut;
	
	public $fin;
	
	public $typePeriode;
	
	public $nbjour;
	
	public $affichage;
	
	public $datecre;
	
	public $datemod;
	
	public $utimod;
	
}
?>