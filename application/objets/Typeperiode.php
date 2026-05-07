<?php

namespace Application\Objects;

use Core\SavableObject;

class Typeperiode extends SavableObject {
	static private $key='typePeriode';
	public function getPrimaryKey(){
		return self::$key;
	}
	public $typePeriode=NULL;
	
	public $duree;
	
	public $principale;
	
}
?>