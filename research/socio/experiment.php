<!DOCTYPE html>
<html>
	<head id='head'>
		<title>Experiment</title>
		<script src="https://staff.washington.edu/sbng/socio/hoisan.js"></script>
		<link rel="stylesheet" href="https://staff.washington.edu/sbng/socio/hoisan.css">	
	</head>
	<body>
		<div id="subjectNumber" hidden><?php
			$url = "subject-numbers.txt";
			$size =  filesize($url);
			$subjectFile = fopen($url,"a+");
			$numbers = fread($subjectFile,$size);
			$numbers = explode("\n", $numbers);
			do {
				$r = rand(1,10000);
			} while (in_array($r,$numbers));
			fwrite($subjectFile,"\n");
			fwrite($subjectFile,$r);
			fclose($subjectFile);
			echo $r;
			?>
			</div>
		<div id="theData">
			<form action='save.php' method="POST" id='theForm'>
				<div hidden><input name='sn' id='sn'></div>
				<div id='0' hidden>
					<p><em>How much do you agree or disagree with the following statements?</em></p>

					<p><strong>I understand what this person is saying.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentA0" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentA0" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentA0" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentA0" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentA0" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentA0" value="6" /></li>
					</ul></p>
					<p><strong>This person talks like me.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentA1" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentA1" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentA1" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentA1" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentA1" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentA1" value="6" /></li>
					</ul></p>
					<p><strong>This person talks like people I know.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentA2" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentA2" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentA2" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentA2" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentA2" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentA2" value="6" /></li>
					</ul></p>
					<p><strong>This person speaks good Chinese.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentA3" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentA3" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentA3" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentA3" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentA3" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentA3" value="6" /></li>
					</ul></p><br>
					<p><em>If the following people would understand it, how likely would you be to say this phrase to them?</em></p>
					<div class='centered'>
					<table>
						<tr><td class="first"></td><td class="rowhead">Very<br>Unlikely</td><td class="rowhead">Unlikely</td><td class="rowhead">Neutral</td><td class="rowhead">Likely</td><td class="rowhead">Very<br>Likely</td><td class="rowhead">N/A</td></tr>
						<tr><td><strong>Your parents?</strong></td><td><input type="radio" name="sentA4" value="1" /></td><td><input type="radio" name="sentA4" value="2" /></td><td><input type="radio" name="sentA4" value="3" /></td><td><input type="radio" name="sentA4" value="4" /></td><td><input type="radio" name="sentA4" value="5" /></td><td><input type="radio" name="sentA4" value="6" /></td></tr>
						<tr><td><strong>Your siblings?</strong></td><td><input type="radio" name="sentA5" value="1" /></td><td><input type="radio" name="sentA5" value="2" /></td><td><input type="radio" name="sentA5" value="3" /></td><td><input type="radio" name="sentA5" value="4" /></td><td><input type="radio" name="sentA5" value="5" /></td><td><input type="radio" name="sentA5" value="6" /></td></tr>
						<tr><td><strong>Your children?</strong></td><td><input type="radio" name="sentA6" value="1" /></td><td><input type="radio" name="sentA6" value="2" /></td><td><input type="radio" name="sentA6" value="3" /></td><td><input type="radio" name="sentA6" value="4" /></td><td><input type="radio" name="sentA6" value="5" /></td><td><input type="radio" name="sentA6" value="6" /></td></tr>
						<tr><td><strong>Your friends?</strong></td><td><input type="radio" name="sentA7" value="1" /></td><td><input type="radio" name="sentA7" value="2" /></td><td><input type="radio" name="sentA7" value="3" /></td><td><input type="radio" name="sentA7" value="4" /></td><td><input type="radio" name="sentA7" value="5" /></td><td><input type="radio" name="sentA7" value="6" /></td></tr>
						<tr><td><strong>Your boss?</strong></td><td><input type="radio" name="sentA8" value="1" /></td><td><input type="radio" name="sentA8" value="2" /></td><td><input type="radio" name="sentA8" value="3" /></td><td><input type="radio" name="sentA8" value="4" /></td><td><input type="radio" name="sentA8" value="5" /></td><td><input type="radio" name="sentA8" value="6" /></td></tr>
						<tr><td><strong>A stranger?</strong></td><td><input type="radio" name="sentA9" value="1" /></td><td><input type="radio" name="sentA9" value="2" /></td><td><input type="radio" name="sentA9" value="3" /></td><td><input type="radio" name="sentA9" value="4" /></td><td><input type="radio" name="sentA9" value="5" /></td><td><input type="radio" name="sentA9" value="6" /></td></tr>
					</table><br><br></div>
				</div>

				<div id='1' hidden>
					<p><em>How much do you agree or disagree with the following statements?</em></p>

					<p><strong>I understand what this person is saying.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentB0" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentB0" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentB0" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentB0" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentB0" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentB0" value="6" /></li>
					</ul></p>
					<p><strong>This person talks like me.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentB1" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentB1" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentB1" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentB1" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentB1" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentB1" value="6" /></li>
					</ul></p>
					<p><strong>This person talks like people I know.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentB2" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentB2" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentB2" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentB2" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentB2" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentB2" value="6" /></li>
					</ul></p>
					<p><strong>This person speaks good Chinese.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentB3" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentB3" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentB3" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentB3" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentB3" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentB3" value="6" /></li>
					</ul></p><br>
					<p><em>If the following people would understand it, how likely would you be to say this phrase to them?</em></p>
					<div class='centered'>
					<table>
						<tr><td class="first"></td><td class="rowhead">Very<br>Unlikely</td><td class="rowhead">Unlikely</td><td class="rowhead">Neutral</td><td class="rowhead">Likely</td><td class="rowhead">Very<br>Likely</td><td class="rowhead">N/A</td></tr>
						<tr><td><strong>Your parents?</strong></td><td><input type="radio" name="sentB4" value="1" /></td><td><input type="radio" name="sentB4" value="2" /></td><td><input type="radio" name="sentB4" value="3" /></td><td><input type="radio" name="sentB4" value="4" /></td><td><input type="radio" name="sentB4" value="5" /></td><td><input type="radio" name="sentB4" value="6" /></td></tr>
						<tr><td><strong>Your siblings?</strong></td><td><input type="radio" name="sentB5" value="1" /></td><td><input type="radio" name="sentB5" value="2" /></td><td><input type="radio" name="sentB5" value="3" /></td><td><input type="radio" name="sentB5" value="4" /></td><td><input type="radio" name="sentB5" value="5" /></td><td><input type="radio" name="sentB5" value="6" /></td></tr>
						<tr><td><strong>Your children?</strong></td><td><input type="radio" name="sentB6" value="1" /></td><td><input type="radio" name="sentB6" value="2" /></td><td><input type="radio" name="sentB6" value="3" /></td><td><input type="radio" name="sentB6" value="4" /></td><td><input type="radio" name="sentB6" value="5" /></td><td><input type="radio" name="sentB6" value="6" /></td></tr>
						<tr><td><strong>Your friends?</strong></td><td><input type="radio" name="sentB7" value="1" /></td><td><input type="radio" name="sentB7" value="2" /></td><td><input type="radio" name="sentB7" value="3" /></td><td><input type="radio" name="sentB7" value="4" /></td><td><input type="radio" name="sentB7" value="5" /></td><td><input type="radio" name="sentB7" value="6" /></td></tr>
						<tr><td><strong>Your boss?</strong></td><td><input type="radio" name="sentB8" value="1" /></td><td><input type="radio" name="sentB8" value="2" /></td><td><input type="radio" name="sentB8" value="3" /></td><td><input type="radio" name="sentB8" value="4" /></td><td><input type="radio" name="sentB8" value="5" /></td><td><input type="radio" name="sentB8" value="6" /></td></tr>
						<tr><td><strong>A stranger?</strong></td><td><input type="radio" name="sentB9" value="1" /></td><td><input type="radio" name="sentB9" value="2" /></td><td><input type="radio" name="sentB9" value="3" /></td><td><input type="radio" name="sentB9" value="4" /></td><td><input type="radio" name="sentB9" value="5" /></td><td><input type="radio" name="sentB9" value="6" /></td></tr>
					</table><br><br></div>
				</div>

				<div id='2' hidden>
					<p><em>How much do you agree or disagree with the following statements?</em></p>

					<p><strong>I understand what this person is saying.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentC0" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentC0" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentC0" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentC0" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentC0" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentC0" value="6" /></li>
					</ul></p>
					<p><strong>This person talks like me.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentC1" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentC1" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentC1" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentC1" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentC1" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentC1" value="6" /></li>
					</ul></p>
					<p><strong>This person talks like people I know.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentC2" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentC2" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentC2" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentC2" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentC2" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentC2" value="6" /></li>
					</ul></p>
					<p><strong>This person speaks good Chinese.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentC3" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentC3" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentC3" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentC3" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentC3" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentC3" value="6" /></li>
					</ul></p><br>
					<p><em>If the following people would understand it, how likely would you be to say this phrase to them?</em></p>
					<div class='centered'>
					<table>
						<tr><td class="first"></td><td class="rowhead">Very<br>Unlikely</td><td class="rowhead">Unlikely</td><td class="rowhead">Neutral</td><td class="rowhead">Likely</td><td class="rowhead">Very<br>Likely</td><td class="rowhead">N/A</td></tr>
						<tr><td><strong>Your parents?</strong></td><td><input type="radio" name="sentC4" value="1" /></td><td><input type="radio" name="sentC4" value="2" /></td><td><input type="radio" name="sentC4" value="3" /></td><td><input type="radio" name="sentC4" value="4" /></td><td><input type="radio" name="sentC4" value="5" /></td><td><input type="radio" name="sentC4" value="6" /></td></tr>
						<tr><td><strong>Your siblings?</strong></td><td><input type="radio" name="sentC5" value="1" /></td><td><input type="radio" name="sentC5" value="2" /></td><td><input type="radio" name="sentC5" value="3" /></td><td><input type="radio" name="sentC5" value="4" /></td><td><input type="radio" name="sentC5" value="5" /></td><td><input type="radio" name="sentC5" value="6" /></td></tr>
						<tr><td><strong>Your children?</strong></td><td><input type="radio" name="sentC6" value="1" /></td><td><input type="radio" name="sentC6" value="2" /></td><td><input type="radio" name="sentC6" value="3" /></td><td><input type="radio" name="sentC6" value="4" /></td><td><input type="radio" name="sentC6" value="5" /></td><td><input type="radio" name="sentC6" value="6" /></td></tr>
						<tr><td><strong>Your friends?</strong></td><td><input type="radio" name="sentC7" value="1" /></td><td><input type="radio" name="sentC7" value="2" /></td><td><input type="radio" name="sentC7" value="3" /></td><td><input type="radio" name="sentC7" value="4" /></td><td><input type="radio" name="sentC7" value="5" /></td><td><input type="radio" name="sentC7" value="6" /></td></tr>
						<tr><td><strong>Your boss?</strong></td><td><input type="radio" name="sentC8" value="1" /></td><td><input type="radio" name="sentC8" value="2" /></td><td><input type="radio" name="sentC8" value="3" /></td><td><input type="radio" name="sentC8" value="4" /></td><td><input type="radio" name="sentC8" value="5" /></td><td><input type="radio" name="sentC8" value="6" /></td></tr>
						<tr><td><strong>A stranger?</strong></td><td><input type="radio" name="sentC9" value="1" /></td><td><input type="radio" name="sentC9" value="2" /></td><td><input type="radio" name="sentC9" value="3" /></td><td><input type="radio" name="sentC9" value="4" /></td><td><input type="radio" name="sentC9" value="5" /></td><td><input type="radio" name="sentC9" value="6" /></td></tr>
					</table><br><br></div>
				</div>

				<div id='3' hidden>
					<p><em>How much do you agree or disagree with the following statements?</em></p>

					<p><strong>I understand what this person is saying.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentD0" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentD0" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentD0" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentD0" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentD0" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentD0" value="6" /></li>
					</ul></p>
					<p><strong>This person talks like me.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentD1" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentD1" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentD1" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentD1" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentD1" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentD1" value="6" /></li>
					</ul></p>
					<p><strong>This person talks like people I know.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentD2" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentD2" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentD2" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentD2" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentD2" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentD2" value="6" /></li>
					</ul></p>
					<p><strong>This person speaks good Chinese.</strong>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="sentD3" value="1" /></li>
						<li>Disagree<br><input type="radio" name="sentD3" value="2" /></li>
						<li>Neutral<br><input type="radio" name="sentD3" value="3" /></li>
						<li>Agree<br><input type="radio" name="sentD3" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="sentD3" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="sentD3" value="6" /></li>
					</ul></p><br>
					<p><em>If the following people would understand it, how likely would you be to say this phrase to them?</em></p>
					<div class='centered'>
					<table>
						<tr><td class="first"></td><td class="rowhead">Very<br>Unlikely</td><td class="rowhead">Unlikely</td><td class="rowhead">Neutral</td><td class="rowhead">Likely</td><td class="rowhead">Very<br>Likely</td><td class="rowhead">N/A</td></tr>
						<tr><td><strong>Your parents?</strong></td><td><input type="radio" name="sentD4" value="1" /></td><td><input type="radio" name="sentD4" value="2" /></td><td><input type="radio" name="sentD4" value="3" /></td><td><input type="radio" name="sentD4" value="4" /></td><td><input type="radio" name="sentD4" value="5" /></td><td><input type="radio" name="sentD4" value="6" /></td></tr>
						<tr><td><strong>Your siblings?</strong></td><td><input type="radio" name="sentD5" value="1" /></td><td><input type="radio" name="sentD5" value="2" /></td><td><input type="radio" name="sentD5" value="3" /></td><td><input type="radio" name="sentD5" value="4" /></td><td><input type="radio" name="sentD5" value="5" /></td><td><input type="radio" name="sentD5" value="6" /></td></tr>
						<tr><td><strong>Your children?</strong></td><td><input type="radio" name="sentD6" value="1" /></td><td><input type="radio" name="sentD6" value="2" /></td><td><input type="radio" name="sentD6" value="3" /></td><td><input type="radio" name="sentD6" value="4" /></td><td><input type="radio" name="sentD6" value="5" /></td><td><input type="radio" name="sentD6" value="6" /></td></tr>
						<tr><td><strong>Your friends?</strong></td><td><input type="radio" name="sentD7" value="1" /></td><td><input type="radio" name="sentD7" value="2" /></td><td><input type="radio" name="sentD7" value="3" /></td><td><input type="radio" name="sentD7" value="4" /></td><td><input type="radio" name="sentD7" value="5" /></td><td><input type="radio" name="sentD7" value="6" /></td></tr>
						<tr><td><strong>Your boss?</strong></td><td><input type="radio" name="sentD8" value="1" /></td><td><input type="radio" name="sentD8" value="2" /></td><td><input type="radio" name="sentD8" value="3" /></td><td><input type="radio" name="sentD8" value="4" /></td><td><input type="radio" name="sentD8" value="5" /></td><td><input type="radio" name="sentD8" value="6" /></td></tr>
						<tr><td><strong>A stranger?</strong></td><td><input type="radio" name="sentD9" value="1" /></td><td><input type="radio" name="sentD9" value="2" /></td><td><input type="radio" name="sentD9" value="3" /></td><td><input type="radio" name="sentD9" value="4" /></td><td><input type="radio" name="sentD9" value="5" /></td><td><input type="radio" name="sentD9" value="6" /></td></tr>
					</table><br><br></div>
				</div>

	        	<div id='meta' hidden>
	        		How old are you? <select name="meta1">
	        			<option value="1">---</option>
					    <option value="1">18-24</option>
					    <option value="2">25-34</option>
					    <option value="3">35-44</option>
					    <option value="4">45-54</option>
					    <option value="5">55-64</option>
					    <option value="6">65-74</option>
					    <option value="7">75-84</option>
					    <option value="8">85-94</option>
					  </select>
	        		<p>Where did you grow up?  For example, you can say 'Los Angeles' or 'Japan'.</p><textarea id='meta2' name="meta2" rows="1" cols="30" onclick="clearBox(2)">Type here...</textarea>
	        		<p>What languages do you speak?</p><textarea id='meta3' name="meta3" rows="2" cols="30" onclick="clearBox(3)">Type here...</textarea>
	        		<p><em>How much do you agree or disagree with the following statement?</em></p>
					<p><strong>Some dialects of Chinese are better than others.</strong></p>
					<ul class="likert">
						<li>Strongly Disagree<br><input type="radio" name="meta4" value="1" /></li>
						<li>Disagree<br><input type="radio" name="meta4" value="2" /></li>
						<li>Neutral<br><input type="radio" name="meta4" value="3" /></li>
						<li>Agree<br><input type="radio" name="meta4" value="4" /></li>
						<li>Strongly Agree<br><input type="radio" name="meta4" value="5" /></li>
						<li class="inert">Don't know.<br><input type="radio" name="meta4" value="6" /></li>
					</ul></p>
	        		<p>Why do you feel that way?</p>
	        		<textarea id='meta5' name="meta5" rows="5" cols="30" onclick="clearBox(5)">Type here...</textarea>
	        	</div>

			</form>
		</div>
		<div id='buttons'></div>
	</body>
</html>
