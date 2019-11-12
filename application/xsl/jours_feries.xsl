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
				<!-- affichage liste des jours fériés d'une année -->
				<div id="divListe" style="display:none;">
					<form id="modifjourferie" onsubmit="return modificationJourFerie(this);" class="form-inline">
						<input type="hidden" id="anneeModif"/>
						<table class="table table-stripedtable-bordered" name="tableauResultat" id="tableauResultat">
							<thead>
								<tr>
									<th align="text-center">
										<xsl:value-of select="$LBL.NOM"/>
									</th>
									<th class="text-center">
										<xsl:value-of select="$LBL.DATE"/>
									</th>
								</tr>
							</thead>
							<tbody id="tbodyResultat"/>
						</table>
						<input type="submit" class="btn btn-primary" value="{$LBL.MODIFIER}"/>
					</form>
				</div>
                <br/>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="js.module.sheet">
        <script language="JavaScript" src="front/js/communFormulaire.js" type="text/javascript"/>
        <script language="JavaScript" src="front/js/datepicker.js" type="text/javascript"/>
        <script language="JavaScript" src="front/js/jourFerie.js" type="text/javascript"/>
    </xsl:template>
</xsl:stylesheet>
