<?php
class Typeperiode extends SavableObject {
	static private $key='typePeriode';
	public function getPrimaryKey(){
		return self::$key;
	}
	public $typePeriode=NULL;
	
	public $duree;
	
}
?>