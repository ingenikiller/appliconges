<?php
class Jourferie extends SavableObject {
	static private $key='annee,nom';
	public function getPrimaryKey(){
		return self::$key;
	}
	public $annee=NULL;
	
	public $nom=NULL;
	
	public $dateFerie;
	
}
?>