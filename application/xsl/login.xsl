<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:import href="commun.xsl"/>
	<xsl:template name="controleMenu">N</xsl:template>
	<xsl:template name="js.module.sheet">
        <script type="text/javascript" src="front/js/login.js" charset="iso-8859-1">&#160;</script>
    </xsl:template>
		
	<xsl:template name="Contenu">
		<center>
			<br/>
			<br/>
			<br/>
			<br/>
			<div class="row justify-content-md-center">
				<div class="col col-lg-4">
					<form method="post" id="formconnexion">
						<fieldset>
							<legend>
								<xsl:value-of select="$LBL.LOGIN"/>
							</legend>
							<br/>
							<div class="form-group row">
								<label for="nom" class="col-sm-6 col-form-label">
									Login
								</label>
								<div class="col-sm-6">
									<input class="form-control" type="text" name="nom" id="nom" required="required"/>
								</div>
							</div>
							<div class="form-group row">
								<label for="motDePasse" class="col-sm-6 form-control-label">
									Mot de passe
								</label>
								<div class="col-sm-6">
									<input class="form-control" id="motDePasse" name="motDePasse" type="password" required="required"/>
								</div>
							</div>
							<br/>
							<div class="row justify-content-md-center">
								<div class="col-md-auto">
									<button type="submit" class="btn btn-primary">
										Se connecter
									</button>
								</div>
							</div>
							<br/>
						</fieldset>
					</form>
				</div>
			</div>
		</center>
	</xsl:template>
</xsl:stylesheet>
