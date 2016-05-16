<?php
class Jourferie extends SavableObject {
	static private $key='dateFerie';
	public function getPrimaryKey(){
		return self::$key;
	}
	public $dateFerie=NULL;
	
	public $nom;
	
}
?>