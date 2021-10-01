<!DOCTYPE html>
<html>
	<head id='head'>
		<title>Experiment</title>
		<script src="https://staff.washington.edu/sbng/mturk/variables-to-change.js"></script>
		<script src="https://staff.washington.edu/sbng/mturk/variables.js"></script>
		<script src="https://staff.washington.edu/sbng/mturk/metrical_phon.js"></script>
		<script src="https://assets.crowd.aws/crowd-html-elements.js"></script>
		<link rel="stylesheet" href="https://staff.washington.edu/sbng/mturk/metrical_phon.css">
	</head>
	<body>
		<div id="subjectNumber" hidden class="invisible"><?php
			$url = "subject-numbers.txt";
			$size =  filesize($url);
			$subjectFile = fopen($url,"a+");
			$numbers = fread($subjectFile,$size);
			$numbers = explode("\n", $numbers);
			do {
				$r = rand(10000,99999);
			} while (in_array($r,$numbers));
			fwrite($subjectFile,"\n");
			fwrite($subjectFile,$r);
			fclose($subjectFile);
			echo $r;
			?>
			</div>
		<div id="theData" class="invisible">
			<crowd-form answer-format="flatten-objects" id='theForm'>
				<div hidden>
					<crowd-input name="subjectNumber" ></crowd-input>

	        		<crowd-input name="pianoArray" ></crowd-input>
	        		<crowd-input name="tapArray" ></crowd-input>
	        		<crowd-input name="questionArray" ></crowd-input>

	        		<crowd-input name="userPianoCounts" ></crowd-input>
	        		<crowd-input name="userPianoNotes"></crowd-input>
	        		<crowd-input name="userPianoTimes"></crowd-input>

					<crowd-input name="userTapCounts" ></crowd-input>
	        		<crowd-input name="userTapTimes"></crowd-input>
	        		<crowd-input name="userQuestions"></crowd-input>

	        		<crowd-button form-action="submit"></crowd-button>
	        	</div>	        		
			</crowd-form>
		</div>
	</body>
</html>