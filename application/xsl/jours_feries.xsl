<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:import href="template_name.xsl"/>
    <xsl:import href="commun.xsl"/>
    <xsl:template name="Contenu">
        <div class="row justify-content-md-center">
            <div class="col-lg-4">
                <form method="POST" name="recherche" id="recherche" onsubmit="return rechercherJoursFeries(this);">
                    <xsl:call-template name="formulaireJson"/>
                </form>
				<xsl:call-template name="periodeEdition"/>
				
				<form id="creationanneejourferie" onsubmit="return creerAnnee();" class="form-inline">
					<div class="input-group">
						<input type="text" id="nouvelleAnnee" class="form-control" placeholder="{$LBL.ANNEE}" readonly="readonly"/>
							<span class="input-group-btn">
								<button class="btn btn-default" type="submit">Créer</button>
							</span>
					</div>
				</form>
				<div class="col col-lg4 form-group">
					<label for="annee" class="col-sm-4 form-control-label">
						<xsl:value-of select="$LBL.ANNEE"/>
					</label>
					<div class="col-sm-6">
						<select name="listeAnnee" id="listeAnnee" class="form-control" onchange="rechercheanneejoursferies(this.value)">&#160;</select>
					</div>
				</div>
				<br/>
				<div id="divListe" style="display:none;">
					<div id="divTableJoursFeries"/>
				</div>
                <br/>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="js.module.sheet">
		<link href="front/handsontable/7.2.2/dist/handsontable.full.min.css" rel="stylesheet" media="screen"/>
		<script src="front/handsontable/7.2.2/dist/handsontable.full.min.js"/>
        <script language="JavaScript" src="front/js/utils_handsontable.js" type="text/javascript"/>
        <script language="JavaScript" src="front/js/communFormulaire.js" type="text/javascript"/>
        <script language="JavaScript" src="front/js/datepicker.js" type="text/javascript"/>
        <script language="JavaScript" src="front/js/jourFerie.js" type="text/javascript"/>
    </xsl:template>
</xsl:stylesheet>
