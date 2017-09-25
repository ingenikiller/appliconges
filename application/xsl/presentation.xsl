<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<!--regle principal-->
	<xsl:template match="/">
		<html>
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
					<row>
					 <div class="dropdown">
					  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">Menu
					  <span class="caret"></span></button>
					  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
						<li><a href="index.php?domaine=calendrier&amp;service=getpage">Calendrier</a></li>
						<li><a href="index.php?domaine=periode&amp;service=getpage">Période</a></li>
						<li><a href="index.php?domaine=jourferie&amp;service=getpage">Jours fériés</a></li>
					  </ul>
					</div>
					</row>
				</xsl:if>
					
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
			
			<link href="application/bootstrap/bootstrap-{$BOOTSTRAP-VERSION}-dist/css/bootstrap.min.css" rel="stylesheet"/>
			<link href="application/jquery/jquery-ui-{$JQUERY-VERSION}.custom/jquery-ui.min.css" rel="stylesheet" type="text/css"/>
			
			<script type="text/javascript" src="application/jquery/jquery-ui-{$JQUERY-VERSION}.custom/external/jquery/jquery.js" charset="iso-8859-1">&#160;</script>
			<script type="text/javascript" src="application/bootstrap/bootstrap-{$BOOTSTRAP-VERSION}-dist/js/bootstrap.min.js" charset="iso-8859-1">&#160;</script>
			
			<script type="text/javascript" src="application/jquery/jquery-ui-{$JQUERY-VERSION}.custom/jquery-ui.min.js" charset="iso-8859-1">&#160;</script>
			
			<!--script type="text/javascript" src="application/js/commun.js" charset="iso-8859-1">&#160;</script>
			<script type="text/javascript" src="application/js/communFormulaire.js" charset="iso-8859-1">&#160;</script>
			<script type="text/javascript" src="application/js/dateFormat.js" charset="iso-8859-1">&#160;</script>
			<script type="text/javascript" src="application/js/communJson.js" charset="iso-8859-1">&#160;</script-->
			<script type="text/javascript" src="application/js/touchefonction.js" charset="iso-8859-1">&#160;</script>
			
			<link href="application/css/principal.css" rel="stylesheet" type="text/css"/>
			<link href="application/css/style.css" rel="stylesheet" type="text/css"/>
			<link href="application/css/style_calendrier.css" rel="stylesheet" type="text/css"/>
			
			<xsl:call-template name="js.module.sheet"/>
		</head>
	</xsl:template>
	
	<!-- banniere -->
	<xsl:template name="banniere">
		<div id="titre">
			<center>
				<br/>
				<!--img src="application/images/banniere.gif" alt="banniere"/>
				<br/-->
				<br/>
			</center>
		</div>
	</xsl:template>
	<xsl:template name="controleMenu">O</xsl:template>
	<xsl:template name="onLoadTemplate"/>
	
</xsl:stylesheet>
