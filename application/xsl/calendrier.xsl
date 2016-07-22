<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:import href="commun.xsl"/>

<xsl:template name="js.module.sheet">
	<script language="JavaScript" src="application/js/calendrier.js" type="text/javascript"/>
</xsl:template>

<xsl:template name="Contenu">
	<section class="row">
		<div class="col-sm-8">	
			<table id="tableauCalendrier" class="formulaire"/>
		</div>
		<aside class="col-sm-4">
			<center>
				<div id="radio">
					<input type="radio" id="radio1" name="radioChoixType" value="inactif" checked="checked"/><label for="radio1">Inactif</label>
					<input type="radio" id="radio2" name="radioChoixType" value="rtt"/><label for="radio2">RTT</label>
					<input type="radio" id="radio3" name="radioChoixType" value="conges"/><label for="radio3">Conges</label>
				</div>

				<br/>
				<table class="formulaire">
					<tr>
						<th colspan="2">Legende</th>
					</tr>
					<tr>
						<td>RTT</td>
						<td class="rtt_jour"></td>
					</tr>
					<tr>
						<td>Congès</td>
						<td class="conges_jour">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</td>
					</tr>
				</table>
				<br/>
				<table id="tableauPeriodes" class="formulaire">
					<tr>
						<th>Date début</th>
						<th>Date fin</th>
						<th>Type conges</th>
						<th>Disponibles</th>
						<th>Saisis</th>
						<th>Pris</th>
						<th>Reste</th>
					</tr>
				</table>
			</center>	
		</aside>
	</section>
	<br/>
</xsl:template>

</xsl:stylesheet>
