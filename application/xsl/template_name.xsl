<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	
	<!-- 
		Modif select
	-->
	<xsl:template name="ModifSelect">
		<xsl:param name="value" select="''"/>
		<xsl:param name="Node"/>
		<xsl:param name="nom"/>
		<xsl:param name="defaultValue"/>
		<xsl:param name="defaultDisplay"/>
		<xsl:param name="onChange" select="''"/>
		<xsl:param name="class" select="''"/>
		<xsl:param name="tabindex" select="''"/>
		<xsl:param name="optionVide" select='O'/>
		<select name="{$nom}" id="{$nom}" class="{$class}">
			<xsl:if test="$onChange!=''">
				<xsl:attribute name="onchange">
					<xsl:value-of select="$onChange"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:if test="$tabindex!=''">
				<xsl:attribute name="tabindex"><xsl:value-of select="$tabindex"/></xsl:attribute>
			</xsl:if>
			<xsl:if test="$optionVide='O'">
				<option/>
			</xsl:if>
			<xsl:if test="$defaultValue!=''">
				<option value="{$defaultValue}">
					<xsl:value-of select="$defaultDisplay"/>
				</option>
			</xsl:if>
			<xsl:for-each select="$Node/Segment">
				<xsl:choose>
					<xsl:when test="$value=codseg">
						<option value="{codseg}" selected="selected">
							<xsl:value-of select="liblong"/>
						</option>
					</xsl:when>
					<xsl:otherwise>
						<option value="{codseg}">
							<xsl:value-of select="liblong"/>
						</option>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
		</select>
	</xsl:template>
	
	<!--
		édition d'une période
	-->
	<xsl:template name="periodeEdition">
		<div class="modal fade bd-example-modal-lg" tabindex="-1" id="boiteCreationPeriode" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Création</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true" class="oi oi-x"></span>
						</button>
					</div>
					<div class="modal-body">
						<form method="POST" action="#" onsubmit="return soumettre(this);" name="periode" id="periode">
							<input type="hidden" name="idperiode" id="idperiode"/>
							<input type="hidden" name="service" id="service"/>
							<div class="container" style="width:580px;">
								<div class="col-lg-12">
									<div class="form-group row">
										<label for="noReleve" class="col-sm-6 form-control-label">
											<xsl:value-of select="$LBL.DEBUT"/>
										</label>
										<div class="col-sm-6">
											<input class="form-control" size="12" name="debut" id="debut" tabindex="10"/>
										</div>
									</div>
									<div class="form-group row">
										<label for="fin" class="col-sm-6 form-control-label">
											<xsl:value-of select="$LBL.FIN"/>
										</label>
										<div class="col-sm-6">
											<input class="form-control" type="text" name="fin" id="fin" size="11" maxlength="10" tabindex="20"/>
										</div>
									</div>
									<div class="form-group row">
										<label for="fin" class="col-sm-6 form-control-label">
											<xsl:value-of select="$LBL.TYPE"/>
										</label>
										<div class="col-sm-6">
											<select class="form-control" name="typePeriode" id="typePeriode" tabindex="30">
												<option value="rtt">RTT</option>
												<option value="conges">CP</option>
												<option value="cpa">CP anticipés</option>
												<option value="cps">CP sans solde</option>
											</select>
										</div>
									</div>
									<div class="form-group row">
										<label for="fin" class="col-sm-6 form-control-label">
											<xsl:value-of select="$LBL.NBJOURS"/>
										</label>
										<div class="col-sm-6">
											<input class="form-control" type="text" name="nbjour" id="nbjour" size="11" maxlength="10" tabindex="30"/>
										</div>
									</div>
									<!--div class="row">
										<div class="col-xs-4"/>
										<div class="form-group row">
											<div class="col-sm-offset-5 col-sm-5">
												<button type="submit" class="btn btn-primary">Valider</button>
											</div>
										</div>
									</div-->
									<div class="modal-footer">
										<button type="submit" class="btn btn-primary">Valider</button>
										<button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>