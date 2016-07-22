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
				<div class="container">
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
			
			<link href="application/bootstrap/bootstrap-3.3.5-dist/js/bootstrap.min.js" rel="stylesheet"/>
			<link href="application/bootstrap/bootstrap-{$BOOTSTRAP-VERSION}-dist/css/bootstrap.min.css" rel="stylesheet"/>
			<link href="application/jquery/jquery-ui-{$JQUERY-VERSION}.custom/jquery-ui.min.css" rel="stylesheet" type="text/css"/>
			
			<script type="text/javascript" src="application/jquery/jquery-ui-{$JQUERY-VERSION}.custom/external/jquery/jquery.js" charset="iso-8859-1">&#160;</script>
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
	
	<xsl:template name="onLoadTemplate"/>
	
</xsl:stylesheet>
