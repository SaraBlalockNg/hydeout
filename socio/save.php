<?php 
    if(isset($_POST)){
    	$na = 'subject';
    	$nam = $na . substr($_POST['sn'],0,-3);
    	$name = $nam . '.txt';
        file_put_contents($name, json_encode($_POST));
    }
?>

<!DOCTYPE html>
<html>
	<head id='head'>
		<title>Thank you!</title>
	</head>
	<body>
		<p style="font-family:sans-serif;">Thank you! Your reponse has been recorded.</p>
	</body>
</html>