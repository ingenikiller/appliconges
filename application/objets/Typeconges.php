<?php
class Typeconges extends SavableObject {
	static private $key='typeConges';
	public function getPrimaryKey(){
		return self::$key;
	}
	public $typeConges=NULL;
	
	public $duree;
	
}
?>