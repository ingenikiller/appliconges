<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:import href="commun.xsl"/>

<xsl:template name="js.module.sheet">
	<script language="JavaScript" src="front/js/calendrier.js" type="text/javascript"/>
</xsl:template>

<xsl:template name="Contenu">
	<section class="row">
		<div class="col-8">	
			<table id="tableauCalendrier" class="formulaire"/>
		</div>
		<div class="col-4">
			<center>
				
				<fieldset>
				<legend>Types de jour à saisir</legend>
					<div id="radio">
						<input type="radio" id="radio1" name="radioChoixType" value="inactif" checked="checked"/><label for="radio1">Inactif</label>
						<input type="radio" id="radio2" name="radioChoixType" value="rtt"/><label for="radio2">RTT</label>
						<input type="radio" id="radio3" name="radioChoixType" value="conges"/><label for="radio3">Congès</label>
						<input type="radio" id="radio4" name="radioChoixType" value="cpa"/><label for="radio4">CP anticipés</label>
						<input type="radio" id="radio5" name="radioChoixType" value="cps"/><label for="radio5">CP sans solde</label>
					</div>
				</fieldset>

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
					<tr>
						<td>CP anticipés</td>
						<td class="cpa_jour">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</td>
					</tr>
					<tr>
						<td>CP sans solde</td>
						<td class="cps_jour">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</td>
					</tr>
				</table>
				<br/>
				<table id="tableauPeriodes" class="formulaire">
					<tr>
						<th colspan="8">Périodes</th>
					</tr>
					<tr>
						<th>Date début</th>
						<th>Date fin</th>
						<th>Type</th>
						<th>A poser</th>
						<th>Saisis</th>
						<th>Reste</th>
						<th>Pris</th>
						<th>Frac</th>
					</tr>
				</table>
				<br/>
				<div class="widget">
					<fieldset>
						<legend>Raphounet warning: </legend>
						<label for="modeHisto">Saisie antérieure
							<input type="checkbox" name="modeHisto" id="modeHisto"/>
						</label>
					</fieldset>
				</div>
			</center>	
		</div>
	</section>
	<br/>
</xsl:template>

</xsl:stylesheet>
