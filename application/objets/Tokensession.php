<?php

namespace Application\Objects;

use Core\SavableObject;

class Tokensession extends SavableObject {
	static private $key='token';
	public function getPrimaryKey(){
		return self::$key;
	}
	public $userid=NULL;
	
	public $token;
	
	public $startdate;
	
}
?>