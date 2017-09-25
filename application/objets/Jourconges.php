<?php
class Jourconges extends SavableObject {
	static private $key='user,jour';
	public function getPrimaryKey(){
		return self::$key;
	}
	public $user=NULL;
	
	public $jour=NULL;
	
	public $typePeriode;
	
}
?>