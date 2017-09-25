<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:import href="template_name.xsl"/>
    <xsl:import href="commun.xsl"/>
    <xsl:template name="Contenu">
        <div class="row">
            <div class="col-lg-offset-4 col-lg-4">
                <form method="POST" name="recherche" id="recherche" onsubmit="return rechercherJoursFeries(this);">
                    <xsl:call-template name="formulaireJson"/>
                </form>
				<xsl:call-template name="periodeEdition"/>
				<!--button type="button" class="btn btn-primary" id="" name="" value="{$LBL.CREER}" onclick="editerPeriode('');">
					<span class="glyphicon glyphicon-plus"/>
				</button-->
				<div class="input-group">
					<input type="text" class="form-control" placeholder="{$LBL.DATE}"/>
					<!--i class="glyphicon glyphicon-calendar form-control-feedback"></i-->
					  <span class="input-group-btn">
						<button class="btn btn-default" type="button">Go!</button>
					  </span>
					<!--span class="glyphicon glyphicon-calendar"/-->
					<!-- glyphicon glyphicon-calendar -->
				</div>
                <table class="table table-stripedtable-bordered" name="tableauResultat" id="tableauResultat">
                    <thead>
                        <tr>
                            <th align="text-center">
                                <xsl:value-of select="$LBL.DATE"/>
                            </th>
                            <th class="text-center">
                                <xsl:value-of select="$LBL.NOM"/>
                            </th>
							<th class="text-center">
                                <xsl:value-of select="$LBL.ACTIONS"/>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="tbodyResultat"/>
                </table>
                <br/>
            </div>
        </div>
    </xsl:template>
    <xsl:template name="js.module.sheet">
        <script language="JavaScript" src="application/js/communFormulaire.js" type="text/javascript"/>
        <script language="JavaScript" src="application/js/datepicker.js" type="text/javascript"/>
        <script language="JavaScript" src="application/js/jourFerie.js" type="text/javascript"/>
    </xsl:template>
</xsl:stylesheet>
