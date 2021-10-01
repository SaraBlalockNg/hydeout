<?php
	$subjectNum = $_POST["number"];
	$url = "subject_numbers.txt";
	$subjectFile = fopen($url,"a+");
	fwrite($subjectFile,"\n");
	fwrite($subjectFile,$subjectNum);
	fclose($subjectFile);
	echo $subjectNum;

   //enter name and lastname into your form and onclick they will be alerted 
?>