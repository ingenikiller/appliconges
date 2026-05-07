<?php

namespace Application\Objects;

use Core\SavableObject;

class IKEntete extends SavableObject {
	static private $key='IKEnteteid';
	public function getPrimaryKey(){
		return self::$key;
	}
	public $IKEnteteid=NULL;
	
	public $userid;
	
	public $personne;
	
	public $mois;
	
	public $modelevoiture;
	
	public $puissance;
	
	public $indemparkm;
	
}
?>