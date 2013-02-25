<?php
	
	// gather data
	$to = 'info@danielsdesign.nl';
	$name = $_POST['contact_name'];
	$subject = 'Message from ' . $name;
	$from = $_POST['contact_email'];
	$message = "This message from " . $name . " was sent using the contact form on danielsdesign.nl." . "\n\n" . $_POST['contact_message'];
	$headers = "From: " . $from;
	$headers .= "\r\nReply-To: " . $from;
	$headers .= "\r\nX-Mailer: PHP/".phpversion();
	
	// send mail
	$sent = mail($to , $subject , $message, $headers);
	
	// return to daniels design
	header("Location: http://www.danielsdesign.nl/");

?>