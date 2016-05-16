<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<html>
	<head>
		<meta content="text/html;charset=UTF-8" http-equiv="content-type"/>
		<link rel="stylesheet" href="application/jquery/jquery-ui-1.11.4.custom/jquery-ui.css"/>
		<script type="text/javascript" src="application/jquery/jquery-ui-1.11.4.custom/external/jquery/jquery.js" charset="iso-8859-1">&#160;</script>
		<script type="text/javascript" src="application/jquery/jquery-ui-1.11.4.custom/jquery-ui.min.js" charset="iso-8859-1">&#160;</script>
		<script type="text/javascript" src="application/js/calendrier.js" charset="iso-8859-1">&#160;</script>
	</head>
	<body>
		
		  <div id="radio">
			<input type="radio" id="radio1" name="radioChoixType" value="inactif" checked="checked"/><label for="radio1">Inactif</label>
			<input type="radio" id="radio2" name="radioChoixType" value="rtt"/><label for="radio2">RTT</label>
			<input type="radio" id="radio3" name="radioChoixType" value="conges"/><label for="radio3">Conges</label>
		  </div>



		<table id="tableauCalendrier" border="1">
			<tr id="ligneJour">
				<td/>
				<td/>
				<th>1</th>
				<th>2</th>
				<th>3</th>
				<th>4</th>
				<th>5</th>
				<th>6</th>
				<th>7</th>
				<th>8</th>
				<th>9</th>
				<th>10</th>
				<th>11</th>
				<th>12</th>
				<th>13</th>
				<th>14</th>
				<th>15</th>
				<th>16</th>
				<th>17</th>
				<th>18</th>
				<th>19</th>
				<th>20</th>
				<th>21</th>
				<th>22</th>
				<th>23</th>
				<th>24</th>
				<th>25</th>
				<th>26</th>
				<th>27</th>
				<th>28</th>
				<th>29</th>
				<th>30</th>
				<th>31</th>
			</tr>
		</table>
		
		<div id="test">Test</div>
		<div id="message"/>
	</body>

	</html>

</xsl:template>

</xsl:stylesheet>
