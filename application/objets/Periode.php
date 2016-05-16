<?php
class Periode extends SavableObject {
	static private $key='user,debut';
	public function getPrimaryKey(){
		return self::$key;
	}
	public $user=NULL;
	
	public $debut=NULL;
	
	public $fin;
	
	public $typeConges;
	
	public $nbjour;
	
}
?>