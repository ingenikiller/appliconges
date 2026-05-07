<?php

namespace Application\Objects;

use Core\SavableObject;

class Ikligne extends SavableObject {
	static private $key='indemlnitekilometriqueid';
	public function getPrimaryKey(){
		return self::$key;
	}
	public $indemlnitekilometriqueid=NULL;
	
	public $mois;
	
	public $jour;
	
	public $client;
	
	public $adresse;
	
	public $nombrekilometres;
	
	public $userid;
	
	public $datecre;
	
	public $datemod;
	
	public $utimod;
	
}
?>