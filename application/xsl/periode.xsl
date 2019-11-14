<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:import href="template_name.xsl"/>
    <xsl:import href="commun.xsl"/>
    <xsl:template name="Contenu">
        <div class="row justify-content-md-center">
            <div class="col-lg-6">
                <form method="POST" name="recherche" id="recherche" onsubmit="return rechercherOperations(this);">
                    <xsl:call-template name="formulaireJson"/>
                </form>
				<xsl:call-template name="periodeEdition"/>
				
				<button type="button" class="btn btn-primary" id="" name="" value="{$LBL.CREER}" onclick="editerPeriode('');" title="Créer une nouvelle période">
					<span class="oi oi-plus">&#160;</span>
				</button>
				<br/>
				<div id="divTablePeriodes"/>
                <br/>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="js.module.sheet">
		<link href="front/handsontable/7.2.2/dist/handsontable.full.min.css" rel="stylesheet" media="screen"/>
		<script src="front/handsontable/7.2.2/dist/handsontable.full.min.js"/>
		<script src="front/handsontable/7.2.2/dist/languages/fr-FR.js"/>
        <script language="JavaScript" src="front/js/communFormulaire.js" type="text/javascript"/>
        <script language="JavaScript" src="front/js/datepicker.js" type="text/javascript"/>
		<script language="JavaScript" src="front/js/celluleEditable.js" type="text/javascript"/>
        <script language="JavaScript" src="front/js/periode.js" type="text/javascript"/>
    </xsl:template>
</xsl:stylesheet>
