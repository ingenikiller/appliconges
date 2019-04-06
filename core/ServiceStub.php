<?php

abstract class ServiceStub {

	private $logger=null;

	public function fictive(ContextExecution $p_contexte){}
	
	protected function getLogger() {
		if($this->logger==null) {
			$this->logger = Logger::getRootLogger();
		}
		return $this->logger;
	}
	
}

?>