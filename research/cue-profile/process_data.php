<?php
	$url = $_POST["title"];
	// $subj = $_POST["Subj"];
	// $trial = $_POST["Trial"];
	// $tl = $_POST['TrainingLevel'];
	// $st = $_POST['Stimuli_Type'];
	// $s1 = $_POST['Stimuli_1'];
	// $s2 = $_POST['Stimuli_2'];
	// $resp = $_POST['Response'];
	// $rn = $_POST['Reponse_Number'];
	// $correct = $_POST['Correct'];
	$arr = array($_POST["Subj"],$_POST["Trial"],$_POST['TrainingLevel'],$_POST['Stimuli_Type'],$_POST['Stimuli_1'],$_POST['Stimuli_2'],$_POST['Response'],$_POST['Reponse_Number'],$_POST['Correct']);
	$subjectFile = fopen($url,"a+");
	fwrite($subjectFile,"\n");
	fwrite($subjectFile,join("\t",$arr));
	fclose($subjectFile);

   //enter name and lastname into your form and onclick they will be alerted 
?>