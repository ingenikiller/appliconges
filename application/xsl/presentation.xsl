<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output indent="yes" method="html" omit-xml-declaration="yes" />
	<!--regle principal-->
	<xsl:template match="/">
		<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>
		<html lang="fr">
			<xsl:call-template name="Header">
				<xsl:with-param name="HeadTitre">Appli congès</xsl:with-param>
			</xsl:call-template>
			<body>
				<xsl:attribute name="onload">
					<xsl:call-template name="onLoadTemplate"/>
				</xsl:attribute>
				<!--div style="float:left; width:300px; margin-left: 10px;">
					<a>Congès</a><br/>
					<a>Paramétrage</a>
				</div-->
				
				<div class="container">
				<xsl:variable name="affMenu">
					<xsl:call-template name="controleMenu"/>
				</xsl:variable>
				<xsl:if test="$affMenu='O'">
					<!--row-->
					 <div class="dropdown">
					  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
						Menu
						</button>
					  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						<li><a class="dropdown-item" href="index.php?domaine=calendrier&amp;service=getpage">Calendrier</a></li>
						<li><a class="dropdown-item" href="index.php?domaine=periode&amp;service=getpage">Période</a></li>
						<li><a class="dropdown-item" href="index.php?domaine=jourferie&amp;service=getpage">Jours fériés</a></li>
					  </ul>
					</div>
					<!--/row-->
					<!--div class="dropdown">
					  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
						Dropdown button
					  </button>
					  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						<li><a class="dropdown-item" href="#">Action</a></li>
						<li><a class="dropdown-item" href="#">Another action</a></li>
						<li><a class="dropdown-item" href="#">Something else here</a></li>
					  </ul>
					</div-->
				</xsl:if>
				
					<!--li><a class="dropdown-item" href="index.php?domaine=calendrier&amp;service=getpage">Calendrier</a></li>
						<li><a class="dropdown-item" href="index.php?domaine=periode&amp;service=getpage">Période</a></li>
						<li><a class="dropdown-item" href="index.php?domaine=jourferie&amp;service=getpage">Jours fériés</a></li-->
					
					<br/>
					<xsl:call-template name="Contenu"/>	
				</div>
			</body>
		</html>
	</xsl:template>
	
	<!-- template entete -->
	<xsl:template name="entete">
		<xsl:call-template name="banniere"/>
	</xsl:template>
	
	<!--header de la domaine-->
	<xsl:template name="Header">
		<xsl:param name="HeadTitre"/>
		<head>
			<meta content="text/html;charset=UTF-8" http-equiv="content-type"/>
			<meta NAME="DESCRIPTION" CONTENT="PhpMyBudget"/>
			<meta NAME="KEYWORDS" CONTENT="gestion compte"/>
			<meta http-equiv="Pragma" content="no-cache"/>
			<meta http-equiv="Cache-Control" content="no-cache"/>
			<meta http-equiv="Expires" content="0"/>
			<meta http-equiv="X-UA-Compatible" content="IE=8"/>
			<title>
				<xsl:value-of select="$HeadTitre"/>
			</title>
			
			
			<link href="front/bootstrap/bootstrap-{$BOOTSTRAP-VERSION}-dist/css/bootstrap.min.css" rel="stylesheet"/>
			<link href="front/jquery/jquery-ui-{$JQUERY-VERSION}.custom/jquery-ui.min.css" rel="stylesheet" type="text/css"/>
			<link href="front/font/css/open-iconic-bootstrap.css" rel="stylesheet" type="text/css"/>
			
			
			
			<script type="text/javascript" src="front/jquery/jquery-ui-{$JQUERY-VERSION}.custom/external/jquery/jquery.js" charset="iso-8859-1">&#160;</script>
			<script type="text/javascript" src="front/bootstrap/bootstrap-{$BOOTSTRAP-VERSION}-dist/js/bootstrap.bundle.min.js" charset="iso-8859-1">&#160;</script>
			
			<script type="text/javascript" src="front/jquery/jquery-ui-{$JQUERY-VERSION}.custom/jquery-ui.min.js" charset="iso-8859-1">&#160;</script>
			
			<script type="text/javascript" src="front/js/core_ajax.js" charset="iso-8859-1">&#160;</script>
			<script type="text/javascript" src="front/js/touchefonction.js" charset="iso-8859-1">&#160;</script>
			
			<script src="front/core/session.js">&#160;</script>
			
			
			<link href="front/css/bootstrap-force.css" rel="stylesheet" type="text/css"/>
			<link href="front/css/principal.css" rel="stylesheet" type="text/css"/>
			<link href="front/css/style.css" rel="stylesheet" type="text/css"/>
			<link href="front/css/style_calendrier.css" rel="stylesheet" type="text/css"/>
			
			<xsl:call-template name="js.module.sheet"/>
		</head>
	</xsl:template>
	
	<!-- banniere -->
	<xsl:template name="banniere">
		<div id="titre">
			<center>
				<br/>
				<br/>
			</center>
		</div>
	</xsl:template>
	<xsl:template name="controleMenu">O</xsl:template>
	<xsl:template name="onLoadTemplate"/>
	
</xsl:stylesheet>
